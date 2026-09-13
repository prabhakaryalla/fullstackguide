# Difference between Hashing and Encryption

Hashing and encryption both transform data, but they solve different problems. Hashing proves data has not changed (integrity). Encryption hides data from anyone without the right key (confidentiality).

## Why It Matters

Mixing these up leads to real security bugs:

- storing passwords with encryption instead of hashing (if the key leaks, every password leaks)
- trying to "verify" a file by encrypting it instead of hashing it
- picking a weak or outdated algorithm because the difference between hashing and encryption was not understood

## Hashing vs Encryption at a Glance

| Aspect | Hashing | Encryption |
|---|---|---|
| Direction | One-way (cannot be reversed) | Two-way (can be decrypted) |
| Goal | Integrity / verification | Confidentiality |
| Key required | No (HMAC uses a key for authenticity) | Yes (symmetric or asymmetric) |
| Output size | Fixed size digest | Same order as input (varies with padding) |
| Example use | Password storage, checksums, digital signatures | Protecting data at rest or in transit |

```csharp
using System.Security.Cryptography;
using System.Text;

// Hashing: one-way, used to verify integrity
byte[] hash = SHA256.HashData(Encoding.UTF8.GetBytes("hello"));

// Encryption: two-way, used to hide data (needs a key you can reverse with)
using Aes aes = Aes.Create();
aes.GenerateKey();
aes.GenerateIV();
using ICryptoTransform encryptor = aes.CreateEncryptor();
byte[] cipherText = encryptor.TransformFinalBlock(Encoding.UTF8.GetBytes("hello"), 0, 5);
```

## Application Integrity vs Application Confidentiality

- **Integrity**: guarantees data was not tampered with or corrupted. Achieved with hashing, HMAC, and digital signatures. Example: verifying a downloaded installer's SHA256 checksum matches the published value.
- **Confidentiality**: guarantees only authorized parties can read the data. Achieved with encryption. Example: encrypting a database connection string before storing it in configuration.

An application usually needs both: encrypt sensitive data for confidentiality, and sign or hash it so tampering can be detected.

## Symmetric and Asymmetric Encryption

**Symmetric encryption** uses the same key to encrypt and decrypt. It is fast and efficient for large amounts of data.

```csharp
using Aes aes = Aes.Create(); // 256-bit key by default
aes.Key = RandomNumberGenerator.GetBytes(32);
aes.IV = RandomNumberGenerator.GetBytes(16);
```

**Asymmetric encryption** uses a mathematically linked key pair: a public key that can be shared freely, and a private key that must stay secret. Data encrypted with the public key can only be decrypted with the private key.

```csharp
using RSA rsa = RSA.Create(2048);
byte[] encrypted = rsa.Encrypt(Encoding.UTF8.GetBytes("secret"), RSAEncryptionPadding.OaepSHA256);
byte[] decrypted = rsa.Decrypt(encrypted, RSAEncryptionPadding.OaepSHA256);
```

## Architectural Limitations of Symmetric Encryption

- **Key distribution problem**: both sender and receiver need the same secret key, so the key itself must be shared over a secure channel first.
- **Key explosion**: in a system with `n` parties who each need a private channel, you need roughly `n * (n - 1) / 2` unique keys, which does not scale.
- **No built-in non-repudiation**: since both parties share the same key, either side could have produced a given ciphertext, so you cannot prove who created it.
- **Compromise blast radius**: if one shared key leaks, every message ever encrypted with it (past and future, unless keys are rotated) is exposed.

This is why real systems combine both approaches: use asymmetric encryption (or Diffie-Hellman/ECDH) to exchange a symmetric session key, then use fast symmetric encryption (like AES) for the actual data. TLS/HTTPS works exactly this way.

## Strengths and Weaknesses

**Symmetric encryption**

- Strengths: very fast, efficient for large data volumes, smaller key sizes for equivalent strength
- Weaknesses: hard key distribution, key management overhead at scale, no non-repudiation

**Asymmetric encryption**

- Strengths: solves key distribution (public key can be shared openly), enables digital signatures and non-repudiation, supports secure key exchange
- Weaknesses: much slower, larger computational cost, larger key sizes needed for equivalent strength, not efficient for encrypting large payloads directly

## Getting a Public Key Using Microsoft Graph API

When you need another user's or app's public key certificate (for example, to encrypt a message for them, verify a signature, or inspect app credentials), Microsoft Graph exposes it through directory objects:

```http
GET https://graph.microsoft.com/v1.0/users/{id}/certificates
GET https://graph.microsoft.com/v1.0/applications/{id}?$select=keyCredentials
GET https://graph.microsoft.com/v1.0/servicePrincipals/{id}?$select=keyCredentials
```

