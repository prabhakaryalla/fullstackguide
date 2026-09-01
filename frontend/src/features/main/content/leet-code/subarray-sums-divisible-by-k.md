# 974. Subarray Sums Divisible by K

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

Given an integer array `nums` and an integer `k`, return the number of non-empty contiguous subarrays whose sum is divisible by `k`.

### Example

```
Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
```

## Approach

Track the running prefix sum's remainder modulo `k` (normalized to be non-negative), and count how many times each remainder has occurred. Two prefix positions with the same remainder mean the subarray between them has a sum divisible by `k`, so each new occurrence of a remainder adds all prior occurrences of that same remainder to the answer.

## C# Solution

```csharp
public class Solution
{
    public int SubarraysDivByK(int[] nums, int k)
    {
        var count = new Dictionary<int, int> { [0] = 1 };
        int sum = 0, result = 0;

        foreach (var num in nums)
        {
            sum += num;
            int mod = ((sum % k) + k) % k;

            if (count.TryGetValue(mod, out int c)) result += c;
            count[mod] = count.GetValueOrDefault(mod) + 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(k)`.
