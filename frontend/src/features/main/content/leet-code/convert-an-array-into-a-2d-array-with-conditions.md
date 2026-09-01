# 2610. Convert an Array Into a 2D Array With Conditions

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

You are given an integer array `nums`. You need to create a 2D array from `nums` satisfying the following conditions:

- The 2D array should contain only the elements of the array `nums`.
- Each row in the 2D array contains distinct integers.
- The number of rows in the 2D array should be minimal.

Return the resulting array. If there are multiple answers, return any of them.

### Example

```
Input: nums = [1,3,4,1,2,3,1]
Output: [[1,3,4,2],[1,3],[1]]
Explanation: Each element appears at most 3 times, so we need 3 rows.
```

## Approach

Count the frequency of each number. The answer will have `maxFrequency` rows. Distribute each number across rows such that no row has duplicates. Iterate through the counts and place each occurrence in the next available row.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindMatrix(int[] nums)
    {
        var freq = new Dictionary<int, int>();
        
        foreach (int num in nums)
        {
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }
        
        int maxFreq = freq.Values.Max();
        var result = new List<IList<int>>();
        
        for (int i = 0; i < maxFreq; i++)
            result.Add(new List<int>());
        
        foreach (var kvp in freq)
        {
            int num = kvp.Key;
            int count = kvp.Value;
            
            for (int i = 0; i < count; i++)
                result[i].Add(num);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) — counting and distributing elements
- **Space:** O(n) — for the frequency map
