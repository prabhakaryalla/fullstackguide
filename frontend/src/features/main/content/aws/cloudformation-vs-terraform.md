# Infrastructure as Code: CloudFormation vs Terraform

Both let you define infrastructure in version-controlled configuration files instead of clicking through the AWS Console — the core difference is that CloudFormation is AWS-native and free, while Terraform is cloud-agnostic and works across multiple providers.

## Short Answer

**CloudFormation** is AWS's own native Infrastructure-as-Code service — it understands every AWS resource type as soon as AWS releases it, integrates tightly with other AWS services, and costs nothing beyond the resources it creates. **Terraform** (by HashiCorp) is a third-party, cloud-agnostic tool that can manage AWS alongside Azure, GCP, and hundreds of other providers in the same codebase, using its own HCL configuration language and state file.

## CloudFormation

```yaml
Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-app-data-bucket
      VersioningConfiguration:
        Status: Enabled
```

- Defines a **Stack** — a collection of resources managed together as one unit; updating the template and re-deploying computes a diff and applies only the necessary changes.
- **State** is managed entirely by AWS itself — there's no separate state file to store, secure, or worry about corrupting, since CloudFormation tracks stack state internally.
- New AWS resource types and features are typically supported in CloudFormation from (or very close to) their AWS launch date, since it's built and maintained by AWS itself.
- Free to use — you only pay for the underlying AWS resources it creates, not for CloudFormation itself.

## Terraform

```hcl
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-app-data-bucket"
}

resource "aws_s3_bucket_versioning" "versioning" {
  bucket = aws_s3_bucket.my_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}
```

- Maintains its own **state file** (locally or in a remote backend like an S3 bucket + DynamoDB lock table) tracking what it believes exists — this state file must be carefully managed, backed up, and locked against concurrent modification, since Terraform relies on it (not just live AWS API queries) to compute what needs to change.
- **Multi-cloud by design** — the same Terraform workflow, and often significant chunks of the same configuration structure, can manage resources in AWS, Azure, GCP, Kubernetes, and many SaaS providers, using provider plugins.
- A larger, very active open-source community and module ecosystem (the Terraform Registry) — pre-built, reusable modules for common patterns are widely available.
- `terraform plan` shows exactly what will change **before** you apply it — a dry-run step that's a core part of Terraform's standard workflow.

## Key Differences at a Glance

| | CloudFormation | Terraform |
|---|---|---|
| Scope | AWS only | Multi-cloud (AWS, Azure, GCP, and more) |
| State management | Managed by AWS internally | You manage a state file yourself (local or remote backend) |
| Language | YAML/JSON | HCL (HashiCorp Configuration Language) |
| New AWS feature support | Typically immediate (AWS builds it) | Depends on the AWS provider plugin being updated |
| Cost | Free (pay only for resources created) | Free (open-source core); Terraform Cloud/Enterprise adds paid tiers |

## Common Mistake

Choosing Terraform for a team that only ever uses AWS and has no multi-cloud need, purely because it's popular — CloudFormation's tighter AWS integration and lack of a separate state file to manage can be the simpler, lower-maintenance choice for an AWS-only shop. Conversely, choosing CloudFormation for an organization that already runs infrastructure across multiple cloud providers means maintaining entirely separate tooling per cloud, where Terraform's single, unified workflow would reduce operational overhead.

## Summary

CloudFormation is AWS-native, state-free (from the user's perspective), and gets new AWS features immediately — the natural default for an AWS-only organization. Terraform trades that native integration for cloud-agnostic reach, a large module ecosystem, and an explicit plan/apply workflow — the stronger choice for multi-cloud environments or teams that value its broader community and tooling.
