# 1911. Maximum Alternating Subsequence Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy

## Problem

Given an array `nums`, the alternating sum of a subsequence with 0-indexed elements `x0, x1, ..., x_{k-1}` is `x0 - x1 + x2 - x3 + ...`. Return the maximum alternating sum among all subsequences of `nums` (a subsequence can be any subset of elements keeping relative order, including a single element).

### Example

```
Input: nums = [4,2,5,3]
Output: 7
Explanation: Choose the subsequence [4,2,5] with alternating sum 4 - 2 + 5 = 7.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`

## Approach

Track two running values while scanning left to right: `even` = best alternating sum so far assuming the next picked element would be added (i.e., an even position in the chosen subsequence), and `odd` = best sum assuming the next picked element would be subtracted. For each `num`, update `even = max(even, odd + num)` and `odd = max(odd, even - num)` using the previous values (order matters, so compute using pre-update values). This is a compact greedy/DP that effectively tracks "holding" a positive or negative position, similar to buy/sell stock DP.

## C# Solution

```csharp
public class Solution
{
    public long MaxAlternatingSum(int[] nums)
    {
        long even = 0, odd = long.MinValue / 2;

        foreach (int num in nums)
        {
            long newEven = Math.Max(even, odd + num);
            long newOdd = Math.Max(odd, even - num);
            even = newEven;
            odd = newOdd;
        }

        return even;
    }
}
```

## Complexity

- **Time:** `O(n)` — one linear pass.
- **Space:** `O(1)`.
