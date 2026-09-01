# 561. Array Partition

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

Given an integer array `nums` of `2n` integers, group them into `n` pairs `(a1, b1), (a2, b2), ..., (an, bn)` such that the sum of `min(ai, bi)` for all pairs is maximized. Return the maximized sum.

### Example

```
Input: nums = [1,4,3,2]
Output: 4
Explanation: (1,2) and (3,4) give 1 + 3 = 4.
```

### Constraints

- `1 <= n <= 10^4`
- `nums.length == 2 * n`
- `-10^4 <= nums[i] <= 10^4`

## Approach

Sort the array, then pair up adjacent elements. Since the minimum of each pair contributes to the sum, pairing sorted neighbors together minimizes the "waste" from each pair's larger element, maximizing the total of the smaller elements taken across all pairs.

## C# Solution

```csharp
public class Solution
{
    public int ArrayPairSum(int[] nums)
    {
        Array.Sort(nums);
        int sum = 0;

        for (int i = 0; i < nums.Length; i += 2)
            sum += nums[i];

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
