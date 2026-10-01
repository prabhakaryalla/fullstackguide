# Infrastructure as Code: Bicep vs ARM Templates

ARM Templates are Azure's original, native Infrastructure-as-Code format — verbose JSON that every Azure deployment mechanism understands natively. Bicep is a newer, much more concise language that compiles directly down to the exact same ARM Templates, giving you the same native deployment engine with a dramatically better authoring experience.

## Short Answer

**ARM Templates** are JSON documents describing Azure resources declaratively — the format Azure's Resource Manager deployment engine has always natively understood. **Bicep** is a domain-specific language, created by Microsoft specifically to replace hand-written ARM JSON, that compiles (transpiles) directly into an equivalent ARM Template at deployment time — so it deploys through the exact same, fully-supported ARM engine, just authored in a far more readable syntax.

## ARM Template (JSON)

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2023-01-01",
      "name": "mystorageaccount",
      "location": "eastus",
      "sku": { "name": "Standard_LRS" },
      "kind": "StorageV2"
    }
  ]
}
```

- Verbose — even a single resource requires meaningful JSON boilerplate (schema declaration, API versions, nested property structures).
- Every Azure deployment surface (Azure CLI, PowerShell, Azure DevOps, Portal "deploy a custom template") understands and can deploy raw ARM JSON natively — it's the lowest-common-denominator format.

## Bicep (Compiles to the Same ARM Template)

```bicep
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'mystorageaccount'
  location: 'eastus'
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}
```

- Dramatically more concise for the exact same deployed result — no schema boilerplate, cleaner property syntax, and built-in support for modules, loops, and conditionals that are much more awkward to express in raw ARM JSON.
- `az bicep build` (or the deployment tooling automatically, behind the scenes) compiles a `.bicep` file into the equivalent ARM JSON before deployment — meaning Bicep has **zero** additional runtime dependency or separate state file to manage; it deploys through the same native ARM engine, day one, with full support for every current Azure resource type the moment ARM itself supports it.
- Supports **modules** — reusable, composable Bicep files that can be referenced from other Bicep files, similar in spirit to Terraform modules, without needing a separate registry or third-party tooling.

## Key Differences at a Glance

| | ARM Templates (JSON) | Bicep |
|---|---|---|
| Syntax | Verbose JSON | Concise, purpose-built DSL |
| Deployment engine | Native ARM | Compiles to ARM JSON, deploys via the same native ARM engine |
| New Azure feature support | Immediate (it's the native format) | Immediate (compiles straight to the native format) |
| Authoring experience | Manual JSON, easy to make structural mistakes | Strongly-typed tooling, better editor support (IntelliSense, type checking) |
| State management | None — ARM itself tracks deployed resource state | None — same as ARM, since it deploys as ARM under the hood |

## Why Bicep Doesn't Trade Away Anything ARM Has

Unlike choosing between, say, CloudFormation and Terraform (a genuine trade-off between AWS-native integration and multi-cloud reach), Bicep vs raw ARM JSON isn't really a trade-off at all — Bicep **is** ARM, just authored differently. There's no lag in feature support, no separate state file to manage, and no different deployment engine underneath; it's purely a better authoring layer on top of the exact same native mechanism. This is why Microsoft's own guidance is to author new Azure IaC in Bicep rather than hand-writing raw ARM JSON, with essentially no downside.

## Common Mistake

Assuming Bicep is a separate, less-mature, or less-supported deployment mechanism compared to "real" ARM Templates — it isn't; it compiles directly into standard ARM JSON and deploys through the identical, fully-supported native engine. The only genuine trade-off is familiarity — teams with a large existing investment in hand-written ARM JSON may take some time to migrate, not because Bicep lacks capability.

## Summary

ARM Templates are Azure's native, JSON-based Infrastructure-as-Code format, understood natively by every Azure deployment tool. Bicep is a much more concise authoring language that compiles directly into that same ARM JSON before deployment — giving you the identical native deployment engine, immediate support for new Azure features, and no separate state file to manage, with a dramatically better day-to-day authoring experience. Microsoft recommends Bicep for all new Azure IaC work.
