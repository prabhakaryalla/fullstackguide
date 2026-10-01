# Azure App Service

Azure App Service is a fully managed platform for hosting web apps, REST APIs, and mobile backends without managing the underlying VMs, OS patching, or web server configuration.

## Short Answer

App Service runs your code (ASP.NET, Node.js, Python, Java, containers, etc.) on managed infrastructure, giving you built-in scaling, deployment slots, custom domains/SSL, and CI/CD integration — you deploy code or a container image, Azure handles the hosting.

## Core Concepts

```archify
diagrams/azure-app-service-plan.html
```

- **App Service Plan** — defines the underlying compute (SKU/tier, region); multiple apps can share a plan.
- **Web App** — the actual application instance running on that plan.
- **Deployment Slots** — separate, live environments (e.g., `staging`, `production`) that share the same app, letting you deploy to staging, validate, then **swap** into production with near-zero downtime.

## Deployment Slots for Safe Releases

```archify
diagrams/azure-app-service-swap.html
```

- Swapping slots is close to instantaneous and reversible — if something's wrong post-swap, swap back immediately.

## Scaling

- **Scale up** — move to a bigger SKU (more CPU/RAM) for a single instance.
- **Scale out** — run multiple instances behind App Service's built-in load balancing; can be manual or automatic (autoscale rules based on CPU%, queue length, schedule).

```csharp
// Configuration example: reading connection strings/app settings injected by App Service
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
```

- App Service injects configuration as environment variables/app settings — keeping secrets out of source control (often combined with Key Vault references).

## Common Featuress

- **Custom domains & managed SSL certificates** — free, auto-renewing certs for custom domains.
- **Managed Identity** — lets the app authenticate to other Azure resources (Key Vault, Storage) without storing credentials (see the Managed Identity topic).
- **Continuous deployment** — connects directly to GitHub/Azure DevOps for automatic deploys on push.
- **Health checks** — App Service can automatically remove unhealthy instances from the load-balanced pool.

## App Service vs Other Compute Options

| | App Service | Azure Functions | AKS/Containers |
|---|---|---|---|
| Best for | Traditional web apps/APIs | Event-driven, short-lived executions | Complex, multi-container microservices |
| Scaling model | Manual/autoscale instances | Automatic, per-event | Manual/cluster autoscaler |
| Operational overhead | Low | Lowest | Highest (you manage the cluster) |

## Real-World Example

A company's ASP.NET Core API deploys to an App Service Plan with two deployment slots: CI/CD pushes every merge to `main` into the staging slot automatically, an automated smoke test suite runs against staging, and only after passing does a pipeline step trigger a slot swap into production — giving near-zero-downtime deploys with an instant rollback path if the swap introduces a regression.

## Summary

Azure App Service abstracts away server management for web apps/APIs: you provide code or a container, Azure handles hosting, scaling, SSL, and health monitoring. Deployment slots enable safe, swap-based releases with instant rollback, making it a common default choice for hosting traditional web applications on Azure.