- `keyCredentials` on an application or service principal returns the public key portion of a certificate (as base64) that Microsoft Entra ID trusts for that app, used for client-credential (certificate) authentication.
- For signed tokens, Microsoft publishes its own public signing keys at the OpenID Connect discovery endpoint, not through Graph directly:

```http
GET https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration
```

This returns a `jwks_uri`, which points to the JSON Web Key Set (JWKS) containing the public keys used to verify JWT signatures issued by Microsoft Entra ID.

```csharp
using GraphServiceClient graphClient = new(credential);

Application app = await graphClient.Applications[appId]
    .GetAsync(config => config.QueryParameters.Select = ["keyCredentials"]);

foreach (KeyCredential cred in app.KeyCredentials ?? [])
{
    // cred.Key contains the public key/certificate bytes (base64-encoded in the raw payload)
    string thumbprint = cred.CustomKeyIdentifier is null
        ? string.Empty
        : Convert.ToHexString(cred.CustomKeyIdentifier);
}
```

## Asymmetric Algorithms

| Algorithm | Purpose | Recommended Key Size |
|---|---|---|
| RSA | Encryption, digital signatures | 2048 bits (minimum recommended) |
| DSA | Digital signatures only | 2048 bits |
| Diffie-Hellman (DH) | Key exchange (agree on a shared secret) | 2048 bits |
| ECDSA | Digital signatures (elliptic curve) | 256-bit curve (equivalent to ~3072-bit RSA) |
| ECDH | Key exchange (elliptic curve) | 256-bit curve |

Elliptic curve algorithms (ECDSA, ECDH) achieve the same security strength as RSA/DSA/DH with much smaller keys, which makes them faster and cheaper on constrained devices.

```csharp
using ECDsa ecdsa = ECDsa.Create(ECCurve.NamedCurves.nistP256);
byte[] signature = ecdsa.SignData(data, HashAlgorithmName.SHA256);

using ECDiffieHellman aliceEcdh = ECDiffieHellman.Create(ECCurve.NamedCurves.nistP256);
using ECDiffieHellman bobEcdh = ECDiffieHellman.Create(ECCurve.NamedCurves.nistP256);
byte[] sharedSecret = aliceEcdh.DeriveKeyMaterial(bobEcdh.PublicKey);
```

## Symmetric Algorithms

| Algorithm | Key Size | Security Notes |
|---|---|---|
| DES | 56 bits | Broken/insecure, do not use |
| RC4 | 128 bits | Stream cipher with known biases, insecure, do not use |
| 3DES | 168 bits (effectively ~112 bits) | Deprecated, slow, being phased out |
| AES | 128, 192, or 256 bits | Current industry standard, secure and fast |
| ChaCha20 | 128 or 256 bits | Modern stream cipher, fast in software, secure alternative to AES |

DES and RC4 are considered broken or weak by modern standards and should not be used in new designs. AES (typically AES-256 with GCM for authenticated encryption) and ChaCha20 (often paired with Poly1305) are the recommended choices today.

```csharp
using Aes aes = Aes.Create();
aes.KeySize = 256; // 128, 192, or 256

using ChaCha20Poly1305 chacha = new(RandomNumberGenerator.GetBytes(32)); // 256-bit key
```

## Common Mistakes to Avoid

- using encryption to "protect" passwords instead of a salted password hash (Argon2, bcrypt, or PBKDF2)
- assuming hashing alone provides confidentiality (it does not — hashes reveal nothing reversible, but they are not designed to hide the plaintext's existence for guessable inputs like short passwords)
- choosing DES, RC4, or plain 3DES for new systems
- reusing an IV/nonce with the same symmetric key
- sending symmetric keys over the same unprotected channel as the encrypted data

## Recommended Practices

- use hashing (with salt) for password storage and integrity checks
- use symmetric encryption (AES-GCM or ChaCha20-Poly1305) for bulk data confidentiality
- use asymmetric encryption or ECDH/Diffie-Hellman only to establish or exchange the symmetric session key
- prefer RSA-2048+ or ECDSA/ECDH with 256-bit curves over DSA or classic Diffie-Hellman where possible
- store and rotate keys using a managed service such as Azure Key Vault

## Summary

Hashing gives you integrity through a one-way digest; encryption gives you confidentiality through a reversible transform protected by a key. Symmetric encryption (AES, ChaCha20) is fast but struggles with key distribution at scale, while asymmetric encryption (RSA, DSA, ECDSA, Diffie-Hellman, ECDH) solves key distribution and enables signatures at the cost of speed. Real-world systems, including Microsoft Entra ID and Microsoft Graph key credentials, combine both: asymmetric methods to exchange keys and verify identity, symmetric methods to protect the actual data.
