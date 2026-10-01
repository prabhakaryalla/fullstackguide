# VPC Fundamentals: Subnets, Route Tables, Internet Gateway, NAT Gateway

A Virtual Private Cloud (VPC) is your own logically isolated network within AWS — and the core building blocks (subnets, route tables, and gateways) determine exactly which resources can reach the internet, and which stay private.

## Short Answer

A VPC is divided into **subnets**, each tied to a single Availability Zone. Whether a subnet is "public" or "private" is purely a matter of its **route table**: a subnet is public if its route table sends internet-bound traffic (`0.0.0.0/0`) to an **Internet Gateway**; it's private if it has no such route (or routes internet-bound traffic through a **NAT Gateway** instead, for outbound-only internet access without being directly reachable from the internet).

## Subnets

```
VPC: 10.0.0.0/16
  ├── Public Subnet  (AZ-a): 10.0.1.0/24  — has a route to the Internet Gateway
  ├── Private Subnet (AZ-a): 10.0.2.0/24  — no direct route to the internet
  ├── Public Subnet  (AZ-b): 10.0.3.0/24
  └── Private Subnet (AZ-b): 10.0.4.0/24
```

- Each subnet lives entirely within one Availability Zone — spreading subnets across multiple AZs (as shown above) is how you achieve high availability for resources within a VPC.
- A subnet's "publicness" is not an inherent property of the subnet itself — it's entirely determined by what its associated route table points internet-bound traffic to.

## Internet Gateway (IGW)

```
Public Subnet Route Table:
  10.0.0.0/16  → local           (traffic within the VPC)
  0.0.0.0/0    → igw-0abc123     (everything else goes to the Internet Gateway)
```

- An Internet Gateway attaches to the VPC (one per VPC) and provides a target for a route that sends internet-bound traffic out — and, critically, allows traffic to route back **in** to instances with public IP addresses.
- An instance in a subnet routed to an IGW is directly reachable from the internet (assuming its Security Group also allows the traffic) — this is what makes a subnet genuinely "public."

## NAT Gateway

```
Private Subnet Route Table:
  10.0.0.0/16  → local
  0.0.0.0/0    → nat-0def456     (outbound internet access, but no inbound path exists)
```

- A NAT Gateway (placed in a *public* subnet) lets instances in a *private* subnet initiate outbound connections to the internet (e.g. downloading OS updates, calling an external API) — while remaining completely unreachable from the internet, since there's no route allowing inbound traffic to reach them directly.
- This is the standard pattern for backend application servers or databases: they need outbound internet access for updates/API calls, but should never be directly reachable from the public internet.

## Putting It Together: A Typical Two-Tier Architecture

```
Internet
   │
Internet Gateway
   │
Public Subnet  →  Application Load Balancer, NAT Gateway
   │
Private Subnet →  EC2 app servers, RDS database
   (outbound internet access via NAT Gateway; no direct inbound path from the internet)
```

The Load Balancer sits in the public subnet, directly reachable from the internet. The actual application servers and database sit in private subnets — reachable only from the Load Balancer (via Security Group rules) and able to reach the internet outbound only through the NAT Gateway, never directly inbound.

## Common Mistake

Assigning a public IP to an instance in a subnet and assuming that alone makes it "public," while forgetting the subnet's route table has no route to an Internet Gateway — the instance remains unreachable regardless of having a public IP, because there's no network path in. Conversely, forgetting a NAT Gateway entirely for private subnet instances that need outbound internet access (e.g. package updates) causes those updates to silently fail with no obvious network-level error.

## Summary

Subnets are the building blocks of a VPC, each pinned to one AZ. Whether a subnet is public or private depends entirely on its route table: a route to an Internet Gateway makes it public (bidirectional internet access); a route to a NAT Gateway (or no internet route at all) keeps it private (outbound-only, or fully isolated). Combining public subnets (load balancers, NAT gateways) with private subnets (application servers, databases) is the standard, secure VPC architecture pattern.
