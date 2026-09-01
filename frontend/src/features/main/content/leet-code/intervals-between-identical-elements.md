# 2121. Intervals Between Identical Elements

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

Given an integer array `arr`, return an array where `answer[i]` is the sum of `|i - j|` for all indices j where `arr[j] == arr[i]` and `i != j`.

### Example

```
Input: arr = [2,1,3,1,2,3,3]
Output: [4,2,7,2,4,4,5]
Explanation: For arr[0]=2, indices with 2 are [0,4], distance is |0-4|=4.
```

## Approach

Group indices by value. For each value, compute prefix sums of distances. For each index in a group, use prefix sums to calculate the sum of distances to all other indices in that group efficiently.

## C# Solution

```csharp
public class Solution
{
    public long[] GetDistances(int[] arr)
    {
        var dict = new Dictionary<int, List<int>>();
        for (int i = 0; i < arr.Length; i++)
        {
            if (!dict.ContainsKey(arr[i]))
                dict[arr[i]] = new List<int>();
            dict[arr[i]].Add(i);
        }
        
        long[] result = new long[arr.Length];
        foreach (var indices in dict.Values)
        {
            long[] prefix = new long[indices.Count + 1];
            for (int i = 0; i < indices.Count; i++)
                prefix[i + 1] = prefix[i] + indices[i];
            
            for (int i = 0; i < indices.Count; i++)
            {
                int idx = indices[i];
                long left = (long)idx * i - prefix[i];
                long right = (prefix[indices.Count] - prefix[i + 1]) - (long)idx * (indices.Count - i - 1);
                result[idx] = left + right;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
