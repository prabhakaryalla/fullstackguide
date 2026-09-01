# 3162. Find the Number of Good Pairs I

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem
Given two integer arrays `nums1` and `nums2` and an integer `k`, count the number of pairs `(i, j)` such that `nums1[i]` is divisible by `nums2[j] * k`.

## Approach
Since the arrays are small in this version of the problem, a direct double loop over all pairs `(i, j)` checking the divisibility condition `nums1[i] % (nums2[j] * k) == 0` is efficient enough.

## C# Solution
```csharp
public class Solution {
    public int NumberOfPairs(int[] nums1, int[] nums2, int k) {
        int ans = 0;
        foreach (int num1 in nums1)
            foreach (int num2 in nums2)
                if (num1 % (num2 * k) == 0)
                    ans++;
        return ans;
    }
}
```

## Complexity
- Time: O(n * m)
- Space: O(1)
