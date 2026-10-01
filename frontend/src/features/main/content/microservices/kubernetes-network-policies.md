# Kubernetes Network Policies

By default, every Pod in a Kubernetes cluster can talk to every other Pod, across every namespace, with no restriction at all — Network Policies are how you actually lock that down to a deliberate, least-privilege set of allowed connections.

## Short Answer

A NetworkPolicy selects a set of Pods (via labels) and defines which **ingress** (incoming) and/or **egress** (outgoing) traffic is allowed to/from them — anything not explicitly allowed by at least one applicable policy is denied, but only once *any* NetworkPolicy selects that Pod at all (an unselected Pod remains fully open, per the cluster's default-allow behavior).

## The Default: No Isolation At All

```
Pod A (namespace: frontend) can freely talk to Pod B (namespace: backend-database)
Pod A can freely talk to EVERY pod in EVERY namespace, unless a NetworkPolicy says otherwise

This is true even across completely unrelated applications sharing the same cluster.
```

- Kubernetes' default networking model is **flat and fully open** — any Pod can reach any other Pod's IP directly, with zero built-in isolation between applications, teams, or namespaces.
- This is a genuinely common security gap in real clusters: teams assume namespaces provide network isolation by default (they don't — namespaces are an organizational/RBAC boundary, not a network one) and are surprised that a compromised pod in one namespace can freely reach services in a completely unrelated namespace.

## A Default-Deny Policy: The Standard Starting Point

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: backend-database
spec:
  podSelector: {}   # selects ALL pods in this namespace
  policyTypes:
    - Ingress
    - Egress
```

- An empty `podSelector: {}` matches every Pod in the namespace. With no `ingress`/`egress` rules specified at all, this creates a **default-deny** — every Pod in `backend-database` now rejects all incoming and outgoing traffic, until other, more specific policies explicitly allow something.
- This "default deny, then explicitly allow" pattern is the standard, recommended starting point for any namespace holding sensitive workloads — start locked down, then open exactly the specific connections actually needed.

## Explicitly Allowing Specific Traffic

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-database
  namespace: backend-database
spec:
  podSelector:
    matchLabels:
      app: postgres
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: frontend
          podSelector:
            matchLabels:
              app: api-server
      ports:
        - protocol: TCP
          port: 5432
```

- This policy selects Pods labeled `app: postgres`, and allows inbound traffic **only** from Pods labeled `app: api-server` specifically within the `frontend` namespace, and only on port `5432` — every other source, every other port, is still denied by the default-deny policy above.
- Combining `namespaceSelector` and `podSelector` lets you express precisely "only this specific application, in this specific namespace" rather than a broader "anything in this namespace" rule.

## Requires a CNI Plugin That Actually Enforces Policies

```
NetworkPolicy resources are just DECLARATIONS - a Container Network Interface (CNI)
plugin (Calico, Cilium, Azure CNI with Network Policy support, etc.) is what actually
ENFORCES them at the network level.
```

- Creating `NetworkPolicy` YAML does nothing on its own if the cluster's CNI plugin doesn't support Network Policy enforcement — some basic/default CNI setups silently accept the resource but never actually enforce it, giving a false sense of security that traffic is being restricted when it isn't.
- Always verify the specific CNI plugin in use actually implements Network Policy enforcement before relying on it as a real security boundary.

## Common Mistake

Assuming Kubernetes Namespaces alone provide network isolation between applications. They don't — Namespaces are purely an organizational and RBAC scoping boundary; without explicit Network Policies (and a CNI that enforces them), Pods in completely different namespaces can freely communicate over the network, which is very often not what teams assume by default.

## Summary

Kubernetes has no network isolation between Pods by default — any Pod can reach any other Pod cluster-wide. NetworkPolicies (enforced by the cluster's CNI plugin) let you define explicit ingress/egress rules per Pod selector, with the standard pattern being a default-deny-all policy per namespace, followed by narrowly-scoped policies allowing only the specific connections actually required.
