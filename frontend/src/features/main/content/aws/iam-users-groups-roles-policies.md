# IAM: Users, Groups, Roles, and Policies

AWS Identity and Access Management (IAM) controls who (or what) can do what, on which resources. The four core building blocks — Users, Groups, Roles, and Policies — combine to implement least-privilege access across every AWS account.

## Short Answer

A **Policy** is a JSON document defining permissions (what actions are allowed/denied, on which resources). A **User** represents a person or application with long-term credentials. A **Group** is a collection of Users that share the same policies, for easier management. A **Role** is an identity *without* long-term credentials, assumed temporarily by a user, application, or AWS service — the recommended way to grant permissions to EC2 instances, Lambda functions, or cross-account access, instead of embedding long-lived credentials anywhere.

## IAM Policies

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

- Policies are attached to Users, Groups, or Roles — never define permissions "on" a resource in isolation; access is always granted through an identity's attached policies (plus, optionally, a resource-based policy on the resource itself, like an S3 bucket policy).
- An explicit `"Effect": "Deny"` always overrides any `"Allow"` elsewhere — IAM evaluates all applicable policies together, and any single Deny wins regardless of how many Allows exist.

## Users and Groups

```
Group: Developers
  ├── Policy: ReadOnlyAccess to S3
  ├── User: alice
  └── User: bob

Group: Admins
  ├── Policy: AdministratorAccess
  └── User: carol
```

- Attaching policies to a **Group**, then adding Users to that Group, is the standard pattern — avoid attaching policies directly to individual Users, since that becomes unmanageable as headcount grows (you'd have to update permissions per-person instead of per-role).

## Roles: The Recommended Way to Grant Access to Services

```json
// Trust policy on a Role - who/what is ALLOWED to assume this role
{
  "Effect": "Allow",
  "Principal": { "Service": "ec2.amazonaws.com" },
  "Action": "sts:AssumeRole"
}
```

- An EC2 instance with an attached IAM Role can call AWS APIs (e.g. read from S3) without ever having a long-lived access key stored on the instance — AWS automatically rotates short-lived, temporary credentials behind the scenes via the instance metadata service.
- This is why hardcoding AWS access keys into application code or config files is considered a serious anti-pattern: a compromised long-lived key grants an attacker standing access until manually revoked, whereas a Role's temporary credentials expire automatically and are never directly exposed to application code at all.
- Roles are also how **cross-account access** works — Account A's Role trusts Account B, letting a User/Role in Account B assume it temporarily, without ever sharing long-term credentials between accounts.

## The Principle of Least Privilege

```json
// Bad: overly broad
{ "Effect": "Allow", "Action": "s3:*", "Resource": "*" }

// Good: scoped to exactly what's needed
{ "Effect": "Allow", "Action": ["s3:GetObject"], "Resource": "arn:aws:s3:::my-app-bucket/uploads/*" }
```

Grant only the specific actions, on the specific resources, that a given identity genuinely needs — not broad wildcard access "to be safe" or "to save time now." Overly permissive policies are one of the most common root causes of serious security incidents in AWS environments.

## Common Mistake

Attaching `AdministratorAccess` to application roles or CI/CD pipeline credentials "temporarily" during development, and never tightening it afterward. Equally common: creating long-lived IAM User access keys for something that should use a Role instead (an EC2 instance, a Lambda function, an ECS task) — anywhere AWS itself can assume a Role on your behalf, that's strictly safer than a static access key.

## Summary

Policies define permissions; Users represent people; Groups bundle Users under shared policies for manageable administration; Roles provide temporary, automatically-rotated credentials — the preferred mechanism for granting AWS services, applications, and cross-account access, instead of embedding long-lived access keys anywhere. Always apply least privilege: grant exactly the actions and resources needed, nothing broader.
