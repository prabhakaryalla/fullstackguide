# 3681. Maximum XOR of Subsequences

**Difficulty:** Hard
**Category:** Bit Manipulation, Linear Algebra, Array

## Problem

Given an integer array `nums`, choose any subsequence (subset) of its elements and return the maximum possible XOR of the chosen elements.

### Example

Input: `nums = [8,1,2]`
Output: `11`
Explanation: Choosing `8, 1, 2` gives `8 ^ 1 ^ 2 = 11`, which is the maximum achievable XOR.

## Approach

Build a linear basis (Gaussian elimination over GF(2)) of the numbers' bits. Then greedily combine basis vectors from the highest bit down, XOR-ing a basis vector into the running result whenever doing so increases it, which yields the maximum XOR reachable by any subset.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumXor(int[] nums) 
    {
        int[] basis = new int[32];
        foreach (int num in nums) 
        {
            int cur = num;
            for (int b = 31; b >= 0; b--) 
            {
                if (((cur >> b) & 1) == 0) continue;
                if (basis[b] == 0) 
                {
                    basis[b] = cur;
                    break;
                }
                cur ^= basis[b];
            }
        }
        long result = 0;
        for (int b = 31; b >= 0; b--) 
        {
            if ((result ^ basis[b]) > result) 
            {
                result ^= basis[b];
            }
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n * 32)
- **Space:** O(32)
