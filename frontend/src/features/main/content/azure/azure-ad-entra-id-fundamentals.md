# Azure AD, ADDS, and AADDS: Identity Fundamentals and AD Connect

Organizations moving to Azure typically have three overlapping identity options, and understanding the difference — plus how they're synchronized — is foundational to any Azure identity/governance discussion.

## Short Answer

**Azure AD (Entra ID)** is Microsoft's modern, cloud-native identity service. **Active Directory Domain Services (AD DS)** is the traditional, on-premises Windows Server directory (Kerberos/LDAP). **Azure AD Domain Services (AADDS)** is a managed, cloud-hosted version of traditional AD DS, for workloads that still need classic domain-join/LDAP/Kerberos without operating your own domain controllers. **Azure AD Connect** bridges an on-prem AD DS to Azure AD, keeping identities synchronized.

## The Three Options Compared

| | Azure AD (Entra ID) | AD DS | Azure AD Domain Services (AADDS) |
|---|---|---|---|
| Nature | Cloud-native identity platform | Traditional on-prem directory | Managed cloud version of AD DS |
| Protocols | OAuth2, OIDC, SAML | Kerberos, LDAP, NTLM | Kerberos, LDAP, NTLM (fully supported) |
| Typical use | Modern app sign-in, SSO, conditional access | Legacy on-prem domain join, Group Policy | Lift-and-shift apps needing domain join without managing DCs |
| Who patches it | Microsoft | You | Microsoft |

- **First choice for new applications**: Azure AD — it's the primary identity mechanism for Azure/Microsoft 365 and any new service integration.
- **AD DS** is what most enterprises already have on-premises — the directory employees log into their laptops against.
- **AADDS** exists for scenarios where you need classic domain services (Group Policy, LDAP bind, NTLM) but don't want to deploy and patch your own domain controllers as VMs.

## Azure AD Connect — Bridging On-Prem and Cloud

```archify
diagrams/azure-ad-connect-sync.html
```

### AD Connect Components

- **Synchronization Service** — creates/updates users, groups, and other objects in Azure AD, keeping identity information matched with on-prem.
- **Active Directory Federation Services (AD FS)** — optional; used for more complex hybrid scenarios (e.g., third-party MFA solutions).
- **Health Monitoring (Azure AD Connect Health)** — central dashboard for sync health and issue detection.

### Key Sync Features

- **Filtering** — limit which objects sync (by domain, OU, or attribute) instead of syncing every user/group/computer by default.
- **Password Hash Synchronization** — syncs a hash of the on-prem password hash to Azure AD, letting users sign in with the same password in both places, with on-prem AD remaining the authority.
- **Pass-Through Authentication (PTA)** — Azure AD forwards the actual sign-in request to on-prem AD DS for validation, rather than syncing a password hash at all.
- **Password Writeback** — lets users reset/change passwords in the cloud, written back to on-premises AD in real time.
- **Device Writeback** — lets devices registered in Azure AD/ADFS be written back to on-prem AD, enabling on-prem conditional access decisions based on device state.
- **Prevent Accidental Deletes** — a safety threshold (default 500 per sync cycle) that blocks a sync from mass-deleting cloud objects if something goes wrong on-prem.

## Password Sync Options Compared

| Option | How It Works |
|---|---|
| **Password Hash Sync (PHS)** | On-prem password hash is synced to Azure AD; sign-in is validated entirely in the cloud |
| **Pass-Through Authentication (PTA)** | Azure AD forwards the sign-in request to an on-prem agent, which validates directly against AD DS |
| **AD FS (Federation)** | Full federation — sign-in is redirected to an on-prem ADFS server for validation, supporting the most complex scenarios (e.g., third-party MFA, SAML apps) |

- **PHS** is the simplest and most resilient (cloud sign-in keeps working even if on-prem is down) — Microsoft's recommended default unless a specific requirement rules it out.
- **PTA** keeps password validation fully on-premises (password hashes never leave the network) but requires on-prem infrastructure to be available for sign-in to succeed.
- **AD FS** adds the most operational complexity and is generally only chosen for specific legacy or compliance requirements.

## Azure AD Connect Cloud Sync — The Lightweight Alternative

| | Azure AD Connect | Azure AD Connect Cloud Sync |
|---|---|---|
| Agent footprint | Full agent + SQL database on-prem | Lightweight agent only |
| Default sync cycle | Every 30 minutes | Every 2 minutes |
| Supports Pass-Through Authentication | Yes | No |
| Supports device identity sync | Yes | No |
| Advanced attribute customization | Yes | No |

- Cloud Sync trades some advanced customization and PTA support for a much simpler footprint and faster sync cycle — a good fit for straightforward, multi-forest sync scenarios without complex attribute-mapping needs.

## Real-World Example

A company with an on-prem Active Directory domain deploys Azure AD Connect with Password Hash Synchronization: employee accounts, groups, and password hashes sync to Azure AD every 30 minutes, letting employees sign into Microsoft 365 and Azure-hosted apps with their existing corporate credentials — while Password Writeback lets them reset a forgotten password from the cloud login screen, immediately reflected back on-premises.

## Summary

Azure AD (Entra ID) is the modern cloud identity platform; AD DS is the traditional on-prem directory; AADDS provides managed classic-AD compatibility in the cloud without operating domain controllers yourself. Azure AD Connect (or its lighter Cloud Sync alternative) bridges on-prem AD DS to Azure AD, with Password Hash Sync, Pass-Through Authentication, and full AD FS federation representing increasingly complex — and increasingly on-prem-dependent — ways to keep sign-in credentials consistent across both environments.
