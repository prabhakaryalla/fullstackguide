# Azure AD Device Identity and B2B Collaboration

For Conditional Access and device-based policies to work, Azure AD needs to know about the devices employees actually use — this is what device identity registration options and B2B collaboration for external users both address.

## Short Answer

A device becomes known to Azure AD through one of three registration types — **Azure AD Registered** (personal/BYOD), **Azure AD Joined** (organization-owned), or **Hybrid Azure AD Joined** (on-prem AD-joined devices that also get a cloud identity). **Azure AD B2B** separately lets you invite external users to collaborate using their own existing identity, without creating a new managed account for them.

## Device Identity: Three Registration Types

```archify
diagrams/azure-ad-device-registration.html
```

### Azure AD Registered (BYOD)

- For personal devices (laptop, phone) an employee wants to use for work, while still logging into the device itself with a personal account.
- During registration, the user provides their Azure AD credentials, and Azure AD pushes a certificate to trust the device going forward.
- Once registered, SSO is enabled for that device — subsequent access to cloud apps doesn't repeatedly prompt for credentials.
- Managed via Intune (MDM/MAM) and Conditional Access policies, without requiring the organization to own or fully control the device.

### Azure AD Joined

- For organization-owned devices where the user signs directly into Windows with their Azure AD credentials (not a personal account).
- Supported on Windows 10/11 and Windows Server VMs in Azure (not the Home edition).
- Can be set up during OS installation ("Out-of-Box Experience") or afterward via **Settings → Accounts → Access work or school**.
- Verify status with `dsregcmd /status` — look for `AzureAdJoined: YES` and `AzureAdPrt: YES`.
- Enables full Intune policy management and Conditional Access enforcement, since the device identity is entirely cloud-native.

### Hybrid Azure AD Joined

- For devices already joined to an on-premises AD domain that **also** need a cloud identity (so Conditional Access/cloud policies can apply to them).
- The device gets an object in on-prem AD (via traditional domain join) **and** a corresponding device identity in Azure AD (via Azure AD Connect syncing that device object).
- Bridges the gap for organizations mid-way through a cloud migration — on-prem Group Policy continues to apply, while cloud-based Conditional Access also becomes possible.

**Prerequisites for Hybrid Azure AD Join:**
- Azure AD Connect version 1.1.819.0 or later.
- The device's Organizational Unit (OU) included in the AD Connect sync scope.
- Enterprise Administrator credentials on-premises.
- Specific Microsoft endpoints allowed through the network firewall.

## Azure AD Seamless Single Sign-On (Seamless SSO)

```archify
diagrams/azure-ad-seamless-sso.html
```

- Works alongside Password Hash Sync or Pass-Through Authentication.
- Requires Azure AD Connect to create a special computer account (`AzureADSSOAcc`) in on-prem AD, along with a Kerberos Service Principal Name used during sign-in — the mechanism that lets a domain-joined machine sign in silently without a password prompt.

## B2B Collaboration — Inviting External Users

- A feature of Azure AD External Identities that lets you invite users from **outside** your organization (partners, contractors, customers) to access your resources.
- The external user authenticates with their **own** existing identity (their own organization's Azure AD, a Microsoft account, or even a Google account) — you don't create or manage a new password for them.
- Requires Azure AD Premium P1 and Global Administrator (or appropriate delegated) privileges to configure.
- Access can be scoped via the same Conditional Access and RBAC mechanisms used for internal users, keeping external collaboration under the same governance model.

## Real-World Example

A consulting firm equips employees with company-owned laptops that are Azure AD Joined (full Intune + Conditional Access control), supports a BYOD policy where employees can register personal phones (Azure AD Registered) for email access only, maintains legacy on-prem file servers requiring Hybrid Azure AD Joined desktops in the office, and uses B2B Collaboration to invite a client's team to a shared SharePoint site — all without ever creating separate managed accounts for the client's users.

## Summary

Device identity in Azure AD comes in three flavors matched to device ownership and existing infrastructure: Registered (BYOD), Joined (cloud-native, org-owned), and Hybrid Joined (bridging existing on-prem AD-joined machines into the cloud). Seamless SSO extends this by letting domain-joined machines sign in without any password prompt at all, using Kerberos under the hood. B2B Collaboration is a separate mechanism for extending access to external users without creating and managing new accounts for them.
