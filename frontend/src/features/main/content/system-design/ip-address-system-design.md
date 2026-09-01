# IP Address

An IP address is a unique network identifier used to locate devices and route data across networks.

In system design, understanding IP addressing is essential for service communication, scalability, network segmentation, and security.

## Why IP Addresses Matter

Without IP addresses:

- devices cannot find each other
- packets cannot be routed across networks
- distributed systems cannot communicate reliably

Every request from client to server ultimately depends on IP-level routing.

## IPv4 vs IPv6

### IPv4

- 32-bit address format
- example: 192.168.1.10
- limited address space

### IPv6

- 128-bit address format
- example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
- vastly larger address space

Modern systems increasingly support dual stack (IPv4 + IPv6).

## Public vs Private IP

### Public IP

- globally routable on internet
- used for internet-facing endpoints

### Private IP

- used inside private networks/VPC/VNet
- not directly internet routable

Common private IPv4 ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16

## Static vs Dynamic IP

### Static IP

- fixed address
- useful for stable DNS mapping, allowlists, gateways

### Dynamic IP

- assigned automatically and can change
- common for client devices and elastic workloads

## Subnet and CIDR Basics

CIDR notation defines network range and prefix length.

Example:

- 10.0.1.0/24 means 256 addresses in that subnet

Subnetting helps with:

- network segmentation
- security zone boundaries
- route control
- blast radius reduction

## Routing Concept

Routers forward packets based on destination IP and routing tables.

Simplified flow:

1. Source host sends packet to gateway.
2. Each router forwards packet toward destination network.
3. Destination host receives packet.

## Architecture Diagram

```mermaid
flowchart LR
    C[Client 192.168.1.10] --> R1[Local Router]
    R1 --> ISP[ISP Router]
    ISP --> Edge[Cloud Edge]
    Edge --> LB[Load Balancer Public IP]
    LB --> S[Server Private IP 10.0.2.5]
```

## NAT (Network Address Translation)

NAT maps private IP traffic to public IP for internet access.

Why important in system design:

- conserves public IPv4 addresses
- hides internal network structure
- enables outbound internet access from private subnets

Common types:

- SNAT (source NAT)
- DNAT (destination NAT)

## IP Address in Cloud Design

In cloud architectures, IP planning affects:

- VNet/VPC design
- peering connectivity
- hybrid networking (VPN/ExpressRoute)
- firewall and NSG rules
- service endpoint and private endpoint access

Poor IP planning can block future scaling and network integration.

## DNS Relationship

Applications usually call domain names, but DNS resolves to IP addresses.

This abstraction allows backend IPs to change without changing client code.

## Security Considerations

IP-based controls are common:

- firewall allowlists/denylists
- geo-blocking
- subnet isolation

But IP alone is not strong identity. Combine with:

- TLS
- authentication tokens
- zero-trust controls

## Common System Design Scenarios

### 1. Multi-Tier App

- web tier in public subnet
- app and database tiers in private subnets
- controlled access via load balancer and firewall rules

### 2. Multi-Region Deployment

- each region has non-overlapping CIDR blocks
- global routing directs users to nearest healthy region

### 3. Hybrid Network

- on-prem network connected to cloud VNet
- non-overlapping IP ranges required to avoid routing conflicts

## Common Mistakes

- overlapping CIDR ranges across environments
- exposing internal services with public IP unnecessarily
- relying only on IP filtering for security
- not reserving IP space for future growth

## Interview Framing

For system design questions, explain IP in layers:

1. addressing model (public/private, v4/v6)
2. subnet segmentation and routing
3. NAT and internet egress/ingress
4. security controls tied to network boundaries

This demonstrates practical infrastructure thinking.

## Summary

IP address is the fundamental location and routing primitive of distributed systems. Strong system design requires understanding address types, subnetting, NAT, and how IP decisions impact scalability, reliability, and security.
