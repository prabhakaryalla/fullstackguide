# Azure RBAC: Built-In and Custom Roles

Azure Role-Based Access Control (RBAC) is the primary mechanism for controlling who can do what to which Azure resources — understanding roles, assignments, and scopes is foundational to almost every other Azure security topic.

## Short Answer

RBAC grants permissions by combining three things: a **role** (what actions are allowed), an **assignment** (who gets the role), and a **scope** (where it applies — management group, subscription, resource group, or a single resource). Built-in roles cover most common needs; custom roles fill gaps when no built-in role fits exactly.

## The Three RBAC Components

```archify
diagrams/azure-rbac-components.html
```

- **Role** — a named collection of permitted (and sometimes explicitly denied) actions.
- **Assignment** — binds a specific role to a specific user, group, or service principal.
- **Scope** — the boundary within which the assignment applies; a role assigned at a higher scope (e.g., subscription) automatically applies to everything beneath it (all resource groups and resources in that subscription).

## Common Built-In Roles

| Role | Grants |
|---|---|
| **Reader** | View all resources, but cannot make any changes |
| **Contributor** | Create and manage all resource types, but cannot grant access to others |
| **Owner** | Full access, including the ability to assign roles to other users |
| **User Access Administrator** | Manage user access to Azure resources, without managing the resources themselves |

- `Contributor` vs `Owner` is a frequently tested distinction: `Contributor` can do almost everything **except** manage RBAC assignments — that permission is reserved for `Owner` (or `User Access Administrator`).

## How Actions Define a Role

- **`Write`** actions correspond to HTTP `PUT`, `POST`, `PATCH`, and `DELETE` operations on a resource.
- **`Read`** actions correspond to HTTP `GET` operations.
- Roles are defined as JSON documents listing `Actions` (permitted) and `NotActions` (explicitly excluded, even if they'd otherwise match an included action) — this lets a role grant a broad category of actions while carving out specific exceptions.

```bash
# List all available built-in roles
Get-AzRoleDefinition
```

## Assigning a Role via Azure CLI

```bash
az login

RESOURCE_GROUP="myResourceGroup"
USER_EMAIL="user@example.com"
ROLE="Reader"

az role assignment create --assignee $USER_EMAIL --role $ROLE --resource-group $RESOURCE_GROUP
```

- `--assignee` — the user, group, or service principal receiving the role.
- `--role` — the role name (or ID) being granted.
- `--resource-group` — the scope where this assignment applies (could instead be `--scope` for a subscription, management group, or individual resource).

## Custom Roles

```json
{
  "Name": "Virtual Machine Operator",
  "Actions": [
    "Microsoft.Compute/virtualMachines/start/action",
    "Microsoft.Compute/virtualMachines/restart/action",
    "Microsoft.Compute/virtualMachines/read"
  ],
  "NotActions": [
    "Microsoft.Compute/virtualMachines/delete"
  ],
  "AssignableScopes": [
    "/subscriptions/{subscription-id}"
  ]
}
```

- Created when no built-in role fits — e.g., a role that can start/restart/view VMs but never delete them.
- Each tenant supports up to **2,000** custom roles.
- **Assignable Scopes** — custom roles must declare which scopes (subscriptions, resource groups, management groups, or individual resources) they're allowed to be assigned within.

## Scoping Roles: Where Assignments Can Apply

```archify
diagrams/azure-rbac-scoping.html
```

- A role assigned at the **Management Group** level cascades to every subscription, resource group, and resource beneath it.
- A role assigned at an **individual resource** level applies only to that one resource — the narrowest possible scope, useful for granting very targeted access (e.g., `Contributor` on just one storage account, not the whole resource group).

## Common Mistake

Assigning `Owner` when `Contributor` (or an even narrower custom role) would suffice — `Owner`'s ability to grant access to others is a meaningful escalation risk that's rarely actually needed for day-to-day operational work. Following least-privilege means starting with the narrowest role/scope that accomplishes the task, and only widening when a specific, justified need arises.

## Summary

Azure RBAC combines a role (permitted actions), an assignment (who), and a scope (where) to control access. Built-in roles like Reader/Contributor/Owner cover most scenarios, with the Contributor-vs-Owner distinction (RBAC management ability) being a key nuance; custom roles — defined via `Actions`/`NotActions` and constrained to specific `AssignableScopes` — fill in gaps when a more precise permission set is needed.
