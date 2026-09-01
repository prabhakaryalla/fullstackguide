# 2190. Most Frequent Number Following Key In an Array

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

You are given an integer array `nums` and an integer `key` that is present in `nums`.

For every unique integer `target` in `nums`, count the number of times `target` immediately follows an occurrence of `key` in `nums`. In other words, count the number of indices `i` such that `nums[i] == key` and `nums[i + 1] == target`.

Return the target with the maximum count. If there are multiple answers, return the smallest target.

### Example

```
Input: nums = [1,100,200,1,100], key = 1
Output: 100
Explanation: For target = 100, there are 2 occurrences at indices 1 and 4.
For target = 200, there is 1 occurrence at index 2.
100 has the maximum count, so we return 100.
```

## Approach

1. Iterate through the array
2. Whenever we find `key` at position `i` and `i+1` is within bounds, record `nums[i+1]`
3. Count the frequency of each number that follows `key`
4. Return the number with the highest frequency (smallest if tie)

## C# Solution

```csharp
public class Solution
{
    public int MostFrequent(int[] nums, int key)
    {
        Dictionary<int, int> count = new Dictionary<int, int>();
        
        for (int i = 0; i < nums.Length - 1; i++)
        {
            if (nums[i] == key)
            {
                int target = nums[i + 1];
                count[target] = count.GetValueOrDefault(target, 0) + 1;
            }
        }
        
        int maxCount = 0;
        int result = 0;
        
        foreach (var pair in count)
        {
            if (pair.Value > maxCount || (pair.Value == maxCount && pair.Key < result))
            {
                maxCount = pair.Value;
                result = pair.Key;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of the array
- **Space:** O(k), where k is the number of distinct targets following key
