# 3779. Minimum Number of Operations to Have Distinct Elements

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Given an integer array `nums`, in one operation remove the first three elements of the current array (or all remaining elements if fewer than three remain). Repeat until the array is empty or contains no duplicate values. Return the number of operations required.

### Example

Input: `nums = [3,8,3,6,5,8]`
Output: `1`

After removing the first three elements, `[6, 5, 8]` remains and is distinct.

## Approach

Maintain a frequency map for all elements and a counter of how many distinct values currently have frequency `>= 2`. Repeatedly remove the next three elements (decrementing frequencies and the duplicate counter as values drop below 2) until the duplicate counter reaches 0 or the array is exhausted.

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(int[] nums) 
    {
        int n = nums.Length;
        var freq = new Dictionary<int, int>();
        foreach (int v in nums)
        {
            freq.TryGetValue(v, out int c);
            freq[v] = c + 1;
        }
        int dupCount = freq.Values.Count(c => c >= 2);

        int start = 0, ops = 0;
        while (dupCount > 0 && start < n)
        {
            int end = Math.Min(start + 3, n);
            for (int j = start; j < end; j++)
            {
                int val = nums[j];
                int oldFreq = freq[val];
                freq[val] = oldFreq - 1;
                if (oldFreq == 2) dupCount--;
            }
            start = end;
            ops++;
        }
        return ops;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
