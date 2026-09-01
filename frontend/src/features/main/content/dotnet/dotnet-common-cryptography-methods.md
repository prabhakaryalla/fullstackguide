# Common Cryptography Methods in .NET

Cryptography in .NET is provided through the System.Security.Cryptography namespace and is used for data protection, integrity, and identity verification.


## Why It Matters

In real applications, cryptography helps you:

- protect sensitive datas
- verify that data was not changed
- securely store passwords
- prove message authenticity

## 1. Hashing

Hashing creates a fixed-size digest from input data. It is one-way, so you cannot reverse it to get original data.

Common algorithm:

- SHA256

Example:

```csharp
using System.Security.Cryptography;
using System.Text;

string input = "hello";
byte[] hash = SHA256.HashData(Encoding.UTF8.GetBytes(input));
string hex = Convert.ToHexString(hash);
```

Use cases:

- checksum and integrity checks
- signing pre-hash step

## 2. Symmetric Encryption

Symmetric encryption uses one shared key for encrypt and decrypt.

Common algorithm:

- AES

Example:

```csharp
using System.Security.Cryptography;
using System.Text;

string plainText = "Sensitive data";
byte[] key = RandomNumberGenerator.GetBytes(32); // AES-256 key
byte[] iv = RandomNumberGenerator.GetBytes(16);

using Aes aes = Aes.Create();
aes.Key = key;
aes.IV = iv;

aes.Mode = CipherMode.CBC;
aes.Padding = PaddingMode.PKCS7;

using ICryptoTransform encryptor = aes.CreateEncryptor();
byte[] cipherBytes = encryptor.TransformFinalBlock(
    Encoding.UTF8.GetBytes(plainText),
    0,
    Encoding.UTF8.GetByteCount(plainText));
```

Use cases:

- encrypting files or payload data
- data-at-rest protection

## 3. Asymmetric Encryption

Asymmetric encryption uses a public/private key pair.

Common algorithm:

- RSA

Example:

```csharp
using System.Security.Cryptography;
using System.Text;

using RSA rsa = RSA.Create(2048);
byte[] data = Encoding.UTF8.GetBytes("secret");

byte[] encrypted = rsa.Encrypt(data, RSAEncryptionPadding.OaepSHA256);
byte[] decrypted = rsa.Decrypt(encrypted, RSAEncryptionPadding.OaepSHA256);
```

Use cases:

- key exchange
- encrypting small sensitive values

## 4. Digital Signatures

Signatures verify authenticity and integrity.

Common algorithms:

- RSA signatures
- ECDSA signatures

Example with RSA:

```csharp
using System.Security.Cryptography;
using System.Text;

using RSA rsa = RSA.Create(2048);
byte[] payload = Encoding.UTF8.GetBytes("important-message");

byte[] signature = rsa.SignData(payload, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
bool valid = rsa.VerifyData(payload, signature, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
```

Use cases:

- token signing
- document authenticity

## 5. HMAC (Message Authentication)

HMAC uses a secret key with a hash function to verify integrity and authenticity.

Common algorithm:

- HMACSHA256

Example:

```csharp
using System.Security.Cryptography;
using System.Text;

byte[] key = RandomNumberGenerator.GetBytes(32);
byte[] data = Encoding.UTF8.GetBytes("api-body");

using var hmac = new HMACSHA256(key);
byte[] mac = hmac.ComputeHash(data);
```

Use cases:

- webhook signature verification
- request integrity checks

## 6. Password Hashing and Key Derivation

Never store plain passwords. Use password hashing with salt and many iterations.

Common approach:

- PBKDF2 via Rfc2898DeriveBytes

Example:

```csharp
using System.Security.Cryptography;

byte[] salt = RandomNumberGenerator.GetBytes(16);
byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
    password: "P@ssw0rd!",
    salt: salt,
    iterations: 100_000,
    hashAlgorithm: HashAlgorithmName.SHA256,
    outputLength: 32);
```

Use cases:

- password storage
- deriving cryptographic keys from passphrases

## 7. Secure Random Number Generation

Use cryptographic RNG, not Random, for secrets and tokens.

Example:

```csharp
using System.Security.Cryptography;

byte[] tokenBytes = RandomNumberGenerator.GetBytes(32);
string token = Convert.ToHexString(tokenBytes);
```

Use cases:

- session tokens
- nonce and IV generation
- one-time codes

## Common Mistakes to Avoid

- using MD5 or SHA1 for security-sensitive hashing
- reusing IVs with AES
- storing encryption keys in source code
- using Random for secrets
- using encryption when hashing is needed, or vice versa

## Recommended Practices

- prefer modern algorithms (AES, SHA-256, RSA/ECDSA)
- use authenticated encryption modes when possible
- keep keys in secure key management systems like Azure Key Vault
- rotate keys and monitor cryptographic operations
- use framework helpers where appropriate (for example ASP.NET Core data protection)

## Real-World Mapping

- Passwords: PBKDF2 hash + salt
- API request signature: HMACSHA256
- Data encryption: AES
- JWT or document signing: RSA or ECDSA
- Token generation: RandomNumberGenerator

## Summary

The most common cryptography methods in .NET are hashing, symmetric encryption, asymmetric encryption, digital signatures, HMAC, key derivation, and secure random generation. Choosing the right method depends on whether you need confidentiality, integrity, authenticity, or all three.
