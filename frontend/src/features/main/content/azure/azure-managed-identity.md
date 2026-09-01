# Managed Identity

Managed Identity in Azure lets your application authenticate to Azure services without storing secrets in code or configuration.

## Why It Exists

Traditionally, apps used client secrets or certificates to call Azure services. That creates risks:

- secret leakage
- secret rotation overhead
- accidental exposure in source control or logs

Managed Identity removes this burden by letting Azure handle identity credentials for your resource.

## Core Idea

When you enable Managed Identity on an Azure resource (for example App Service, VM, or Function App), Azure creates an identity in Microsoft Entra ID.

Your app can request an access token for another Azure service using that identity, then call the target service with the token.

## Types of Managed Identity

### System-Assigned Managed Identity

- Created and tied to one Azure resource.
- Deleted automatically when the resource is deleted.
- Best when identity lifecycle should follow the app lifecycle.

### User-Assigned Managed Identity

- Created as a separate Azure resource.
- Can be attached to multiple Azure resources.
- Best when multiple apps need shared identity and permissions.

## Typical Access Flow

1. Application asks Azure-managed local identity endpoint for a token.
2. Azure platform obtains token from Microsoft Entra ID.
3. App receives short-lived access token.
4. App calls target service (Key Vault, Storage, SQL, etc.) with bearer token.
5. Target service checks token validity and permissions.

## Example Use Cases

- App Service reads secrets from Key Vault.
- Function App writes blobs to Storage Account.
- AKS workload accesses Service Bus.
- VM automation script updates resources via ARM API.

## Authorization Still Matters

Managed Identity handles authentication, not authorization.

You still must grant permissions using:

- Azure RBAC roles
- service-specific access model (for example Key Vault RBAC)

Without permissions, token acquisition may succeed but service call can still fail with 403.

## Using It in .NET (Conceptual)

Most .NET apps use Azure Identity SDK:

```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

var client = new SecretClient(
    new Uri("https://myvault.vault.azure.net/"),
    new DefaultAzureCredential());

KeyVaultSecret secret = await client.GetSecretAsync("DbPassword");
```

`DefaultAzureCredential` automatically uses Managed Identity in Azure-hosted environments.

## Common Pitfalls

- Managed identity enabled, but no RBAC role assigned.
- Wrong user-assigned identity selected when multiple identities are attached.
- Assuming local development uses managed identity automatically.
- Missing network access (firewall/private endpoint) even with correct identity.

## Best Practices

- Prefer Managed Identity over client secrets wherever possible.
- Use least-privilege RBAC roles.
- Separate identities between environments (dev/test/prod).
- Monitor identity-based access through Azure logs.
- Use user-assigned identity when identity reuse and decoupled lifecycle are needed.

## Summary

Managed Identity is Azure’s built-in way to give workloads a secure identity without credential management overhead. It simplifies authentication while improving security posture, especially when combined with least-privilege authorization.
