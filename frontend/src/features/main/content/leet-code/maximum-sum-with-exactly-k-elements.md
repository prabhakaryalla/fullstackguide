# 2656. Maximum Sum With Exactly K Elements

**Difficulty:** Easy
**Category:** Array, Greedy

## Problem

You are given a 0-indexed integer array `nums` and an integer `k`. Your task is to perform the following operation exactly `k` times in order to maximize your score:

1. Select an element `m` from `nums`.
2. Remove the selected element `m` from the array.
3. Add a new element with a value of `m + 1` to the array.
4. Increase your score by `m`.

Return the maximum score you can achieve after performing the operation exactly `k` times.

### Example

```
Input: nums = [1,2,3,4,5], k = 3
Output: 18
Explanation: Select 5, score += 5, nums = [1,2,3,4,6]
Select 6, score += 6, nums = [1,2,3,4,7]
Select 7, score += 7, nums = [1,2,3,4,8]
Total score = 18
```

## Approach

Greedily select the maximum element repeatedly. After selecting it `k` times, the sum forms an arithmetic series: `max + (max+1) + ... + (max+k-1)` = `k * max + k * (k-1) / 2`.

## C# Solution

```csharp
public class Solution
{
    public int MaximizeSum(int[] nums, int k)
    {
        int maxVal = nums.Max();
        return k * maxVal + k * (k - 1) / 2;
    }
}
```

## Complexity

- **Time:** O(n) — finding the maximum
- **Space:** O(1) — constant extra space
