# 1835. Find XOR Sum of All Pairs Bitwise AND

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Math

## Problem

Given two arrays `arr1` and `arr2`, define the pairwise-AND XOR sum as the XOR over all pairs `(arr1[i] & arr2[j])` for every `i, j`. Return this value without explicitly enumerating all pairs.

### Example

```
Input: arr1 = [1,2,3], arr2 = [6,5]
Output: 0
```

## Approach

Bitwise AND distributes over XOR in the following sense: `XOR over i,j of (arr1[i] & arr2[j])` equals `(XOR of all arr1[i]) & (XOR of all arr2[j])`. Intuitively, for a fixed bit position, that bit of the AND is `1` only when both operands have it set; summing (mod 2, i.e. XOR) over all pairs of a fixed bit factors into the product of how many times each side has that bit set, mod 2 — which is exactly the AND of the two arrays' XOR sums at that bit. So computing the XOR of each array separately and ANDing the two results gives the answer in linear time.

## C# Solution

```csharp
public class Solution
{
    public int GetXORSum(int[] arr1, int[] arr2)
    {
        int xor1 = 0, xor2 = 0;
        foreach (int a in arr1) xor1 ^= a;
        foreach (int b in arr2) xor2 ^= b;
        return xor1 & xor2;
    }
}
```

## Complexity

- **Time:** `O(n + m)` where `n`/`m` are the array lengths.
- **Space:** `O(1)`.
