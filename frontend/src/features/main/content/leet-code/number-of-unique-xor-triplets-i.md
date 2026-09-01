# 3513. Number of Unique XOR Triplets I

**Difficulty:** Medium
**Category:** Array, Math, Bit Manipulation

## Problem
You are given an integer array `nums` of length `n`, where `nums` is a permutation of the numbers in the range `[1, n]`.

A XOR triplet is defined as `nums[i] XOR nums[j] XOR nums[k]` for indices `i <= j <= k` (indices may repeat). Return the number of unique XOR triplet values achievable over all valid triplets.

### Example
Input: `nums = [3, 1, 2]`
Output: `4`
Explanation: Possible triplet values include `3^3^3=3`, `3^3^1=1`, `3^3^2=2`, and `3^1^2=0`, among others. The full set of achievable unique values is `{0, 1, 2, 3}`, so the output is 4.

## Approach
Since `nums` is a permutation of `[1, n]`, XOR-ing any three (possibly repeated) chosen values can reach every integer in `[0, 2^(msb(n) + 1) - 1]`, where `msb(n)` is the position of the highest set bit of `n`. Intuitively, with three "slots" available you have enough freedom (repetition allowed) to construct any combination of bits up to that range using values already present in `[1, n]`. The special case `n <= 2` must be handled directly, since there aren't enough distinct values to reach the full theoretical range: with `n = 1` only the value itself is achievable (1 unique value), and with `n = 2` exactly `{1, 2}` are achievable (2 unique values).

## C# Solution

```csharp
public class Solution {
    public int UniqueXorTriplets(int[] nums) {
        int n = nums.Length;
        if (n < 3) return n;
        int msb = (int)Math.Floor(Math.Log2(n));
        return 1 << (msb + 1);
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
