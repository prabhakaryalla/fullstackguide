# 2150. Find All Lonely Numbers in the Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Counting

## Problem

You are given an integer array `nums`. A number `x` is lonely if it appears exactly once in the array and no adjacent numbers (`x + 1` or `x - 1`) appear in the array.

Return all lonely numbers in `nums`. You may return the answer in any order.

### Example

```
Input: nums = [10,6,5,8]
Output: [10,8]
Explanation:
- 10 is lonely (appears once, 9 and 11 not in array)
- 6 is not lonely (5 is x-1 and exists)
- 5 is not lonely (6 is x+1 and exists)
- 8 is lonely (appears once, 7 and 9 not in array)
```

## Approach

Count the frequency of each number using a hash map. Then for each number that appears exactly once, check if neither `x-1` nor `x+1` exists in the map. If both are absent, `x` is lonely.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindLonely(int[] nums)
    {
        Dictionary<int, int> count = new Dictionary<int, int>();
        
        foreach (int num in nums)
        {
            count[num] = count.GetValueOrDefault(num, 0) + 1;
        }
        
        List<int> result = new List<int>();
        
        foreach (var kvp in count)
        {
            if (kvp.Value == 1 && 
                !count.ContainsKey(kvp.Key - 1) && 
                !count.ContainsKey(kvp.Key + 1))
            {
                result.Add(kvp.Key);
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) for counting and checking.
- **Space:** O(n) for the hash map.
