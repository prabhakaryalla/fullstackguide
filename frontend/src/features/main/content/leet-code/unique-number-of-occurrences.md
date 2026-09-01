# 1207. Unique Number of Occurrences

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an array of integers `arr`, return `true` if the number of occurrences of each distinct value in the array is unique.

### Example

```
Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: 1 appears 3 times, 2 appears 2 times, 3 appears 1 time — all counts distinct.
```

## Approach

Count how many times each value occurs using a dictionary. Then walk the collected counts and try inserting each one into a `HashSet`; if a count is already present, two values share the same frequency, so the answer is `false`. If every count is inserted successfully, all frequencies are unique.

## C# Solution

```csharp
public class Solution
{
    public bool UniqueOccurrences(int[] arr)
    {
        var counts = new Dictionary<int, int>();
        foreach (int num in arr)
            counts[num] = counts.GetValueOrDefault(num) + 1;

        var seenCounts = new HashSet<int>();
        foreach (int count in counts.Values)
            if (!seenCounts.Add(count))
                return false;

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `arr`.
- **Space:** `O(n)` for the frequency map and seen-counts set.
