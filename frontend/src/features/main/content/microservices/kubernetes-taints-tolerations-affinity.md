# Kubernetes Taints, Tolerations, and Node Affinity

By default, the Kubernetes scheduler is free to place a Pod on any node with sufficient resources — Taints/Tolerations and Affinity are the two complementary mechanisms for controlling exactly which nodes a Pod can (or must) land on.

## Short Answer

**Taints** are applied to **nodes**, repelling Pods away by default — a Pod can only be scheduled on a tainted node if it has a matching **Toleration**. **Node Affinity** is applied to **Pods**, attracting them toward (or, with anti-affinity, away from) nodes matching specific label criteria. The key conceptual difference: taints/tolerations are about *exclusion* (keep Pods off this node unless they opt in), while affinity is about *preference/requirement* (this Pod wants — or must have — a node with these characteristics).

## Taints: Repelling Pods From a Node

```bash
kubectl taint nodes gpu-node-1 workload=gpu:NoSchedule
```

```yaml
# Without a matching toleration, a Pod CANNOT be scheduled on gpu-node-1 at all
tolerations:
  - key: "workload"
    operator: "Equal"
    value: "gpu"
    effect: "NoSchedule"
```

- A taint has an **effect**: `NoSchedule` (don't schedule new Pods here unless tolerated), `PreferNoSchedule` (try to avoid it, but not a hard rule), or `NoExecute` (evict any already-running Pods that don't tolerate it, in addition to blocking new ones).
- Taints are the standard way to **dedicate** nodes for specific purposes — e.g. tainting expensive GPU nodes so only Pods explicitly requesting GPU work (via a matching toleration) ever land there, keeping general-purpose workloads off them entirely.

## Node Affinity: Attracting Pods to Specific Nodes

```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
        - matchExpressions:
            - key: disktype
              operator: In
              values: ["ssd"]
```

- `requiredDuringSchedulingIgnoredDuringExecution` is a **hard requirement** — the Pod will only be scheduled on a node matching the criteria; if none exist, the Pod stays unscheduled (Pending) rather than being placed somewhere that doesn't match.
- A `preferred...` variant exists too, expressing a soft preference the scheduler tries to honor but won't block scheduling over if no matching node is available.
- Unlike taints, node affinity requires **no cooperation from the node** — it's purely the Pod expressing its own placement preference/requirement based on the node's existing labels.

## Pod Anti-Affinity: Keeping Pods Apart From Each Other

```yaml
affinity:
  podAntiAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
            - key: app
              operator: In
              values: ["web-server"]
        topologyKey: "kubernetes.io/hostname"
```

- This tells the scheduler "don't place two Pods labeled `app: web-server` on the same node" (`topologyKey: kubernetes.io/hostname` means "same node" specifically; using a zone-level label instead would mean "same Availability Zone").
- This is the standard technique for genuine high availability — without anti-affinity, nothing stops the scheduler from placing all replicas of a Deployment onto the same single node, which means that one node failing takes down every replica simultaneously, defeating the entire purpose of running multiple replicas.

## Taints/Tolerations vs Affinity: Working Together

```
Taints/Tolerations: "Keep general workloads OFF this node, unless they specifically opt in"
Node Affinity:       "THIS pod specifically wants (or requires) a node with these characteristics"

Using both together for dedicated GPU nodes:
  - Taint the GPU nodes (repels everything by default)
  - Give GPU-workload Pods BOTH a matching toleration (permission to land there)
    AND a node affinity rule (actually attracting them there, rather than just allowing it)
```

Using taints alone only prevents unwanted Pods from landing on a node — it doesn't actively attract the Pods that *should* be there. Combining a taint (exclusion) with node affinity (attraction) on the same dedicated nodes achieves both: general workloads are kept off, and the specific workloads that need those nodes are actively scheduled there.

## Common Mistake

Using only a toleration without any corresponding node affinity, expecting workload Pods to automatically end up on the tainted/dedicated nodes. A toleration only grants **permission** to be scheduled there — it doesn't express any actual preference, so the scheduler is equally free to place that Pod on any other, untainted node that also happens to have enough resources.

## Summary

Taints (on nodes) repel Pods by default, requiring a matching toleration to opt in — the standard way to dedicate/reserve nodes for specific workloads. Node affinity (on Pods) expresses a requirement or preference for landing on nodes with specific characteristics, and pod anti-affinity spreads replicas apart from each other for real high availability. Dedicating specialized nodes correctly typically requires both a taint (exclusion) and affinity (attraction) together, not either mechanism alone.
