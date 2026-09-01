# 3640. Trionic Array II

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem

An array is **trionic** on a range if it strictly increases, then strictly decreases, then strictly increases again, with all three parts non-empty. Return the length of the longest trionic contiguous subarray of `nums`, or `-1` if none exists.

### Example

`nums = [1,3,2,4]` is entirely trionic, so the answer is 4.

## Approach

Precompute, for every index `i`: the length of the increasing run ending at `i`, the length of the decreasing run ending at `i`, and the length of the increasing run starting at `i`. For every candidate "valley" index `v` (end of a decreasing run of length ≥ 2 that is followed by an increasing run of length ≥ 2), locate the corresponding "peak" index and check that it is itself preceded by an increasing run of length ≥ 2. Combine the three run lengths (subtracting 2 for the shared peak and valley elements) to get the total subarray length, and track the maximum.

## C# Solution

```csharp
public class Solution 
{
    public int MaxTrionic(int[] nums) 
    {
        int n = nums.Length;
        int[] incEnd = new int[n];
        int[] decEnd = new int[n];
        int[] incStart = new int[n];

        incEnd[0] = 1;
        for (int i = 1; i < n; i++) 
        {
            incEnd[i] = nums[i] > nums[i - 1] ? incEnd[i - 1] + 1 : 1;
        }

        decEnd[0] = 1;
        for (int i = 1; i < n; i++) 
        {
            decEnd[i] = nums[i] < nums[i - 1] ? decEnd[i - 1] + 1 : 1;
        }

        incStart[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--) 
        {
            incStart[i] = nums[i] < nums[i + 1] ? incStart[i + 1] + 1 : 1;
        }

        int best = -1;
        for (int v = 1; v < n - 1; v++) 
        {
            if (decEnd[v] < 2 || incStart[v] < 2) continue;
            int peakIdx = v - decEnd[v] + 1;
            if (peakIdx < 0 || incEnd[peakIdx] < 2) continue;
            int total = incEnd[peakIdx] + decEnd[v] + incStart[v] - 2;
            best = Math.Max(best, total);
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
