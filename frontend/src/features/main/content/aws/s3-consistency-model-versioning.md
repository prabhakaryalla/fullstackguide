# S3 Consistency Model and Versioning

Understanding exactly when a write to S3 becomes visible to subsequent reads — and how versioning protects against accidental overwrites or deletions — are two of the most practically important S3 behaviors to know cold for an interview.

## Short Answer

S3 provides **strong read-after-write consistency** for all operations (as of December 2020 — previously it only offered eventual consistency for overwrite `PUT`s and `DELETE`s) — meaning a successful `PUT` (including overwriting an existing object) or `DELETE` is immediately reflected in every subsequent read, with no window of stale/inconsistent data. **Versioning**, when enabled on a bucket, keeps every previous version of an object instead of overwriting it in place — turning an accidental overwrite or delete into a recoverable event rather than permanent data loss.

## Strong Read-After-Write Consistency

```
PUT object.txt (version 1)
GET object.txt → immediately returns version 1's content, no delay

PUT object.txt (version 2, overwriting version 1)
GET object.txt → immediately returns version 2's content, guaranteed, no stale reads
```

- This wasn't always the case — prior to December 2020, overwriting an existing object or deleting one had only *eventual* consistency, meaning a read immediately after could briefly return stale data. AWS upgraded this to strong consistency for all S3 operations, at no additional cost or configuration required, and it's now the default, guaranteed behavior.
- This matters for interview purposes mostly as a "know the current, correct answer" question — older material/blog posts describing S3 as "eventually consistent" for overwrites/deletes are now outdated.

## Versioning: Protecting Against Overwrites and Deletes

```
Bucket versioning: Enabled

PUT  document.txt        → creates version "111111"
PUT  document.txt (again) → creates version "222222" (both versions retained, "222222" is now current)
DELETE document.txt       → does NOT actually erase data - inserts a "delete marker" as the new current version
```

- With versioning enabled, a `PUT` to an existing key never overwrites data in place — it creates a brand-new version, and the object's full history remains retrievable by version ID.
- A `DELETE` (without specifying a version ID) doesn't erase anything either — it adds a **delete marker**, which simply becomes the new "current" version, making the object appear deleted from a normal `GET`. The actual prior version's data is still fully intact and can be restored by removing the delete marker or explicitly requesting the prior version ID.
- To **permanently** delete a specific version's data (e.g. for compliance/GDPR erasure requirements), you must explicitly `DELETE` with that specific version ID — a normal delete alone never permanently destroys versioned data.

## MFA Delete: An Extra Layer on Top of Versioning

```
Bucket versioning + MFA Delete: Enabled

Permanently deleting a version, or disabling versioning itself,
now REQUIRES a valid MFA (multi-factor authentication) code from the bucket owner's root account.
```

- Adds a hard requirement for MFA specifically on the most destructive operations (permanently deleting a version, or turning versioning off) — protecting against both accidental and malicious permanent data loss, even by an account with otherwise sufficient IAM permissions.

## Common Mistake

Assuming a normal `DELETE` on a versioned bucket permanently destroys data — it doesn't; it only adds a delete marker, and the previous version(s) remain fully recoverable unless explicitly, permanently deleted by version ID. This is frequently the actual saving grace in real incidents ("we accidentally deleted our production data") — the object usually isn't gone, just hidden behind a delete marker, and can be restored by removing that marker.

## Real-World Example

An application bug accidentally overwrites a critical configuration file in S3 with corrupted data. With versioning enabled, the previous, correct version of the file is still fully retrievable by its version ID — the incident becomes "restore the previous version" (a quick, low-risk fix) instead of "we've permanently lost this data and need to reconstruct it from other sources."

## Summary

S3 now provides strong read-after-write consistency for every operation (including overwrites and deletes), removing an entire historical class of "why did I just read stale data" bugs. Versioning protects against accidental overwrites/deletes by retaining every prior version instead of destroying data in place — a normal delete only adds a hidden marker, not a permanent erasure — and MFA Delete adds a hard authentication requirement specifically on the genuinely destructive operations.
