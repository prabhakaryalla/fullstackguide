# 1394. Find Lucky Integer in an Array

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

A lucky integer is one whose value equals its frequency in the array. Given `arr`, return the largest lucky integer, or `-1` if none exists.

### Example

```
Input: arr = [2,2,3,4]
Output: 2
```

## Approach

Count how many times each value appears, then scan the frequency map for entries where the value equals its own count, tracking the largest such value.

## C# Solution

```csharp
public class Solution
{
    public int FindLucky(int[] arr)
    {
        var freq = new Dictionary<int, int>();
        foreach (var num in arr) freq[num] = freq.GetValueOrDefault(num, 0) + 1;

        int best = -1;
        foreach (var kv in freq)
        {
            if (kv.Key == kv.Value) best = Math.Max(best, kv.Key);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the frequency map.
