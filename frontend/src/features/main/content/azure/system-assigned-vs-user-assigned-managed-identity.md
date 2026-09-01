# System-Assigned Managed Identity vs User-Assigned Managed Identity

Azure Managed Identity comes in two forms: system-assigned and user-assigned. Both remove the need to manage client secrets, but they differ in lifecycle, reuse, and operational control.

## Quick Definition

- System-assigned managed identity is created directly on an Azure resource and is tied to that resource lifecycle.
- User-assigned managed identity is a standalone Azure resource that can be attached to one or many compute resources.

## Side-by-Side Comparison

| Aspect | System-Assigned | User-Assigned |
| :--- | :--- | :--- |
| Lifecycle | Deleted when parent resource is deleted | Independent lifecycle |
| Reusability | One-to-one with resource | One-to-many across resources |
| Setup complexity | Simpler | Slightly more configuration |
| Identity continuity during app replacement | Usually changes with resource recreation | Can be preserved and reattached |
| Best for | Single app, simple ownership | Shared identity, centralized permission management |

## How They Work in Practice

### System-Assigned

When enabled on App Service, Function App, VM, or other supported resources:

1. Azure creates a service principal in Microsoft Entra ID.
2. That identity is linked to the resource.
3. Token requests from the resource use this identity.

If the resource is deleted, identity is automatically deleted.

### User-Assigned

When created as its own Azure identity resource:

1. You create identity once.
2. Attach it to one or more resources.
3. Each attached resource can request tokens as that identity.

If an app resource is replaced, you can reattach the same identity and keep existing permissions.

## When to Choose Which

Use system-assigned when:

- one app has one identity
- lifecycle coupling is acceptable
- you want minimal setup overhead

Use user-assigned when:

- multiple apps need the same permissions
- identity should survive app replacement
- security teams want centralized identity governance

## Real-World Example

### System-Assigned Example

A small internal API in one App Service reads one Key Vault.

- Enable system-assigned identity on App Service.
- Assign Key Vault Secrets User role to that identity.
- Done.

### User-Assigned Example

Three microservices in different App Services must access the same Service Bus namespace.

- Create one user-assigned identity.
- Attach it to all three services.
- Assign Service Bus Data Sender/Receiver roles once.

This reduces duplicate role assignment work and keeps identity stable across deployments.

## Security and Operations Notes

- Both identity types still require correct Azure RBAC assignments.
- Token acquisition can succeed even if authorization later fails with 403.
- With user-assigned identities, explicitly configure which identity to use if multiple are attached.
- Prefer least privilege regardless of identity type.

## .NET Consideration

DefaultAzureCredential can use either identity in Azure-hosted environments.

If multiple user-assigned identities are present, provide the client ID explicitly in credential options to avoid ambiguity.

## Common Mistakes

- Choosing user-assigned for every app when no reuse is needed.
- Forgetting that deleting a resource removes its system-assigned identity.
- Recreating resources and expecting old system-assigned role bindings to still apply.
- Assuming managed identity alone grants access without RBAC configuration.

## Summary

System-assigned identity is best for simple, resource-tied scenarios. User-assigned identity is best when you need identity reuse, continuity, and centralized governance across multiple resources.
