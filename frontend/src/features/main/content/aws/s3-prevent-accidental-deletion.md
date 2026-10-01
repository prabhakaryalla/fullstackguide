## How to Prevent Accidental Deletion of Files in an S3 Bucket

Amazon S3 (Simple Storage Service) is where a lot of critical data lives — backups, logs, user uploads, invoices, ML datasets. A single accidental `DeleteObject` call (a careless script, a fat-fingered console click, or a compromised credential) can wipe out data that took years to build. AWS gives you several layers of defense, and in practice you combine them rather than relying on just one.

The five key controls are:

1. **Enable S3 Versioning**
2. **Follow IAM least privilege**
3. **Enable MFA Delete**
4. **Use S3 Object Lock**
5. **Monitor delete activity**

Think of these as layers of an onion — each layer catches what the previous one might miss.

```archify
diagrams/s3-deletion-protection.html
```

---

### 1. Enable S3 Versioning

**What it does:** Versioning keeps every version of an object in a bucket. When you "delete" an object, S3 doesn't actually erase it — it just adds a **delete marker** on top of the version stack. The old version is still there underneath.

**Why it matters:** Most "accidental deletion" disasters are solved instantly once versioning is on, because you can simply remove the delete marker or restore the previous version.

**How it works, step by step:**
- Enable versioning on the bucket (`aws s3api put-bucket-versioning --bucket my-bucket --versioning-configuration Status=Enabled`).
- Every `PUT` of the same key creates a new version with its own `VersionId`.
- A normal `DELETE` (without specifying a version ID) just adds a delete marker — the object "disappears" from the default listing, but every prior version is intact.
- To truly destroy data, someone must delete a **specific version ID** — a much more deliberate, harder-to-do-by-accident action.

**Real-world example:** A developer runs a cleanup script that accidentally deletes `invoices/2024/march.pdf`. With versioning on, the file appears "gone" in the console, but you just run:
```bash
aws s3api list-object-versions --bucket my-bucket --prefix invoices/2024/march.pdf
aws s3api delete-object --bucket my-bucket --key invoices/2024/march.pdf --version-id <delete-marker-id>
```
Removing the delete marker instantly brings the file back — no backups needed.

**Trade-off to be aware of:** Old versions still take up storage and cost money. Pair versioning with **S3 Lifecycle rules** to transition or expire noncurrent versions after N days (e.g., move to Glacier after 30 days, expire after 365 days).

---

### 2. Follow IAM Least Privilege

**What it does:** Least privilege means giving every user, role, and application **only the permissions it needs to do its job — nothing more.** If a script only needs to read files, it should never have `s3:DeleteObject` permission in the first place.

**Why it matters:** Most accidental (and malicious) deletions happen because permissions were too broad — someone had `s3:*` "just in case," and a bug or typo turned into data loss.

**Practical steps:**
- Write IAM policies that grant specific actions (`s3:GetObject`, `s3:PutObject`) instead of wildcards (`s3:*`).
- Explicitly **deny** delete actions for roles that don't need them, e.g., a reporting/read-only role.
- Use **resource-level restrictions** (specific bucket/prefix ARNs) so a role for `bucket-A` can't accidentally touch `bucket-B`.
- Use **IAM Policy Conditions** to add guardrails, e.g., only allow deletes from a specific VPC endpoint or with MFA present.

**Example least-privilege deny statement** (blocks deletes even if another policy allows them):
```json
{
  "Effect": "Deny",
  "Action": ["s3:DeleteObject", "s3:DeleteObjectVersion"],
  "Resource": "arn:aws:s3:::my-critical-bucket/*",
  "Condition": {
    "BoolIfExists": { "aws:MultiFactorAuthPresent": "false" }
  }
}
```

**Real-world example:** A CI/CD pipeline role used to deploy static website files was originally given full `s3:*` access "to make things easy." A bad deploy script accidentally ran `aws s3 rm --recursive` on the wrong bucket. If that role had been scoped to only `s3:PutObject` and `s3:ListBucket` on the exact target bucket, the delete command would have failed outright — least privilege turns a catastrophe into a harmless error message.

---

### 3. Enable MFA Delete

**What it does:** MFA Delete requires the bucket owner (root or an authorized user) to provide a **temporary MFA code** in addition to their credentials before they can:
- Permanently delete an object version, or
- Change the bucket's versioning state (e.g., suspend versioning).

