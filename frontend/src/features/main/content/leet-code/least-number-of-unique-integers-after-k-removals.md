# 1481. Least Number of Unique Integers after K Removals

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Sorting, Counting

## Problem

Given an integer array `arr` and an integer `k`, remove exactly `k` elements to minimize the number of unique integers remaining. Return that minimum count.

### Example

```
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
```

## Approach

Count the frequency of each distinct value, then sort those frequencies ascending. Greedily eliminate entire groups starting from the least frequent value — removing a whole group (spending `frequency` removals) reduces the unique count by one. Keep consuming groups while enough removals (`k`) remain, then report how many distinct groups are left.

## C# Solution

```csharp
public class Solution
{
    public int FindLeastNumOfUniqueInts(int[] arr, int k)
    {
        var frequencies = arr.GroupBy(x => x)
            .Select(g => g.Count())
            .OrderBy(f => f)
            .ToList();

        int remaining = frequencies.Count;

        foreach (var f in frequencies)
        {
            if (k >= f)
            {
                k -= f;
                remaining--;
            }
            else
            {
                break;
            }
        }

        return remaining;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for grouping and sorting frequencies.
- **Space:** `O(n)` for the frequency map.
