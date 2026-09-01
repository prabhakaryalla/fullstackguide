# 3512. Minimum Operations to Make Array Sum Divisible by K

**Difficulty:** Easy
**Category:** Array, Math

## Problem

You are given an integer array `nums` and an integer `k`. In one operation you can decrease any element of `nums` by `1`. Return the minimum number of operations required so that the sum of `nums` is divisible by `k`.

### Example

```
Input: nums = [3,9,7], k = 5
Output: 4
Explanation: The sum is 19. Decrementing any elements a total of 4 times reduces the sum to 15, which is divisible by 5.
Fewer than 4 operations cannot reach a multiple of 5 that is <= 19 and closer, since 19 mod 5 = 4.
```

## Approach

Since every operation reduces the total sum by exactly `1`, the minimum number of operations needed to make the sum divisible by `k` is simply `sum % k` (reduce the sum down to the nearest smaller multiple of `k`).

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(int[] nums, int k) 
    {
        int sum = 0;
        foreach (int v in nums)
        {
            sum += v;
        }
        return sum % k;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `nums`.
- **Space:** O(1).
