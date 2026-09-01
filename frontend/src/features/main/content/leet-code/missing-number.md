# 268. Missing Number

**Difficulty:** Easy
**Category:** Array, Hash Table, Math, Binary Search, Bit Manipulation, Sorting

## Problem

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

### Example

```
Input: nums = [3,0,1]
Output: 2
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^4`

## Approach

The sum of all integers from `0` to `n` is `n * (n + 1) / 2`. Subtracting the actual sum of the array from this expected sum yields the single missing number, since every other value cancels out.

## C# Solution

```csharp
public class Solution
{
    public int MissingNumber(int[] nums)
    {
        int n = nums.Length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;

        foreach (var num in nums) actualSum += num;

        return expectedSum - actualSum;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass over the array.
- **Space:** `O(1)`.
