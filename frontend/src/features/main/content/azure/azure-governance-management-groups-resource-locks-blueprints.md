# Azure Governance: Management Groups, Resource Locks, Tagging, and Blueprints

As an Azure environment grows past a handful of resources, governance tooling — Management Groups, Resource Locks, Tags, and Blueprints — becomes essential for applying consistent policy, structure, and protection across many subscriptions and resource groups at once.

## Short Answer

**Management Groups** let you apply policies/RBAC above the subscription level, flowing down to every subscription and resource group underneath. **Resource Locks** prevent accidental deletion or modification of critical resources. **Tags** attach searchable metadata to resources for organization and cost tracking. **Azure Blueprints** package a repeatable set of resources, policies, and RBAC assignments for consistent environment deployment (now largely superseded by Template Specs + Policy Initiatives, but still a common interview topic).

## Account Hierarchy

```archify
diagrams/azure-governance-hierarchy.html
```

- **Management Groups** sit above subscriptions — assigning a policy or RBAC role at this level cascades down through every subscription and resource group beneath it, avoiding the need to configure the same policy repeatedly per subscription.
- **Resource Groups** are logical containers for resources that share a lifecycle (commonly deployed, managed, and deleted together) — a resource group's region is just where its metadata lives; the resources inside can span multiple regions.
- Deleting a resource group deletes **everything** inside it — this is both a convenience (easy cleanup) and a risk (accidental mass-deletion), which is exactly what Resource Locks protect against.

## Why Resource Groups

- **Organization** — group related resources logically.
- **Easy de-provisioning** — delete one resource group instead of hunting down every individual resource.
- **Security boundary** — RBAC roles can be assigned at the resource group level (in addition to subscription level), scoping who can do what to that specific set of resources.
- **Policy application** — e.g., restrict which VM SKUs can be deployed within a specific resource group, blocking non-compliant deployments even for users who otherwise have rights to create resources there.

## Resource Locks

| Lock Type | Effect |
|---|---|
| **CanNotDelete** | Authorized users can still read and modify the resource, but cannot delete it |
| **ReadOnly** | Authorized users can only read the resource — no modification or deletion allowed |

- Locks apply regardless of a user's RBAC permissions — even an Owner cannot delete a `CanNotDelete`-locked resource without first removing the lock itself.
- Commonly applied to production databases, critical networking resources (VNets, gateways), and shared infrastructure that would cause major outages if accidentally deleted.

## Tags

```json
{
  "Environment": "Production",
  "CostCenter": "Engineering",
  "Owner": "team-platform"
}
```

- Key-value pairs attached to resources (and resource groups) for organizing, filtering, and — critically — cost allocation in billing reports.
- Can be applied at the resource group level and, depending on policy configuration, inherited down to individual resources.
- A common governance pattern: an Azure Policy that **requires** specific tags (e.g., `CostCenter`) before allowing a resource to be created at all.

## Role-Based Access Control (RBAC) at a Glance

- **Roles** define a set of permitted actions (e.g., Reader, Contributor, Owner).
- **Assignments** bind a role to a specific user, group, or service principal.
- **Scopes** determine where the role applies: Management Group, Subscription, Resource Group, or an individual Resource.
- **Actions/NotActions** — built-in roles are defined by allowed actions (`Write` maps to PUT/POST/PATCH/DELETE-capable operations, `Read` maps to GET) and can explicitly exclude specific actions even within an otherwise broad role.

```bash
az role assignment create --assignee user@example.com --role Reader --resource-group myResourceGroup
```

- **Custom roles** can be created when no built-in role fits, combining specific `Actions`/`NotActions`, and can be scoped to subscriptions, resource groups, individual resources, or management groups. Each tenant supports up to 2,000 custom roles.

## Azure Blueprints vs ARM/Bicep Templates

| | ARM/Bicep Template | Azure Blueprint |
|---|---|---|
| Scope | Deploys resources | Packages resources **plus** policies, RBAC assignments, and resource groups together as one trackable unit |
| Tracking | No built-in deployment-to-artifact tracking | Tracks which blueprint version produced which deployed artifacts |
| Typical use | General infrastructure-as-code | Repeatable, compliant environment scaffolding (e.g., "every new subscription gets this exact baseline") |

- A Blueprint is essentially a higher-level wrapper: it can reference ARM templates, Policy assignments, and RBAC assignments together as a single versioned "definition," then track exactly which resources in a subscription came from applying that blueprint — useful for auditing compliance against a required baseline.

## Real-World Example

A company structures its Azure tenant with Management Groups for "Production" and "Non-Production," applying a strict Azure Policy (deny non-approved VM SKUs, deny public IP creation) at the Production management group level so it automatically covers every subscription created underneath it — while `CanNotDelete` locks protect the production database and VNet gateway resources, and a mandatory tagging policy ensures every resource carries a `CostCenter` tag for accurate monthly cost allocation per team.

## Summary

Management Groups let governance (policy, RBAC) cascade down across many subscriptions from one place; Resource Groups provide a lifecycle and security boundary for related resources; Resource Locks protect specific critical resources from accidental deletion/modification regardless of RBAC permissions; Tags enable organization and cost tracking; and Blueprints package resources, policy, and RBAC together as one trackable, repeatable environment definition.
