# 1338. Reduce Array Size to The Half

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Sorting

## Problem

Given an array `arr`, choose a set of distinct integers and remove every occurrence of them so at least half of the array's elements are removed. Return the minimum size of such a set.

### Example

```
Input: arr = [3,3,3,3,5,5,5,2,2,7]
Output: 2
```

## Approach

Count the frequency of every value, then greedily remove the most frequent values first, since each removed distinct value eliminates the maximum possible number of elements per "slot" used. Keep removing until at least half the array has been eliminated, counting how many distinct values were needed.

## C# Solution

```csharp
public class Solution
{
    public int MinSetSize(int[] arr)
    {
        var freq = new Dictionary<int, int>();
        foreach (var num in arr) freq[num] = freq.GetValueOrDefault(num, 0) + 1;

        var counts = freq.Values.OrderByDescending(c => c).ToList();

        int removed = 0, needed = (arr.Length + 1) / 2, setSize = 0;
        foreach (var count in counts)
        {
            removed += count;
            setSize++;
            if (removed >= needed) break;
        }

        return setSize;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the frequency map.
