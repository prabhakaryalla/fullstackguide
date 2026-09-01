# 548. Split Array with Equal Sum

**Difficulty:** Medium
**Category:** Array, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums`, determine if there exist three indices `i < j < k` splitting the array into four parts `nums[0..i-1]`, `nums[i+1..j-1]`, `nums[j+1..k-1]`, `nums[k+1..n-1]` (each non-empty) such that all four parts have the same sum.

### Example

```
Input: nums = [1,2,1,2,1,2,1]
Output: true
```

### Constraints

- `1 <= nums.length <= 2000`
- `-10^6 <= nums[i] <= 10^6`

## Approach

Precompute prefix sums for O(1) range-sum queries. Fix the middle split point `j`, then for every candidate `i` left of it, check whether the first and second parts have equal sums, recording that common sum in a set; for every candidate `k` right of `j`, check whether the third and fourth parts have equal sums, and see if that sum was already recorded as achievable on the left side. A match across both sides for the same sum value confirms a valid four-way equal split exists.

## C# Solution

```csharp
public class Solution
{
    public bool SplitArray(int[] nums)
    {
        int n = nums.Length;
        if (n < 7) return false;

        var prefixSum = new long[n];
        prefixSum[0] = nums[0];
        for (int i = 1; i < n; i++)
            prefixSum[i] = prefixSum[i - 1] + nums[i];

        for (int j = 3; j < n - 3; j++)
        {
            var possibleSums = new HashSet<long>();

            for (int i = 1; i < j - 1; i++)
            {
                long sum1 = prefixSum[i - 1];
                long sum2 = prefixSum[j - 1] - prefixSum[i];

                if (sum1 == sum2)
                    possibleSums.Add(sum1);
            }

            for (int k = j + 2; k < n - 1; k++)
            {
                long sum3 = prefixSum[k - 1] - prefixSum[j];
                long sum4 = prefixSum[n - 1] - prefixSum[k];

                if (sum3 == sum4 && possibleSums.Contains(sum3))
                    return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the prefix sums and set.
