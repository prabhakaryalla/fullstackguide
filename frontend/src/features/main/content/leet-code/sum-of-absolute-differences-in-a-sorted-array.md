# 1685. Sum of Absolute Differences in a Sorted Array

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

Given a sorted integer array `nums`, return an array `result` where `result[i]` is the sum of absolute differences between `nums[i]` and every other element.

### Example

```
Input: nums = [2,3,5]
Output: [4,3,5]
```

## Approach

Since the array is sorted, for index `i` every element to the left is `<= nums[i]` and every element to the right is `>= nums[i]`. Using prefix sums, the contribution from the left side is `nums[i] * i - prefixSum(0..i-1)`, and from the right side is `suffixSum(i+1..n-1) - nums[i] * (n - i - 1)`. Precompute prefix sums once and compute each answer in O(1).

## C# Solution

```csharp
public class Solution
{
    public int[] GetSumAbsoluteDifferences(int[] nums)
    {
        int n = nums.Length;
        int[] prefix = new int[n];
        int sum = 0;

        for (int i = 0; i < n; i++)
        {
            sum += nums[i];
            prefix[i] = sum;
        }

        int[] result = new int[n];

        for (int i = 0; i < n; i++)
        {
            int leftSum = prefix[i] - nums[i];
            int rightSum = prefix[n - 1] - prefix[i];
            int leftCount = i;
            int rightCount = n - i - 1;

            result[i] = (nums[i] * leftCount - leftSum) + (rightSum - nums[i] * rightCount);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix array.
