# Azure DevOps Pipelines and CI/CD (Build Agents)

Azure DevOps Pipelines automate the path from a code commit to a deployed application — building, testing, and packaging code (CI), then delivering it to an environment (CD), all defined as versioned YAML alongside the code.

## Short Answer

A pipeline runs on a **build agent** (a machine that executes the pipeline's steps), moving code through: commit → build → unit tests → artifact generation → deployment. Agents come in two flavors — Microsoft-hosted (managed, ephemeral) and self-hosted (your own machine, persistent, customizable).

## The CI/CD Flow

```archify
diagrams/azure-devops-pipeline-stages.html
```

## Example Pipeline YAML

```yaml
trigger:
  branches:
    include: [main]

pool:
  vmImage: 'ubuntu-latest' # Microsoft-hosted agent

steps:
  - task: UseDotNet@2
    inputs:
      version: '8.x'

  - script: dotnet restore
    displayName: 'Restore dependencies'

  - script: dotnet build --configuration Release
    displayName: 'Build'

  - script: dotnet test --configuration Release --logger trx
    displayName: 'Run unit tests'

  - task: PublishBuildArtifacts@1
    inputs:
      pathToPublish: '$(Build.ArtifactStagingDirectory)'
      artifactName: 'drop'

  - task: AzureWebApp@1
    inputs:
      azureSubscription: 'MyServiceConnection'
      appName: 'myapi-staging'
      package: '$(Build.ArtifactStagingDirectory)/**/*.zip'
```

## Microsoft-Hosted vs Self-Hosted Agents

| | Microsoft-Hosted | Self-Hosted |
|---|---|---|
| Provisioning | Automatic, fresh VM per run | You install and register the agent |
| Maintenance | None — Microsoft manages it | You patch OS, install tools/dependencies |
| State | Ephemeral (clean every run) | Persistent (can cache dependencies between runs) |
| Custom software/hardware | Limited to pre-installed images | Full control (GPUs, licensed software, internal network access) |
| Cost model | Included minutes, then pay-per-minute | You pay for the underlying machine, unlimited minutes |

- Use **self-hosted agents** when the pipeline needs access to internal/private networks (deploying to on-prem or a VNet-isolated resource), specific licensed software, or when build times/costs at scale favor owning the hardware.
- Use **Microsoft-hosted agents** for most standard scenarios — zero maintenance, always up to date.

## Release Pipelines and Environments

```archify
diagrams/azure-devops-environment-promotion.html
```

- **Environments** in Azure DevOps represent deployment targets (Dev/Staging/Prod) and can require manual approvals or automated checks before a release proceeds to the next stage.
- **Release pipelines** (or multi-stage YAML pipelines) define this promotion flow explicitly, giving visibility into exactly what's deployed where.

## Pipeline Execution Concepts

- **Triggers** — what starts a pipeline run (a push to a branch, a PR, a schedule, or another pipeline completing).
- **Stages/Jobs/Steps** — a pipeline is composed of stages (e.g., Build, Deploy), each with jobs (units of work, potentially parallel), each with steps (individual tasks/scripts).
- **Service connections** — securely stored credentials the pipeline uses to deploy to external targets (Azure subscriptions, container registries) without hardcoding secrets in YAML.

## Common Mistake

Hardcoding secrets (connection strings, API keys) directly in pipeline YAML instead of using **variable groups** backed by Azure Key Vault or pipeline secret variables — leaking a secret into source control history is difficult to fully undo.

## Real-World Example

A .NET API's pipeline triggers on every push to `main`: a Microsoft-hosted Ubuntu agent restores, builds, and runs unit tests; on success, it publishes an artifact and auto-deploys to a Dev App Service slot; promotion to Staging requires all tests passing, and promotion to Production requires a manual approval gate from a release manager — with all secrets pulled from an Azure Key Vault–backed variable group rather than stored in the YAML itself.

## Summary

Azure DevOps Pipelines codify the path from commit to deployment as versioned YAML, executed by build agents (Microsoft-hosted for zero-maintenance convenience, self-hosted for custom/private-network needs) across a sequence of build, test, artifact, and deployment stages — with environments and approval gates controlling how code is safely promoted toward production.
