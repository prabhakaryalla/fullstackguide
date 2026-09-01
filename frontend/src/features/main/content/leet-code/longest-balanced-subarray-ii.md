# 3721. Longest Balanced Subarray II

**Difficulty:** Hard
**Category:** Hash Table, Array, Prefix Sum

## Problem

Same as "Longest Balanced Subarray I" but `nums` can be very large, requiring a linear-time solution.

### Example

nums = [2,4,6,1,3] → the whole array has three even and two odd numbers, but the subarray [4,6,1,3] has two even and two odd, length 4 (the longest possible here).

## Approach

The same prefix-sum trick used for the first version is already linear: map even to `+1`, odd to `-1`, track the first occurrence index of each running prefix sum, and take the maximum distance whenever a prefix value repeats.

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
