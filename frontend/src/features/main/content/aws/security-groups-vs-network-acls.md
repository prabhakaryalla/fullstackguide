# Security Groups vs Network ACLs

Both control traffic in and out of your VPC, but at different layers and with different rule semantics — a Security Group protects an instance (stateful), while a Network ACL protects an entire subnet (stateless).

## Short Answer

**Security Groups** operate at the instance (ENI) level and are **stateful** — if you allow inbound traffic, the matching outbound response is automatically allowed, with no separate rule needed. **Network ACLs** operate at the subnet level and are **stateless** — inbound and outbound rules are evaluated completely independently, so you must explicitly allow both directions of any traffic you want to permit.

## Security Groups

```
Inbound Rule: Allow TCP 443 from 0.0.0.0/0   (HTTPS from anywhere)
Inbound Rule: Allow TCP 22 from 10.0.0.0/16  (SSH only from within the VPC)
```

- Only supports **Allow** rules — there's no explicit "Deny" in a Security Group; anything not explicitly allowed is implicitly denied.
- **Stateful**: if an inbound rule allows a request in, the corresponding outbound response traffic is automatically permitted, regardless of any outbound rules — you don't need a matching outbound rule for replies to already-allowed inbound connections.
- Attached directly to individual instances/ENIs — different instances in the same subnet can have entirely different Security Groups.
- Evaluates **all** rules together (no ordering) — every applicable Allow rule across every attached Security Group is combined.

## Network ACLs (NACLs)

```
Inbound Rule 100: Allow TCP 443 from 0.0.0.0/0
Inbound Rule 200: Deny  TCP *   from 203.0.113.0/24  (block a specific known-bad range)
Inbound Rule *:   Deny  all     from 0.0.0.0/0         (implicit final deny)
```

- Supports both **Allow and explicit Deny** rules — useful for specifically blocking a known-malicious IP range at the subnet level, something Security Groups can't express directly.
- **Stateless**: an allowed inbound request does *not* automatically permit its outbound response — you must add a separate outbound rule (often for ephemeral ports) or return traffic will be silently dropped.
- Rules are evaluated **in numbered order**, lowest number first — the first matching rule wins, and evaluation stops there (unlike Security Groups, where all rules are combined).
- Applied at the **subnet** level — every instance in that subnet is subject to the same NACL, regardless of its own Security Group.

## Key Differences at a Glance

| | Security Group | Network ACL |
|---|---|---|
| Operates at | Instance/ENI level | Subnet level |
| State | Stateful (return traffic auto-allowed) | Stateless (must explicitly allow both directions) |
| Rule types | Allow only | Allow and Deny |
| Rule evaluation | All rules combined | Ordered, first match wins |
| Default behavior | Deny all inbound, allow all outbound (until you add rules) | Allow all traffic (for the VPC's default NACL) |

## Why Use Both Together

Security Groups are your primary, day-to-day access control (which instances can talk to which, on which ports). NACLs add a second, coarser-grained layer — useful specifically for subnet-wide blocking (e.g. denying a known malicious IP range across an entire subnet, regardless of what any individual instance's Security Group allows) — defense in depth, not a replacement for Security Groups.

## Common Mistake

Forgetting that a NACL is stateless when troubleshooting "why can't my instance receive a response" — a common bug is allowing inbound traffic on a NACL but forgetting to also allow the corresponding **outbound** ephemeral port range (typically 1024–65535) that responses actually use, silently breaking connections that Security Groups alone would have handled automatically.

## Summary

Security Groups are stateful, instance-level, allow-only firewalls — your primary access control mechanism. Network ACLs are stateless, subnet-level firewalls supporting both allow and explicit deny rules, evaluated in order — a coarser, secondary layer of defense. Most day-to-day access control lives in Security Groups; NACLs are reserved for subnet-wide blocking rules that Security Groups can't express.
