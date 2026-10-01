# Azure VM Availability and Scaling Options

Running a single Azure VM is easy — running one reliably, at scale, and cost-efficiently requires understanding Availability Sets, Availability Zones, VM Scale Sets, Spot Instances, and a handful of VM-specific security/management features.

## Short Answer

**Availability Sets** protect against hardware failure within a single datacenter by spreading VMs across separate fault/update domains. **Availability Zones** protect against an entire datacenter failure by spreading VMs across physically separate zones within a region. **VM Scale Sets** automatically manage a group of identical, load-balanced VMs that scale in/out based on demand. **Spot VMs** offer steep discounts in exchange for the VM being evictable when Azure needs the capacity back.

## Availability Sets

```archify
diagrams/azure-vm-availability-set.html
```

- **Fault Domains** — group of VMs sharing a common power source and network switch; spreading VMs across fault domains means a single hardware rack failure doesn't take down every instance.
- **Update Domains** — group of VMs that Azure reboots together during planned maintenance; spreading VMs across update domains ensures not all instances go down simultaneously during a host OS update.
- An Availability Set **cannot** be added to a VM after creation — it must be specified at VM creation time, since it affects the underlying physical placement.

## Availability Zones

```archify
diagrams/azure-availability-zones.html
```

- Each zone is one or more physically separate datacenters with independent power, cooling, and networking within the same region.
- Distributing VMs across zones protects against an entire datacenter-level outage — a strictly stronger guarantee than Availability Sets (which only protect against rack/host-level failure within one datacenter).
- Not every Azure region supports Availability Zones — this needs to be verified per-region during design.

## VM Scale Sets (VMSS)

- Manages a group of identical, load-balanced VMs as a single logical unit — automatically scaling the number of instances up or down based on defined metrics (CPU, custom metrics) or a schedule.
- Integrates with Azure Load Balancer or Application Gateway to distribute traffic automatically across all current instances.
- New instances are created from the same base image/configuration, ensuring consistency without manual per-VM setup.

## Azure Spot VMs

- Purchase unused Azure compute capacity at a **significant discount** (up to ~90% off pay-as-you-go pricing).
- Trade-off: Azure can **evict** (deallocate) a Spot VM with short notice whenever it needs the capacity back for regular (pay-as-you-go/reserved) customers.
- Best suited for interruptible, stateless, or fault-tolerant workloads: batch processing, dev/test environments, CI/CD build agents, big-data workloads that can checkpoint and resume.

## Security Types for VMs

| Type | Protection |
|---|---|
| **Standard** | No additional infrastructure-level protections beyond normal Azure security |
| **Trusted Launch** | Adds Secure Boot and vTPM (virtual Trusted Platform Module) to protect against boot-level/rootkit attacks |
| **Confidential VMs** | Encrypts data **in use** (in memory), not just at rest/in transit — protects against a compromised hypervisor or host operator from reading VM memory |

- Trusted Launch is now the recommended default security type for most new Gen2 VMs — it protects the boot process itself, which Standard VMs don't address at all.

## Snapshots, Sysprep, and Generalizing an Image

```archify
diagrams/azure-vm-image-generalization.html
```

- **Disk Snapshot** — a point-in-time copy of a VM's disk, usable for backup/recovery or to create a new disk elsewhere; doesn't require the VM to be "generalized."
- **Sysprep** — a Windows utility that strips machine-specific information (SID, computer name, drivers) from an OS before capturing it as a reusable **image** template.
- **Why run Sysprep before capturing an image**: without it, every VM created from that image would share the same machine SID and identity information, causing conflicts (especially for domain-joined machines) — Sysprep ensures each deployed VM gets a fresh, unique identity on first boot.

## Azure Bastion

- Provides secure RDP/SSH access to VMs directly through the Azure Portal, over TLS, **without** exposing the VM's RDP/SSH port to the public internet at all.
- Removes the need for a public IP on the VM itself or a jump-box VM with its own exposed management port — a common security hardening measure.

## Proximity Placement Groups

- Ensures VMs are physically located as close together as possible within a datacenter, minimizing network latency between them — useful for latency-sensitive, tightly-coupled workloads (e.g., a clustered application requiring very low inter-node latency).

## Real-World Example

A web application's front-end tier runs on a VM Scale Set spread across three Availability Zones (surviving a full datacenter outage), behind a Standard Load Balancer; a batch image-processing job runs on Spot VMs to minimize cost, checkpointing progress so evictions don't lose work; and administrators access any VM for troubleshooting exclusively through Azure Bastion, with no VM ever exposing RDP/SSH to the public internet.

## Summary

Availability Sets protect against rack/host-level failure within one datacenter; Availability Zones protect against a full datacenter failure by spreading across physically separate facilities; VM Scale Sets automate managing and scaling a fleet of identical, load-balanced instances; and Spot VMs trade eviction risk for steep discounts on interruptible workloads — combined with security features like Trusted Launch/Confidential VMs and access patterns like Azure Bastion, these form the core toolkit for running VM-based workloads reliably and securely at scale.
