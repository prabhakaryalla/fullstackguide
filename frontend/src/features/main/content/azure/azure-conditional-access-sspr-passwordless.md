# Conditional Access, SSPR, and Passwordless Authentication in Azure AD

Beyond basic username/password sign-in, Azure AD (Entra ID) provides several layered features for reducing password-related support burden and strengthening sign-in security: Conditional Access, Self-Service Password Reset, and Passwordless Authentication.

## Short Answer

**Conditional Access Policies** are if-then rules that grant or block access based on signals like user, location, device, and app. **Self-Service Password Reset (SSPR)** lets users reset their own password without IT involvement. **Passwordless Authentication** replaces the password entirely with something the user has (a registered device/security key) and something they are/know (biometric/PIN).

## Conditional Access Policies

```archify
diagrams/azure-conditional-access.html
```

- Conditional Access only evaluates **after** the user has already been authenticated with username/password — it's an additional layer, not a replacement for authentication itself.

### The Four Components of a Conditional Access Policy

- **Assignments** — who the policy applies to: specific users/groups, all users, directory roles, or external guest users (include/exclude).
- **Cloud Apps or Actions** — which applications, or specific user actions (e.g., registering security info, registering/joining a device).
- **Conditions** — device platform, location, client app type, sign-in risk level, user risk level.
- **Access Controls** — grant access (optionally requiring MFA, a compliant device, or an approved client app) or block access outright; session controls can also pass device info to cloud apps.

## Self-Service Password Reset (SSPR)

```archify
diagrams/azure-sspr-flow.html
```

- **Prerequisite**: Azure AD Premium P1 license per user using SSPR.
- Users must first register authentication methods (phone, email, authenticator app) before SSPR can verify their identity for a reset.

### Password Writeback

- Requires Password Hash Sync or Pass-Through Authentication (or AD FS), plus Azure AD Connect with the Password Writeback feature enabled.
- Lets an SSPR-initiated password reset in the cloud be written back to on-premises AD DS in real time, so the user has one consistent password across both environments without waiting for the next sync cycle.
- Enforces on-premises password policies (complexity rules) even when the reset is initiated from the cloud.

## Passwordless Authentication

- **Microsoft Authenticator App** — push notification-based approval using biometrics/PIN on a registered mobile device.
- **Security Key** (FIDO2) — a physical hardware key.
- **Windows Hello for Business** — biometric or PIN sign-in tied to a specific device.

### How Authenticator App Passwordless Sign-In Works

```archify
diagrams/azure-passwordless-auth.html
```

- The core security idea: a private key never leaves the user's device — the server only ever verifies a signature against the corresponding public key, so there's no password to steal or phish in the first place.

### Prerequisites

- Azure AD Premium P1 license.
- Latest Microsoft Authenticator app version.
- Device registration requirements differ by platform (Android devices must be registered to an individual user; iOS devices register per-tenant).

## Why This Matters Together

- Conditional Access decides **when** extra scrutiny (MFA, compliant device) is required.
- SSPR reduces password-reset helpdesk tickets by letting users self-serve securely.
- Passwordless authentication reduces the attack surface entirely by removing the password as a credential a user has to manage (and that attackers can phish/guess) in the first place.

## Real-World Example

A company requires MFA via Conditional Access for any sign-in from outside the corporate network, enables SSPR with Password Writeback so employees can reset a forgotten password from home without calling the helpdesk, and is piloting Microsoft Authenticator passwordless sign-in for its security team to eliminate password-related phishing risk for its highest-privilege accounts.

## Summary

Conditional Access applies contextual, risk-based rules after initial sign-in to decide whether to grant, challenge (MFA), or block access. SSPR (backed by Password Writeback) lets users manage their own password resets without IT intervention. Passwordless authentication removes the password as a credential entirely, replacing it with device-bound cryptographic keys unlocked by biometrics/PIN — together forming a layered strategy for reducing both security risk and support overhead around identity.
