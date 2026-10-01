# Helm: Package Management for Kubernetes

Deploying a real application to Kubernetes usually means a dozen or more YAML files (Deployments, Services, ConfigMaps, Ingress) that all need to stay consistent across environments — Helm packages all of that into a versioned, templated, installable unit instead of a pile of loose YAML files.

## Short Answer

Helm is Kubernetes' de facto package manager. A **Chart** is a package containing templated Kubernetes manifests plus a configurable `values.yaml` file; installing a chart with specific values produces a **Release** — a tracked, named, versioned deployment of that chart into a cluster. Upgrading a release re-renders the templates with new values/chart version and applies the diff; Helm keeps a history so a bad upgrade can be rolled back to any previous release revision.

## Charts: Templated Kubernetes Manifests

```yaml
# templates/deployment.yaml (part of a chart)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-web
spec:
  replicas: {{ .Values.replicaCount }}
  template:
    spec:
      containers:
        - name: web
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          resources:
            limits:
              memory: {{ .Values.resources.memoryLimit }}
```

```yaml
# values.yaml - the default configuration, overridable per environment
replicaCount: 3
image:
  repository: myapp
  tag: "1.0.0"
resources:
  memoryLimit: "512Mi"
```

- Templates use Go templating syntax (`{{ .Values.x }}`) to inject configuration values at install/upgrade time — the same chart can produce different actual manifests for dev, staging, and production just by supplying different values.
- This directly solves the "keep a dozen YAML files consistent across environments" problem — instead of maintaining separate near-duplicate YAML per environment, one chart plus environment-specific value overrides expresses the differences explicitly and concisely.

## Installing and Upgrading

```bash
helm install my-app ./my-chart --values values-production.yaml
# creates Release "my-app" - Helm tracks this release's state and history

helm upgrade my-app ./my-chart --values values-production.yaml --set image.tag=1.1.0
# re-renders templates with the new tag, diffs against the current state, applies the change
```

- `helm install` creates a new, named Release. `helm upgrade` modifies an existing Release's deployed resources based on a new chart version and/or new values.
- Helm computes what's actually changed between the currently-deployed state and the new rendered manifests, applying only the necessary diff — the same underlying principle as `kubectl apply`, but scoped to an entire chart's worth of resources as one coordinated unit.

## Rollbacks

```bash
helm history my-app          # shows every past revision of this release
helm rollback my-app 3       # reverts back to revision 3's exact rendered manifests
```

- Every `install`/`upgrade` creates a new numbered **revision** in the release's history — `helm rollback` reverts the release to any previous revision's exact configuration, re-applying those specific rendered manifests.
- This is one of Helm's most practically valuable features: a bad production deployment can be reverted with a single command, rather than manually reconstructing the previous state of every individual YAML file that was part of the release.

## Dependencies Between Charts

```yaml
# Chart.yaml
dependencies:
  - name: postgresql
    version: "12.x.x"
    repository: "https://charts.bitnami.com/bitnami"
```

- A chart can declare dependencies on other charts (e.g. a widely-used, community-maintained PostgreSQL chart) — installing your application's chart can automatically install and configure its declared dependencies too, rather than requiring every dependency to be deployed and wired up manually and separately.

## Common Mistake

Treating a chart's `values.yaml` defaults as "the configuration" and editing the chart's templates directly per environment instead of overriding values — this defeats the entire point of templating (one reusable chart, many environment-specific value sets) and quickly leads back to the exact "many slightly-different copies of similar YAML" problem Helm exists to solve.

## Summary

Helm packages a set of related Kubernetes manifests into a templated Chart, parameterized via `values.yaml` so the same chart can be deployed differently per environment without duplicating YAML. Installing/upgrading a chart creates tracked, numbered Release revisions, letting a problematic deployment be rolled back to any prior revision with a single command — turning "a dozen YAML files to keep consistent" into one versioned, installable, environment-configurable unit.
