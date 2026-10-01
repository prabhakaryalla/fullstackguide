# Kubernetes Objects Deep Dive: Services, Ingress, ConfigMaps, Secrets, and Workload Controllers

Beyond basic Pods and Deployments, Kubernetes provides a rich set of objects for exposing applications, managing configuration/secrets, running specialized workloads, and controlling resource usage — this deep dive covers the objects that show up constantly in real cluster configurations and interviews.

## Short Answer

**Services** expose a stable network endpoint for a set of Pods (four types: ClusterIP, NodePort, LoadBalancer, ExternalName). **Ingress** provides Layer 7 HTTP(S) routing into the cluster. **ConfigMaps/Secrets** externalize configuration and sensitive data from container images. **StatefulSets/DaemonSets/Jobs** handle specialized workload patterns beyond stateless Deployments. **HPA/Cluster Autoscaler** handle pod-level and node-level scaling respectively.

## Services: Four Types

```archify
diagrams/k8s-service-types.html
```

| Type | Accessibility | Typical Use |
|---|---|---|
| **ClusterIP** | Internal cluster only | Internal microservice-to-microservice communication (most secure default) |
| **NodePort** | Any node's IP + a specific port (30000–32767 range) | Simple external access without a cloud load balancer |
| **LoadBalancer** | Public IP via the cloud provider's load balancer | Production external-facing services |
| **ExternalName** | DNS-only redirect to an external service | Referencing an external database/API by an internal DNS name |

- `ClusterIP` is considered the **most secure** Service type — it has no external exposure at all by design.
- NodePort allocation starts from port **30000**.
- A Service maps to its backing Pods via **labels and selectors** — the Service's `selector` field matches Pods carrying corresponding labels, regardless of which node they're scheduled on.

## Ingress and Ingress Controllers

```archify
diagrams/k8s-ingress-routing.html
```

- **Ingress** is an API object defining Layer 7 (HTTP/HTTPS) routing rules — path-based or host-based — routing external traffic to different internal Services.
- **Ingress Controller** is the actual component (nginx, AWS ALB Ingress Controller, etc.) that reads Ingress resources and configures the underlying load balancer/reverse proxy to implement those rules — an Ingress resource without a running Ingress Controller does nothing.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  rules:
    - http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service: { name: api-service, port: { number: 80 } }
          - path: /
            pathType: Prefix
            backend:
              service: { name: web-service, port: { number: 80 } }
```

## ConfigMaps and Secrets

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: mongodb-service
  log_level: "info"
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: dXNlcm5hbWU=   # base64-encoded, NOT encrypted at this layer alone
  password: cGFzc3dvcmQ=
```

- **ConfigMap** — non-sensitive configuration (URLs, feature flags, log levels), decoupled from the container image so the same image can run in different environments with different config.
- **Secret** — sensitive data (passwords, tokens, TLS certs), stored **base64-encoded** (not encrypted by encoding alone — encryption-at-rest for Secrets must be explicitly enabled in the cluster's etcd configuration).
- Secret types include `Opaque` (generic key-value), `TLS` (certificate + private key), and `Service Account` (auto-created tokens for pods to authenticate with the Kubernetes API), and `docker-registry` (credentials for pulling private container images).
- Both can be mounted into a Pod as environment variables or as files via a volume mount.

## Namespaces

- Virtual clusters within a physical cluster — isolate resources, allow resource quotas per team/project, and scope RBAC permissions.
- Every Kubernetes object (Pods, Services, ConfigMaps, etc.) belongs to exactly one namespace.

## StatefulSets — For Stateful Applications

- Unlike Deployments (interchangeable, stateless Pod replicas), StatefulSets give each Pod a **stable, unique network identity** and **stable, dedicated storage** that survives Pod rescheduling.
- Pods are created, scaled, and terminated in **strict, sequential order** — critical for clustered databases (MySQL, PostgreSQL) or message brokers (Kafka) with ordering/dependency requirements.
- Automatically creates a **Headless Service**, giving each Pod its own resolvable DNS name for direct pod-to-pod addressing.

## DaemonSets — One Pod Per Node

- Ensures exactly one copy of a Pod runs on every (or a selected subset of) node in the cluster — unlike ReplicaSets, which just maintain a desired *total* count anywhere in the cluster.
- Typical use: node-level monitoring/logging agents (e.g., Prometheus Node Exporter, log shippers) that need to run on every node.

## Jobs — Run-to-Completion Workloads

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: data-migration-job
spec:
  completions: 1
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: migrator
          image: myregistry/migration-tool:latest
```

- Unlike Deployments (keep N replicas running forever), a Job runs a Pod to completion for a one-off or batch task, then stops — ideal for database migrations, batch processing, or scheduled report generation (paired with a `CronJob` for recurring schedules).

## Horizontal Pod Autoscaler (HPA) vs Cluster Autoscaler

| | Horizontal Pod Autoscaler | Cluster Autoscaler |
|---|---|---|
| Scales | Number of Pod replicas | Number of Nodes in the cluster |
| Trigger | CPU/memory/custom metrics per Pod | Pods that can't be scheduled due to insufficient node resources |

- HPA and Cluster Autoscaler work **together**: HPA adds more Pod replicas under load, and if there's no room to schedule them on existing nodes, Cluster Autoscaler provisions additional nodes to make room.

## LimitRange and ResourceQuota

- **LimitRange** — sets default/min/max CPU and memory constraints for individual containers within a namespace, preventing a single Pod from monopolizing node resources.
- **ResourceQuota** — caps the **total** aggregate CPU/memory (and object counts) consumable across an entire namespace, regardless of how many individual Pods share that budget.

## Persistent Volumes and Reclaim Policies

- **PersistentVolume (PV)** — a piece of cluster storage provisioned statically or dynamically (via a StorageClass).
- **PersistentVolumeClaim (PVC)** — how an application requests storage, matched to an available PV meeting its size/access-mode requirements.
- **Reclaim Policies** — `Retain` (keep the PV and its data after the PVC is deleted), `Delete` (automatically delete the PV when the PVC is deleted), `Recycle` (deprecated).

## Summary

Beyond Pods and Deployments, Kubernetes' object model covers exposing applications (Services, Ingress), externalizing configuration (ConfigMaps, Secrets), specialized workload patterns (StatefulSets for ordered/stateful apps, DaemonSets for per-node agents, Jobs for run-to-completion tasks), and scaling/resource governance (HPA, Cluster Autoscaler, LimitRange, ResourceQuota) — together forming the full toolkit for running production workloads reliably at scale.
