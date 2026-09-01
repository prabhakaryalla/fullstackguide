# 1734. Decode XORed Permutation

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

There is an integer permutation `perm` of `1..n` (`n` is odd), encoded as `encoded[i] = perm[i] XOR perm[i + 1]`. Given `encoded`, return the original permutation.

### Example

```
Input: encoded = [3,1]
Output: [1,2,3]
```

## Approach

The XOR of all numbers `1..n` is known in advance. Also, the XOR of `encoded` at every odd index equals the XOR of `perm[1..n-1]` (every element except `perm[0]`), because consecutive pairs telescope. So `perm[0]` equals the total XOR of `1..n` XORed with the XOR of the odd-indexed `encoded` entries. Once `perm[0]` is known, the rest follows directly from `perm[i+1] = perm[i] XOR encoded[i]`.

## C# Solution

```csharp
public class Solution
{
    public int[] Decode(int[] encoded)
    {
        int n = encoded.Length + 1;
        int totalXor = 0;
        for (int i = 1; i <= n; i++) totalXor ^= i;

        int oddXor = 0;
        for (int i = 1; i < encoded.Length; i += 2) oddXor ^= encoded[i];

        int[] perm = new int[n];
        perm[0] = totalXor ^ oddXor;
        for (int i = 0; i < encoded.Length; i++) perm[i + 1] = perm[i] ^ encoded[i];

        return perm;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
