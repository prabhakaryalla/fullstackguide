# 2421. Most Frequent Even Element

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

Given an integer array `nums`, return the most frequent even element. If there is a tie, return the smallest one. If there is no such element, return `-1`.

### Example

```
Input: nums = [0,1,2,2,4,4,1]
Output: 2
Explanation:
The even elements are 0, 2, 2, 4, 4.
2 and 4 both appear twice.
Since 2 is smaller, return 2.
```

## Approach

Use a hash map to count the frequency of each even number. Track the most frequent even number, breaking ties by choosing the smallest value.

## C# Solution

```csharp
public class Solution
{
    public int MostFrequentEven(int[] nums)
    {
        var freq = new Dictionary<int, int>();
        
        foreach (int num in nums)
        {
            if (num % 2 == 0)
            {
                freq[num] = freq.GetValueOrDefault(num, 0) + 1;
            }
        }
        
        if (freq.Count == 0) return -1;
        
        int result = -1;
        int maxFreq = 0;
        
        foreach (var kvp in freq)
        {
            if (kvp.Value > maxFreq || (kvp.Value == maxFreq && kvp.Key < result))
            {
                maxFreq = kvp.Value;
                result = kvp.Key;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(k) where k is the number of distinct even elements
