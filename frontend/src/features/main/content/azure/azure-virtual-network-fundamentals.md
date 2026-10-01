# Azure Virtual Network Fundamentals: Subnets, Peering, and Endpoints

Almost every Azure resource that isn't purely serverless eventually needs to communicate over a network — Virtual Networks (VNets) are Azure's fundamental networking building block, and subnets, peering, and endpoints are the core concepts for controlling how traffic flows.

## Short Answer

A VNet is an isolated network space in Azure; subnets divide it into smaller address ranges for organizing and securing resources; VNet Peering connects two VNets so resources can communicate as if on the same network; Service Endpoints and Private Endpoints both extend VNet-based access control to PaaS services, but with different underlying mechanisms.

## Virtual Networks and Subnets

```archify
diagrams/azure-vnet-subnets.html
```

- A VNet is scoped to a single region and defines a private IP address space (e.g., `10.0.0.0/16`).
- **Subnets** subdivide that address space, typically aligning with application tiers (web, app, data) so network security rules (NSGs, route tables) can be applied per tier.
- A **gateway subnet** is a special, reserved subnet specifically for a VPN Gateway or ExpressRoute Gateway resource — it must be named exactly `GatewaySubnet` and cannot host other resources.
- A VNet **can** have multiple gateway subnets historically for different gateway types, though modern designs typically use one gateway subnet per VNet.

### Reserved IP Addresses in a Subnet

Azure reserves 5 IP addresses in every subnet:
- Network address (first address)
- Default gateway
- Two addresses reserved for Azure DNS mapping
- Broadcast address (last address)

- A `/24` subnet has 256 total addresses, but only 251 are usable after these 5 reservations.

## Do VMs in the Same VNet Need IP Addresses to Communicate?

- No — all subnets within the same VNet can communicate with each other by default; a VM name (with Azure-provided DNS resolution) is sufficient to connect to another VM in the same VNet, without needing to know its specific IP address.

## VNet Peering

```archify
diagrams/azure-vnet-peering.html
```

- Connects two VNets (in the same or different regions) so resources in either can communicate directly using private IP addresses, as if they were part of one network.
- Traffic between peered VNets stays on Microsoft's backbone network — never traversing the public internet — and doesn't incur gateway/VPN overhead.
- Non-transitive by default: if VNet A peers with B, and B peers with C, A cannot automatically reach C without its own direct peering to C.

## Service Endpoints vs Private Endpoints

| | Service Endpoint | Private Endpoint |
|---|---|---|
| Mechanism | Extends VNet identity to the service over the Azure backbone; traffic still targets the service's public IP | Assigns the PaaS service a **private IP address** directly inside your VNet |
| Traffic path | Optimized route over Azure backbone, but destination is still the service's public endpoint | Fully private — never touches a public IP at all |
| Access from on-premises (via VPN/ExpressRoute) | Not supported (relies on VNet identity, not routable from outside Azure) | Supported (it's a real private IP, reachable from anywhere the VNet is reachable) |
| DNS | No DNS changes needed | Requires a Private DNS Zone to resolve the service's name to the private IP |

```archify
diagrams/azure-vnet-endpoints.html
```

- **Service Endpoints** are simpler to set up and sufficient when you just need to restrict a PaaS resource's firewall to "only this VNet/subnet," and don't need on-premises access.
- **Private Endpoints** are the more complete solution — fully removing the service from public exposure and enabling access from anywhere the VNet is reachable (including on-premises over ExpressRoute/VPN), at the cost of extra DNS configuration.

## Route Tables (User-Defined Routes)

```archify
diagrams/azure-vnet-route-table.html
```

- By default, Azure automatically routes traffic based on system routes (within the VNet, to the internet, etc.).
- A **Route Table** lets you override this with custom routes — most commonly, forcing all outbound traffic (`0.0.0.0/0`) through a network virtual appliance (firewall/NVA) for centralized inspection, instead of going directly to the internet.
- `0.0.0.0/0` as a destination means "match any address not more specifically matched by another route" — commonly used to define a default/catch-all route.

## Real-World Example

A three-tier application places web VMs in a `Web` subnet (internet-facing via a Load Balancer), app VMs in an isolated `App` subnet (only reachable from the Web subnet via NSG rules), and uses a Private Endpoint for its Azure SQL Database so the database has no public IP exposure at all — while VNet Peering connects this VNet to a shared "hub" VNet containing a firewall appliance that all outbound internet traffic is routed through via a custom route table.

## Summary

VNets and subnets provide the foundational, isolated network structure in Azure; VNet Peering connects separate VNets over Microsoft's backbone without public internet exposure; and Service Endpoints/Private Endpoints extend VNet-based access restrictions to PaaS services — Service Endpoints as a simpler, VNet-scoped optimization, and Private Endpoints as a fully private, on-premises-reachable alternative requiring additional DNS setup.
