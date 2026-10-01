# Shared Responsibility Model

Cloud security in AWS is a partnership, not something AWS handles entirely on your behalf — the Shared Responsibility Model draws a clear line between what AWS secures and what you, the customer, are responsible for securing yourself.

## Short Answer

AWS is responsible for **security OF the cloud** — the physical infrastructure, hardware, networking, and the software running the managed services themselves (the host OS and virtualization layer for EC2, the underlying infrastructure for RDS/DynamoDB/Lambda, etc.). The customer is responsible for **security IN the cloud** — everything they configure and put on top of that infrastructure: their data, IAM configuration, network/firewall rules (Security Groups), operating system patching (for unmanaged services like EC2), and application-level security.

## AWS's Responsibilities ("Security OF the Cloud")

- Physical security of data centers (access control, environmental protections).
- The hardware, host operating system, and virtualization layer underlying every service.
- Network infrastructure and the physical security of AWS's global network backbone.
- For fully-managed services (RDS, DynamoDB, Lambda, S3), AWS also manages patching, scaling, and availability of the underlying software/database engine itself.

## Customer Responsibilities ("Security IN the Cloud")

- **Data** — classification, encryption choices, and access control over your own data.
- **IAM configuration** — who has which permissions; a misconfigured, overly-permissive IAM policy is entirely the customer's responsibility, not AWS's.
- **Network configuration** — Security Groups, NACLs, VPC design; AWS provides the tools, but you decide (and are responsible for) how they're configured.
- **Operating system, patching, and application software** — for services where you manage the OS yourself (EC2), you're responsible for keeping it patched and secure; AWS only secures the underlying hypervisor/hardware.
- **Client-side data encryption**, and encryption of data in transit between your own systems.

## How Responsibility Shifts by Service Type

```
More customer responsibility  ←──────────────────────────→  More AWS responsibility

EC2 (IaaS)              RDS (managed PaaS)         Lambda / DynamoDB (fully managed/serverless)
- You patch the OS      - AWS patches the DB       - AWS manages almost everything
- You manage the app       engine and OS               underlying; you focus mainly on
- You configure          - You still manage           your code/data/access config
  networking/security       access, backups config,
                            and data itself
```

- The more "managed" a service is, the more of the underlying stack AWS takes responsibility for — but the customer is *never* fully absolved of responsibility for their own data, access configuration, and application logic, no matter how managed the service is.

## Why This Model Matters in Interviews

The most common real-world security incidents in AWS environments are **customer-side misconfigurations** — an S3 bucket accidentally left public, an overly permissive IAM policy, unpatched EC2 instances, or a leaked access key — not failures in AWS's own infrastructure. Understanding the Shared Responsibility Model is really understanding "what am I actually responsible for checking, even though AWS runs the infrastructure" — a genuinely practical, not just theoretical, distinction.

## Common Mistake

Assuming that using a managed AWS service automatically means "AWS handles security" for everything related to it. Even with a fully managed service like S3 or DynamoDB, the customer remains fully responsible for access control configuration (bucket policies, IAM), encryption choices, and the data itself — AWS securing "the cloud" never extends to securing how you've configured your own resources within it.

## Summary

AWS secures the underlying infrastructure, hardware, and (for managed services) the service software itself — "security OF the cloud." The customer is always responsible for their own data, access control configuration, network rules, and (for unmanaged compute) OS/application patching — "security IN the cloud." The split shifts based on how managed a service is, but the customer's core responsibilities (data, IAM, configuration) never fully disappear, regardless of service type.
