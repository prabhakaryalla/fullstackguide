# Key Vault Fundamentals: Soft Delete, Purge Protection, Access Policies vs RBAC

Azure Key Vault centrally stores secrets, keys, and certificates — but its real interview-relevant nuance is in how it protects against accidental or malicious deletion, and the two competing models for controlling who can access what inside a vault.

## Short Answer

Key Vault stores three kinds of objects: **Secrets** (arbitrary strings — connection strings, API keys), **Keys** (cryptographic keys for encrypt/decrypt/sign operations, optionally backed by an HSM), and **Certificates** (managed X.509 certificates, including auto-renewal). **Soft Delete** (mandatory since 2020) keeps a deleted vault/object recoverable for a retention period instead of destroying it immediately; **Purge Protection** goes further, blocking even an explicit, deliberate permanent purge until the retention period expires. Access can be controlled via the older **Access Policies** model or the newer, generally recommended **Azure RBAC** model — the two are mutually exclusive per vault.

## Soft Delete

```
DELETE a secret/key/certificate/vault
  → NOT immediately destroyed
  → enters a "soft-deleted" state for the retention period (7-90 days, default 90)
  → can be RECOVERED during that window, restoring it exactly as it was
  → after the retention period expires, it's automatically, permanently purged
```

- Soft delete has been mandatory for all Key Vaults since early 2020 — it can no longer be disabled, precisely because too many production incidents involved an accidentally deleted vault/secret with no way to recover it.
- During the retention window, the *name* of a soft-deleted object is still reserved — you can't create a new object with the same name until the old one is either recovered or purged, which can surprise teams trying to quickly recreate a vault/secret with the same name after an accidental deletion.

## Purge Protection

```
Purge Protection: Enabled

az keyvault delete --name my-vault        # soft-deletes the vault (recoverable)
az keyvault purge --name my-vault         # BLOCKED - cannot purge until retention period expires
```

- Without Purge Protection, anyone with sufficient permissions can immediately, permanently purge a soft-deleted vault or object, bypassing the recovery window entirely — Soft Delete alone only protects against *accidental* deletion, not a deliberate, malicious (or mistaken) purge command.
- With Purge Protection enabled, even an explicit purge command is refused until the retention period naturally expires — this is the setting that actually guarantees a genuine recovery window, and it's required for many compliance standards.
- Like Soft Delete, Purge Protection **cannot be disabled** once enabled on a vault — it's a one-way, deliberate hardening decision.

## Access Policies vs Azure RBAC

```
Access Policy model (per-vault, custom permission model):
  Assign: "Get, List secrets" to a specific identity — scoped ONLY within this one vault's own system

Azure RBAC model (standard Azure permission model, same as every other resource):
  Assign: "Key Vault Secrets User" role to an identity, scoped at the vault/resource-group/subscription level
```

- **Access Policies** are Key Vault's own, older, vault-specific permission system — permissions are granted per-vault, using Key Vault's own concepts, not the standard Azure RBAC model used everywhere else in Azure.
- **Azure RBAC** for Key Vault uses the same built-in/custom role model as every other Azure resource (VMs, storage accounts, etc.) — permissions can be assigned and inherited at the subscription/resource-group/vault level consistently, audited via the same Azure Activity Log/RBAC tooling used everywhere else, and combined with Azure's centralized "who has access to what" reporting.
- A vault uses **either** Access Policies **or** RBAC for data-plane permissions — not both simultaneously; migrating from Access Policies to RBAC is a deliberate, one-time configuration change, and Microsoft recommends RBAC as the modern default for new vaults.

## Common Mistake

Assuming a vault is fully protected against data loss just because Soft Delete is enabled (it's mandatory, so this is easy to assume by default) — without also enabling Purge Protection, a compromised identity with sufficient permissions can still immediately, irreversibly purge secrets, bypassing the recovery window entirely. For any production vault holding genuinely critical secrets, Purge Protection should be treated as a required companion to Soft Delete, not an optional extra.

## Summary

Key Vault stores Secrets, Keys, and Certificates, with mandatory Soft Delete providing a recovery window against accidental deletion, and optional (but strongly recommended) Purge Protection closing the gap against deliberate, premature purging. Access is controlled either through Key Vault's own legacy Access Policy model or the modern, unified Azure RBAC model — RBAC being the recommended default for consistency with how permissions are managed everywhere else in Azure.
