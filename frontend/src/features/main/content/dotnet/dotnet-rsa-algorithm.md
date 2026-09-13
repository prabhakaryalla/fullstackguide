# RSA (Rivest–Shamir–Adleman) Algorithm

RSA is an asymmetric encryption algorithm built entirely on properties of prime numbers. Understanding the math behind it makes it much easier to reason about key sizes, security, and why RSA is slow compared to symmetric ciphers.

## Why It Matters

RSA underpins TLS certificates, JWT signing, and secure key exchange. Knowing how the keys are actually generated — not just how to call `RSA.Create()` — helps you understand why key size matters, why RSA keys can't be "brute forced" the same way symmetric keys are, and why RSA is used to protect small pieces of data (like a symmetric key) rather than large payloads.

## Building Blocks

- **Factors**: numbers that divide evenly into another number. Factors of 21 are 1, 3, 7, 21.
- **Prime number**: a number greater than 1 whose only factors are 1 and itself (2, 3, 5, 7, 11, 13, 19, ...).
- **Semi-prime**: a number that is the product of exactly two prime numbers. 21 = 3 × 7 is a semi-prime; its factors are 1, 3, 7, 21.
- **Modulo (MOD)**: the remainder after division. `13 MOD 5 = 3` because 13 = 2×5 + 3.

RSA keys are built from a semi-prime number, and RSA's security depends on how hard it is to factor that semi-prime back into its two original primes.

## Math Behind RSA Key Generation

1. **Select two prime numbers** `P` and `Q` — for example `P = 7`, `Q = 19`.
2. **Calculate the modulus** `N = P × Q` → `7 × 19 = 133` (a semi-prime; this becomes part of both keys).
3. **Calculate the totient** `T = (P - 1) × (Q - 1)` → `6 × 18 = 108` (counts how many numbers below `N` are coprime to `N`).
4. **Select the public key exponent `E`**, where:
   - `E` must be prime
   - `E` must be less than `T`
   - `E` must not be a factor of `T`

   For `T = 108`, both `E = 5` and `E = 29` satisfy these rules. The worked example below uses `E = 29`.
5. **Select the private key exponent `D`**, where `(D × E) MOD T = 1`.

   For `E = 29` and `T = 108`, `D = 41` works, because `(41 × 29) MOD 108 = 1189 MOD 108 = 1`.

The **public key** is the pair `(E, N)` = `(29, 133)`. The **private key** is the pair `(D, N)` = `(41, 133)`.

## Encryption and Decryption

```text
Encryption: Message^E MOD N = Cipher Text
Decryption: Cipher^D  MOD N = Message
```

RSA is symmetric in structure — either key can encrypt as long as the other one decrypts.

### Worked Example: Encrypt with Public Key, Decrypt with Private Key

```text
Message = 60
(60^29) MOD 133 = 86   -> Cipher Text
(86^41) MOD 133 = 60   -> back to original Message
```

### Worked Example: Encrypt with Private Key, Decrypt with Public Key (the basis for digital signatures)

```text
(60^41) MOD 133 = 72
(72^29) MOD 133 = 60
```

This second pattern — encrypting with the private key so anyone with the public key can verify it — is exactly how RSA digital signatures work: only the private key holder could have produced that cipher text.

```csharp
using System.Numerics;

BigInteger message = 60, e = 29, d = 41, n = 133;

BigInteger cipherText = BigInteger.ModPow(message, e, n);   // encrypt with public key -> 86
BigInteger decrypted = BigInteger.ModPow(cipherText, d, n); // decrypt with private key -> 60
```

In practice, .NET's `RSA` class handles key generation, padding, and modular exponentiation for you with far larger primes:

```csharp
using System.Security.Cryptography;

using RSA rsa = RSA.Create(2048); // real keys use primes hundreds of digits long
byte[] encrypted = rsa.Encrypt(data, RSAEncryptionPadding.OaepSHA256);
byte[] decrypted = rsa.Decrypt(encrypted, RSAEncryptionPadding.OaepSHA256);
```

## How Secure Is RSA?

RSA's security relies entirely on how hard it is to factor a large semi-prime number back into its two prime factors.

- Given `N = 133`, could you find `7` and `19`? Easy enough by hand.
- Now try factoring `1909` (an 11-bit number). Already much harder without a computer.
- Real RSA keys use numbers that are 2048 bits or larger — factoring them with current classical computers is considered computationally infeasible.

## The RSA Factoring Challenge

In 1991, RSA Laboratories published the **RSA Factoring Challenge**: 54 semi-prime numbers of increasing size, with a reward for anyone who could find their prime factors.

- The organized competition ended in 2007, with only 12 of the numbers factored.
- By 2020, a few more had been factored without any prize money involved.
- The largest number factored as of February 2020 was 829 bits.
- In roughly 29 years, no 1024-bit RSA number has ever been publicly factored.

This is why key size recommendations have grown over time:

- 1024-bit RSA keys were the recommended standard until 2002.
- 2048-bit RSA keys have been the recommended standard since 2015.

## Common Mistakes to Avoid

- using RSA keys smaller than 2048 bits for new systems
- encrypting large payloads directly with RSA instead of using it to exchange a symmetric key
- reusing the same `(P, Q)` primes across multiple keys
- picking `E` that shares a factor with the totient `T` (breaks the key generation requirement)

## Recommended Practices

- use RSA-2048 or larger (RSA-3072/4096 for longer-term protection)
- prefer OAEP padding for encryption and PSS/PKCS1 padding for signatures
- use RSA for key exchange or signatures, and a symmetric cipher like AES for bulk data
- consider ECDSA/ECDH as a faster alternative that reaches equivalent security with much smaller keys

## Summary

RSA keys are generated from two prime numbers `P` and `Q`, combined into a semi-prime modulus `N = P × Q` and a totient `T = (P-1)(Q-1)`. The public exponent `E` and private exponent `D` are chosen so that `(D × E) MOD T = 1`. Encryption and decryption are both just modular exponentiation: `Message^E MOD N` and `Cipher^D MOD N`. RSA's security comes from how difficult it is to factor `N` back into `P` and `Q` — a problem that stays hard even after decades of attempts, which is why 2048-bit keys are the current recommended minimum.