**Why it matters:** It adds a "human in the loop with a physical/virtual device" check for the most destructive actions, protecting against both accidents and stolen credentials.

**Key facts:**
- MFA Delete can only be enabled/disabled by the **root account** of the bucket owner, using the CLI (not available in the console), and the root account itself must have MFA configured.
- It requires appending the MFA device serial number and current one-time code to the versioning API call:
```bash
aws s3api put-bucket-versioning \
  --bucket my-bucket \
  --versioning-configuration Status=Enabled,MFADelete=Enabled \
  --mfa "arn:aws:iam::123456789012:mfa/root-account-mfa-device 123456"
```
- Once enabled, even an IAM admin with `s3:DeleteObject` permission **cannot delete a specific object version** without the MFA code.

**Real-world example:** An attacker compromises an IAM user's access keys and tries to permanently wipe historical versions of financial records to cover their tracks. Without physical access to the root account's MFA device, the delete requests fail — the data survives.

---

### 4. Use S3 Object Lock

**What it does:** Object Lock implements a **WORM (Write Once, Read Many)** model. Once an object is locked, it truly cannot be deleted or overwritten — not by users, not by admins, not even by AWS support — until the lock expires (for compliance mode) or is explicitly removed by an authorized user (for governance mode).

**Two retention modes:**
- **Governance mode:** Most users can't delete/overwrite the object, but users with special permission (`s3:BypassGovernanceRetention`) can, if truly necessary. Good for internal safety nets.
- **Compliance mode:** *No one* — including the root account — can delete or shorten the retention period until it expires. This is used for strict regulatory requirements (e.g., financial or healthcare records).

**Two protection mechanisms:**
- **Retention period:** Locks the object until a specific future date.
- **Legal hold:** Locks the object indefinitely, independent of any retention period, until someone with permission explicitly removes the hold. Useful during litigation or investigations.

**Important constraint:** Object Lock **must be enabled when the bucket is created** (or requires AWS support to enable on an existing bucket), and it requires versioning to be enabled, since locks apply per version.

**Real-world example:** A healthcare company must retain patient records for 7 years per regulation. They enable Object Lock in **compliance mode** with a 7-year retention period. Even if a disgruntled employee gets admin access and tries to delete the records, S3 physically refuses the request until the retention period expires — satisfying auditors and regulators.

---

### 5. Monitor Delete Activity

**What it does:** Even with strong preventive controls, you want visibility — to detect suspicious or unexpected delete activity quickly and respond before damage spreads (e.g., a script deleting thousands of objects per second).

**Practical setup:**
- **AWS CloudTrail:** Enable **S3 data events** (object-level logging) to record every `DeleteObject` / `DeleteObjects` API call, including who made it, from what IP, and when.
- **Amazon CloudWatch Alarms:** Create a metric filter on CloudTrail logs that triggers an alarm when delete-object events exceed a threshold in a short time window (e.g., more than 50 deletes in 5 minutes).
- **Amazon GuardDuty (S3 Protection):** Detects anomalous access patterns, like unusual API calls from unfamiliar locations or a sudden spike in delete requests, and flags them as findings.
- **S3 Server Access Logging / EventBridge notifications:** Route `s3:ObjectRemoved:*` events to an SNS topic or Lambda function to trigger real-time alerts (e.g., a Slack/Teams message) whenever a delete happens in a sensitive bucket.

**Real-world example:** A monitoring rule is set up so that any `DeleteObjects` (bulk delete) call on the `prod-backups` bucket triggers an EventBridge rule that immediately notifies the on-call engineer via SNS/Slack. When a misconfigured Lambda function starts bulk-deleting objects, the team gets paged within seconds — allowing them to revoke the role's permissions and restore from versioned copies before most of the damage is done.

---

### Putting It All Together

| Layer | Protects Against | Key AWS Feature |
|---|---|---|
| Least privilege | Overly broad permissions being misused | IAM policies & conditions |
| Versioning | Simple accidental overwrite/delete | S3 Versioning + delete markers |
| MFA Delete | Stolen credentials, rogue admins | MFA-gated version delete |
| Object Lock | Any deletion attempt, even by admins | WORM retention / legal hold |
| Monitoring | Slow detection & response time | CloudTrail, CloudWatch, GuardDuty |

No single control is enough on its own — versioning alone won't stop someone deleting a specific version, IAM alone won't stop a compromised admin account, and monitoring only tells you *after* something happened. Combining all five gives you prevention, containment, and detection working together.
