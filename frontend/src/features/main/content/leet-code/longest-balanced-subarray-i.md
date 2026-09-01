# 3719. Longest Balanced Subarray I

**Difficulty:** Medium
**Category:** Hash Table, Array, Prefix Sum

## Problem

Given an integer array `nums`, find the length of the longest subarray that contains an equal number of even and odd elements.

### Example

nums = [1,2,3,4,5] → the subarray [2,3,4,5] has two even (2,4) and two odd (3,5), length 4.

## Approach

Map each even element to `+1` and each odd element to `-1`, and maintain a running prefix sum. A subarray is balanced exactly when its two boundary prefix sums are equal, so track the first index where each prefix value occurs and take the maximum span whenever a repeat is found.

## C# Solution

```csharp
public class Solution 
{
    public int LongestBalancedSubarray(int[] nums) 
    {
        var firstSeen = new Dictionary<int, int> { { 0, -1 } };
        int prefix = 0, best = 0;
        for (int i = 0; i < nums.Length; i++) 
        {
            prefix += nums[i] % 2 == 0 ? 1 : -1;
            if (firstSeen.TryGetValue(prefix, out int idx)) 
            {
                best = Math.Max(best, i - idx);
            } 
            else 
            {
                firstSeen[prefix] = i;
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
