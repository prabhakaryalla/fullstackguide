# Hybrid Connectivity: VPN Gateway vs ExpressRoute

Connecting an on-premises network to Azure can go over the public internet (via a VPN Gateway, encrypted but variable) or over a dedicated, private connection that never touches the public internet at all (ExpressRoute) — the choice comes down to required bandwidth, latency consistency, and budget.

## Short Answer

**VPN Gateway** creates an encrypted tunnel over the **public internet** between your on-premises network (or another cloud) and an Azure VNet — quick to set up, relatively low cost, but subject to the public internet's variable latency and bandwidth. **ExpressRoute** provides a **private, dedicated connection** to Azure through a connectivity provider, bypassing the public internet entirely — offering more predictable latency, higher bandwidth, and (for the "Private Peering" configuration) direct access to your VNets without any public IP exposure at all, at a significantly higher cost and longer provisioning lead time.

## VPN Gateway (Site-to-Site VPN)

```
On-Premises Network ──(IPsec/IKE encrypted tunnel, over the public internet)──► Azure VNet Gateway
```

- Traffic is encrypted end-to-end via IPsec/IKE, but still physically traverses the public internet — meaning it's subject to the general internet's variable latency, jitter, and the (small but non-zero) throughput ceiling of a VPN tunnel (a few Gbps depending on the Gateway SKU).
- Fast to provision — typically operational within hours, since there's no physical circuit or third-party connectivity provider involved, just configuration on both ends.
- The right default for smaller-scale hybrid connectivity, dev/test scenarios, or as a **backup path** even alongside ExpressRoute (for redundancy if the dedicated circuit fails).

## ExpressRoute

```
On-Premises Network ──(dedicated private circuit, via a connectivity provider)──► Microsoft Edge Router ──► Azure
                         (does NOT traverse the public internet at all)
```

- Requires working with a connectivity provider (a telecom/network provider with an existing point of presence at a Microsoft peering location) to establish a physical, dedicated circuit — provisioning typically takes weeks, not hours, and involves an ongoing circuit cost separate from Azure's own charges.
- Offers significantly higher bandwidth (up to 100 Gbps with ExpressRoute Direct) and much more consistent, predictable latency than a VPN tunnel over the shared public internet.
- **Private Peering** lets on-premises networks reach Azure VNets directly, with no public IP addresses involved in the path at all — a meaningfully stronger network isolation posture than any internet-routed connection, VPN or otherwise.
- Traffic **is not encrypted by default** at the ExpressRoute layer itself (since it's already on a private circuit, not the public internet) — if end-to-end encryption is still required for compliance reasons, you layer application-level or IPsec encryption on top, rather than relying on ExpressRoute's physical privacy alone.

## Choosing Between Them

| Need | Best Fit |
|---|---|
| Fast setup, lower cost, moderate bandwidth | VPN Gateway |
| Dev/test, or a backup/failover path | VPN Gateway |
| Large, consistent bandwidth (multiple Gbps+) | ExpressRoute |
| Predictable, low-jitter latency (e.g. for real-time/latency-sensitive workloads) | ExpressRoute |
| Strict requirement to never traverse the public internet | ExpressRoute |
| Budget-constrained, or connectivity need is temporary/short-term | VPN Gateway |

## Using Both Together for Resilience

```
Primary path:  On-Premises ──ExpressRoute (private circuit)──► Azure
Backup path:   On-Premises ──VPN Gateway (over public internet)──► Azure
```

A common enterprise pattern uses ExpressRoute as the primary hybrid connection for its bandwidth/latency benefits, with a VPN Gateway configured as an automatic failover path — if the ExpressRoute circuit experiences an outage, traffic can still reach Azure via the VPN tunnel, at reduced bandwidth/consistency but without a complete connectivity loss.

## Common Mistake

Assuming ExpressRoute traffic is automatically encrypted simply because it's a private, dedicated circuit rather than public internet — physical/network-level privacy is not the same guarantee as cryptographic encryption. Workloads with a genuine compliance requirement for encryption in transit still need to add it explicitly (application-level TLS, or IPsec over ExpressRoute), even on a private circuit.

## Summary

VPN Gateway provides fast, lower-cost, encrypted connectivity over the public internet — a good default for smaller-scale needs or as a resilient backup path. ExpressRoute provides a dedicated, private circuit bypassing the public internet entirely, with higher bandwidth and more predictable latency, at a higher cost and longer setup time — the right choice for large enterprises with sustained bandwidth needs or a strict requirement to avoid the public internet, but not automatically encrypted by default.
