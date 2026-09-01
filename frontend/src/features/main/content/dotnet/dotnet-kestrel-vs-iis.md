# Kestrel Server in ASP.NET Core vs IIS

Kestrel is the cross-platform web server built for ASP.NET Core.

IIS is a Windows web server platform with additional hosting and management features.

## What Is Kestrel?

Kestrel is:

- Lightweight and high-performance
- Cross-platform (Windows, Linux, macOS)
- The default server used by ASP.NET Core apps

A basic ASP.NET Core app runs directly on Kestrel.

## What Is IIS?

IIS is:

- Windows-only web server
- Mature enterprise hosting platform
- Provides features like process management, app pools, Windows auth integration, and advanced admin tooling

In ASP.NET Core hosting, IIS commonly works as a reverse proxy in front of Kestrel.

## Main Difference

- Kestrel runs your ASP.NET Core app server.
- IIS can front that app and provide edge/server management capabilities.

## Typical Hosting Models

### Kestrel only

- Common for Linux containers and cloud-native deployments.
- App listens directly on ports and handles requests.

### IIS + Kestrel (reverse proxy)

- IIS accepts internet traffic first.
- IIS forwards requests to Kestrel via ASP.NET Core Module.
- Kestrel executes app middleware and endpoints.

## Comparison Table

| Area | Kestrel | IIS |
|:---|:---|:---|
| Platform | Cross-platform | Windows only |
| Role in ASP.NET Core | App server | Front-end web server/reverse proxy (common) |
| Performance focus | Very high throughput | Rich hosting/management features |
| Configuration style | App settings/code + hosting config | IIS Manager + server config |
| Best fit | Containers, microservices, cloud-native | Windows enterprise hosting |

## Security and TLS

Both can terminate HTTPS.

- Kestrel can handle TLS directly.
- In IIS+Kestrel setups, TLS often terminates at IIS, then request is proxied to Kestrel.

## Simple Program Setup with Kestrel

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello from Kestrel-hosted ASP.NET Core app");

app.Run();
```

## When to Choose Which

Use Kestrel directly when:

- Running in containers/Kubernetes
- Deploying behind cloud load balancers
- You want minimal hosting footprint

Use IIS in front of Kestrel when:

- You are in Windows enterprise environments
- You need IIS operational features and central administration
- You rely on IIS ecosystem/integration

## Real-World Analogy

Kestrel is like the kitchen that actually cooks the food.

IIS is like the restaurant front desk that receives customers, applies entry rules, and routes orders to the kitchen.
