# KMS and Encryption at Rest / In Transit

AWS Key Management Service (KMS) is the central service for creating and managing the encryption keys that protect data across nearly every other AWS service — understanding how it fits into "encryption at rest" and "encryption in transit" is a near-universal AWS security interview topic.

## Short Answer

**Encryption at rest** protects data while it's stored (on disk, in a database, in S3) — AWS services integrate with **KMS** to manage the encryption keys used for this, so you rarely handle raw key material directly. **Encryption in transit** protects data while it's moving across a network (between a client and a service, or between services) — implemented via TLS/SSL, independent of KMS. The two are complementary, not alternatives — a properly secured system uses both.

## KMS: Managing Keys for Encryption at Rest

```
S3 Bucket (SSE-KMS enabled)
  → New object PutObject
  → S3 asks KMS to encrypt the object's data key using your KMS key
  → Object is stored encrypted; only principals with KMS decrypt permission can read it back
```

- A **Customer Master Key (CMK)**, now called a **KMS key**, never leaves KMS in plaintext — services ask KMS to encrypt/decrypt data (or, more precisely, to generate and wrap per-object "data keys") rather than downloading the key material directly, so the actual cryptographic key material is never exposed outside KMS itself.
- **AWS-managed keys** (free, created automatically per service) vs **Customer-managed keys** (you create and control the key policy, rotation schedule, and can disable/delete them) — customer-managed keys give you fine-grained control (who specifically can use this key to encrypt/decrypt) that AWS-managed keys don't expose.
- KMS key usage is controlled via a **key policy** (similar to an IAM policy, but attached to the key itself) — granting `kms:Decrypt` permission is what actually lets a role/user read encrypted data back, on top of any S3/IAM permissions on the resource itself.
- Integrated directly into most storage/database services: S3 (SSE-KMS), EBS volumes, RDS, DynamoDB, and Secrets Manager can all encrypt their data using a KMS key with just a configuration flag — no custom encryption code required.

## Encryption in Transit

```
Client ──TLS──► Application Load Balancer ──TLS──► EC2 instance ──TLS──► RDS database
```

- Implemented via TLS/SSL certificates — AWS Certificate Manager (ACM) provides free, auto-renewing TLS certificates for services like ALB/CloudFront, removing the operational burden of manually managing certificate expiry.
- Applies to every network hop where data could otherwise be intercepted — client-to-load-balancer, load-balancer-to-instance, and instance-to-database should all ideally use TLS, not just the outermost, user-facing connection.
- This is entirely separate from KMS/encryption-at-rest — a system can have perfect encryption in transit and completely unencrypted storage, or vice versa; both need to be deliberately configured.

## Envelope Encryption: How KMS Actually Encrypts Large Data

```
1. Ask KMS to generate a new "data key" (KMS returns both a plaintext copy and an encrypted copy)
2. Use the PLAINTEXT data key to encrypt your actual data locally (fast, symmetric encryption)
3. Discard the plaintext data key from memory immediately
4. Store the ENCRYPTED data key alongside your encrypted data

To decrypt later: ask KMS to decrypt the stored encrypted data key, then use the
resulting plaintext data key to decrypt the actual data.
```

- KMS itself has a payload size limit for direct encrypt/decrypt operations, and calling KMS for every byte of a large object would be slow and expensive — envelope encryption solves this by only ever sending the small data key (not the actual bulk data) to KMS, while all the actual data encryption/decryption happens locally using standard, fast symmetric cryptography.
- This is exactly what services like S3 and EBS do internally when you enable KMS-based encryption — you don't have to implement envelope encryption yourself for supported AWS services, only if you're building custom encryption into your own application.

## Common Mistake

Enabling encryption at rest and assuming that alone makes data "secure," while leaving encryption in transit unconfigured on internal hops (e.g. application-to-database traffic within a VPC, assumed "safe" just because it's internal). Both protections address different threats and should be configured independently — internal network traffic is not automatically safe from interception just because it never leaves AWS's network.

## Summary

KMS centrally manages the encryption keys used for encryption at rest across AWS services, using envelope encryption so only small data keys (not bulk data) ever touch KMS directly. Encryption in transit (TLS/SSL) is a separate, complementary protection for data moving across the network. A properly secured system deliberately configures both — at rest and in transit — rather than assuming one implies the other.
