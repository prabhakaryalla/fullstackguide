# Docker and Kubernetes (AKS) Fundamentals

Docker packages an application with everything it needs to run into a portable container image; Kubernetes (and Azure's managed offering, AKS) orchestrates many containers across a cluster of machines — handling scheduling, scaling, networking, and self-healing.

## Short Answer

- **Docker** — builds and runs a single container: your app + its dependencies, isolated and portable across any machine with a Docker runtime.
- **Kubernetes** — manages many containers across many machines: scheduling where they run, restarting failed ones, scaling them, and routing traffic to them.
- **AKS (Azure Kubernetes Service)** — a managed Kubernetes control plane on Azure, so you don't operate the cluster's management layer yourself.

## Docker Basics

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyApi.dll"]
```

```bash
docker build -t myapi:latest .
docker run -p 8080:8080 myapi:latest
```

- A multi-stage build keeps the final image small (only the compiled output, not the full SDK).
- The image runs identically on a developer's laptop, a CI pipeline, or production — "it works on my machine" problems largely disappear because the environment travels with the app.

## Why You Need Orchestration at Scale

```archify
diagrams/azure-k8s-orchestration-need.html
```

- Running one container manually is fine for a single machine; running dozens of services across many machines, with automatic restarts, scaling, and rolling updates, is what Kubernetes solves.

## Core Kubernetes Concepts

| Concept | Purpose |
|---|---|
| **Pod** | Smallest deployable unit — one or more tightly coupled containers |
| **Deployment** | Declares desired state (image, replica count) and manages rolling updates |
| **Service** | Stable network endpoint/load balancer routing to a set of pods |
| **Ingress** | HTTP(S) routing rules from outside the cluster to internal services |
| **Namespace** | Logical isolation boundary within a cluster (e.g., per team/environment) |

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapi
spec:
  replicas: 3
  selector:
    matchLabels: { app: myapi }
  template:
    metadata:
      labels: { app: myapi }
    spec:
      containers:
        - name: myapi
          image: myregistry.azurecr.io/myapi:latest
          ports: [{ containerPort: 8080 }]
---
apiVersion: v1
kind: Service
metadata:
  name: myapi-service
spec:
  selector: { app: myapi }
  ports: [{ port: 80, targetPort: 8080 }]
  type: LoadBalancer
```

## AKS — Why "Managed" Matters

```archify
diagrams/azure-aks-control-plane.html
```

- Azure operates and patches the Kubernetes control plane (API server, scheduler, etcd) for you — you're responsible for the worker nodes (VMs) and what runs on them.
- Integrates with Azure Container Registry (image storage), Azure AD (RBAC for cluster access), and Azure Monitor (observability) out of the box.

## When to Use What

| Need | Choice |
|---|---|
| Single app, simple deployment | Azure App Service (containerized) |
| Event-driven, short-lived executions | Azure Functions |
| Many interdependent microservices, need fine-grained orchestration control | AKS |

## Autoscaling: Pods vs. Nodes

Two independent autoscaling mechanisms work together, and confusing them is a common source of "why didn't it scale" confusion:

- **Horizontal Pod Autoscaler (HPA)** — adds/removes **pod replicas** of a Deployment based on observed CPU/memory or custom metrics. This only helps if the *cluster's nodes* have spare capacity to actually schedule those new pods.
- **Cluster Autoscaler** — adds/removes **nodes** (VMs) in the cluster when pods can't be scheduled due to insufficient node capacity, or removes underutilized nodes to save cost.

In practice: HPA decides "we need more replicas," and if the current nodes are full, the Cluster Autoscaler notices unschedulable pods and adds a node so HPA's new replicas can actually run. Relying on HPA alone without cluster autoscaling means pod scale-out silently stalls once existing nodes are full.

## Stateful Workloads

Plain Deployments assume pods are interchangeable and disposable — fine for stateless APIs, but databases/queues need stable network identity and persistent storage across restarts. Kubernetes' **StatefulSet** provides stable pod names/ordering and each replica gets its own persistent volume that survives pod rescheduling — the standard building block for running stateful services (databases, message brokers) directly in Kubernetes, though many teams instead prefer using a managed PaaS database/queue outside the cluster specifically to avoid the operational complexity of running stateful workloads in Kubernetes themselves.

## When NOT to Use AKS

Running a full Kubernetes cluster is real operational overhead — networking (CNI plugin choice), ingress controller setup/management, RBAC, node OS patching cadence, and cluster upgrades all need ongoing attention. For a single application or a small number of services, App Service or Azure Container Apps typically deliver the same containerized deployment benefit with far less operational surface area — reach for AKS when you specifically need Kubernetes' fine-grained orchestration control across many interdependent services, not by default for "we use containers."

## Real-World Example

A microservices-based order platform packages each service (orders, inventory, notifications) as a Docker image, pushes them to Azure Container Registry, and deploys them to AKS as separate Deployments — Kubernetes automatically restarts any crashed pod, the built-in autoscaler adds replicas during a sales event, and a rolling update strategy deploys new versions of each service with zero downtime.

## Summary

Docker solves "package and run one application consistently anywhere"; Kubernetes (and AKS as its managed Azure form) solves "run and coordinate many containers reliably across a cluster" — handling scheduling, scaling, self-healing, and networking that would otherwise require significant manual operational work.
