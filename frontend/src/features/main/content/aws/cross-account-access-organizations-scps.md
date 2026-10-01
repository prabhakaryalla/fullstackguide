# Cross-Account Access, AWS Organizations, and Service Control Policies (SCPs)

As a company grows, running everything in one single AWS account becomes a security and blast-radius risk — AWS Organizations, cross-account IAM Roles, and Service Control Policies together let you run many separate accounts under centralized governance, without duplicating credentials or manually managing access account-by-account.

## Short Answer

**Cross-account access** lets a user/role in one AWS account temporarily assume an IAM Role in another account, without ever sharing long-term credentials between them. **AWS Organizations** groups multiple AWS accounts under one management structure, enabling centralized billing and policy management. **Service Control Policies (SCPs)** are guardrails attached at the Organization/Organizational-Unit level that set the *maximum possible* permissions for every account underneath them — even an account's own root user or an `AdministratorAccess` policy can't exceed what an SCP allows.

## Cross-Account Access via IAM Roles

```json
// Trust policy on a Role in Account B (allows Account A to assume it)
{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::111111111111:root" },
  "Action": "sts:AssumeRole"
}
```

```
User in Account A → sts:AssumeRole → temporary credentials for a Role in Account B
                   → can now act within Account B, scoped to that Role's permissions,
                     for a limited time (the credentials automatically expire)
```

- No long-term access keys are ever shared between accounts — a user authenticates in their own account, then assumes a Role in the other account to get short-lived, automatically-expiring temporary credentials.
- This is the standard pattern for a multi-account setup: a central "management" or "security" account's users/roles assume roles into individual workload accounts (dev, staging, prod) as needed, rather than each account maintaining separate, independent user credentials.

## AWS Organizations

```
Organization
  ├── Management Account (billing, org-level policies)
  ├── OU: Production
  │     ├── Account: prod-app-1
  │     └── Account: prod-app-2
  └── OU: Non-Production
        ├── Account: dev
        └── Account: staging
```

- **Organizational Units (OUs)** group related accounts (e.g. by environment, by business unit), letting you apply policies once at the OU level instead of individually per account.
- Enables **consolidated billing** — all accounts' usage rolls up to one bill, and can qualify for volume discounts/Reserved Instance sharing across the whole organization rather than per-account.
- Provides a foundation for **account-level isolation** as a genuine security boundary — a compromised or misconfigured `dev` account is far less likely to affect `prod` when they're entirely separate AWS accounts, compared to relying purely on IAM permissions within one shared account.

## Service Control Policies (SCPs)

```json
{
  "Effect": "Deny",
  "Action": ["ec2:RunInstances"],
  "Resource": "*",
  "Condition": {
    "StringNotEquals": { "aws:RequestedRegion": ["us-east-1", "eu-west-1"] }
  }
}
```

- This SCP, attached to an OU, prevents **every account** under that OU from launching EC2 instances in any region other than `us-east-1`/`eu-west-1` — regardless of what IAM permissions any individual user, role, or even the account's own root user has.
- SCPs don't *grant* any permissions by themselves — they only set an upper bound (a filter) on what IAM policies within the account are allowed to permit. A user still needs an actual IAM policy granting an action; the SCP just ensures that action can never be granted beyond what the SCP allows, no matter how permissive an in-account IAM policy might be.
- Commonly used to enforce organization-wide guardrails: restricting which regions can be used at all, preventing specific high-risk actions (like disabling CloudTrail logging) even by an account administrator, or blocking use of specific services entirely across non-production accounts.

## Common Mistake

Relying purely on IAM policies within a single, shared account to separate environments (dev/staging/prod) or teams, instead of using genuinely separate AWS accounts under Organizations. IAM policy mistakes within one shared account can accidentally grant unintended cross-environment access — separate accounts (with SCPs as an additional guardrail) provide a much stronger, harder-to-accidentally-bypass isolation boundary.

## Summary

Cross-account IAM Roles let identities in one account securely, temporarily act in another without sharing long-term credentials. AWS Organizations groups multiple accounts for centralized billing and policy management via Organizational Units. Service Control Policies set an organization-wide ceiling on what any account (including its own administrators) can ever do — a governance layer that IAM policies alone, within a single account, can't provide.
