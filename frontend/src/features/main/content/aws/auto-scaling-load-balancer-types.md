# Auto Scaling Groups and Load Balancer Types

An Auto Scaling Group (ASG) automatically adds or removes EC2 instances based on demand; a Load Balancer distributes incoming traffic across whatever instances the ASG currently has running. Together, they're the standard pattern for a resilient, elastic web tier.

## Short Answer

An **Auto Scaling Group** maintains a desired number of EC2 instances, scaling up under load and back down when demand drops (based on metrics like CPU utilization, or a schedule). A **Load Balancer** sits in front of those instances, health-checking them and routing traffic only to the healthy ones. AWS offers three Load Balancer types — **ALB** (HTTP/HTTPS, layer 7), **NLB** (raw TCP/UDP, layer 4, ultra-low latency), and the older **CLB** (Classic, largely legacy) — chosen based on the protocol and performance characteristics you need.

## Auto Scaling Groups

```
Desired Capacity: 4
Minimum: 2
Maximum: 10

Scaling Policy: Target Tracking
  Target: 50% average CPU utilization across the group
```

- **Target Tracking** scaling policies are the most common: you specify a target metric value (e.g. 50% CPU), and AWS automatically adds/removes instances to keep the actual metric near that target — no manual threshold tuning required.
- Instances failing health checks are automatically terminated and replaced — an ASG doesn't just scale capacity, it also self-heals by replacing unhealthy instances.
- Combine with **Launch Templates** to define exactly what a new instance looks like (AMI, instance type, security groups, user-data bootstrap script) — every instance the ASG launches follows the same template, so scaling out never means manually configuring new servers.

## Application Load Balancer (ALB) — Layer 7

```
Listener: HTTPS :443
  Rule: path /api/*   → Target Group: api-servers
  Rule: path /static/* → Target Group: static-content-servers
  Rule: default        → Target Group: web-servers
```

- Operates at the HTTP/HTTPS layer — can route based on URL path, hostname, headers, or query string, letting one Load Balancer serve multiple backend services (a common pattern for a monolith being gradually split into microservices, or hosting several apps behind one domain).
- Best fit for typical web application traffic (REST APIs, web apps) where content-based routing and HTTP-level features (redirects, fixed responses, WebSocket support) are useful.

## Network Load Balancer (NLB) — Layer 4

```
Listener: TCP :443 → Target Group: backend-servers (forwards raw TCP, no HTTP awareness)
```

- Operates at the TCP/UDP layer — no visibility into HTTP content, just forwards raw packets, which makes it extremely low-latency and able to handle very high throughput (millions of requests per second).
- The right choice for non-HTTP protocols, extreme performance requirements, or when you need a **static IP address** for the load balancer itself (ALB's IPs can change; NLB supports Elastic IPs directly).

## Classic Load Balancer (CLB) — Legacy

- AWS's original load balancer, predating ALB/NLB — supports basic layer 4 and layer 7 features, but lacks ALB's advanced content-based routing and NLB's ultra-low-latency performance.
- Generally only seen in older, not-yet-migrated infrastructure — AWS recommends ALB or NLB for any new deployment.

## Choosing Between ALB and NLB

| Need | Best Fit |
|---|---|
| HTTP/HTTPS traffic, path/host-based routing | ALB |
| Raw TCP/UDP, non-HTTP protocols | NLB |
| Extreme throughput, ultra-low latency | NLB |
| A fixed, static IP address for the load balancer | NLB |
| WebSocket support, HTTP header-based routing | ALB |

## Common Mistake

Setting an ASG's scaling policy based on a metric that doesn't actually reflect real load (e.g. scaling on CPU when the application is actually memory-bound or I/O-bound) — the group scales "correctly" according to its policy while the real bottleneck goes unaddressed, and users still experience degraded performance despite the ASG reporting healthy scaling behavior.

## Summary

An Auto Scaling Group keeps the right number of healthy instances running automatically, scaling with demand and replacing unhealthy instances. ALB, NLB, and CLB distribute traffic to those instances — ALB for HTTP-aware, content-based routing; NLB for raw, ultra-low-latency TCP/UDP traffic; CLB as a largely legacy option. Together, ASG + Load Balancer form the standard resilient, elastic architecture for a web tier on AWS.
