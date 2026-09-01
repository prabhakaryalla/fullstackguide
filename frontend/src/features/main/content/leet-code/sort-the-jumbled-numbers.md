# 2191. Sort the Jumbled Numbers

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

You are given a 0-indexed integer array `mapping` which represents the mapping rule of a shuffled decimal system. `mapping[i] = j` means digit `i` should be mapped to digit `j`.

The mapped value of an integer is the new integer obtained by replacing each occurrence of digit `i` with `mapping[i]` for all `0 <= i <= 9`.

You are also given another integer array `nums`. Return the array `nums` sorted in non-decreasing order based on the mapped values of its elements.

### Example

```
Input: mapping = [8,9,4,0,2,1,3,5,7,6], nums = [991,338,38]
Output: [338,38,991]
Explanation:
Map 991 -> 669
Map 338 -> 007
Map 38 -> 07
The mapped values are [669, 7, 7].
338 and 38 both map to 7, but 338 appears before 38 in nums, so it comes first.
```

## Approach

1. For each number in `nums`, compute its mapped value by converting each digit according to the mapping
2. Create pairs of (original index, mapped value, original value)
3. Sort by mapped value, using original index as tie-breaker for stability
4. Return the sorted original values

## C# Solution

```csharp
public class Solution
{
    public int[] SortJumbled(int[] mapping, int[] nums)
    {
        var mapped = new List<(int index, long mappedValue, int originalValue)>();
        
        for (int i = 0; i < nums.Length; i++)
        {
            long mappedValue = MapNumber(nums[i], mapping);
            mapped.Add((i, mappedValue, nums[i]));
        }
        
        // Sort by mapped value, then by original index for stability
        mapped.Sort((a, b) =>
        {
            int cmp = a.mappedValue.CompareTo(b.mappedValue);
            return cmp != 0 ? cmp : a.index.CompareTo(b.index);
        });
        
        int[] result = new int[nums.Length];
        for (int i = 0; i < mapped.Count; i++)
        {
            result[i] = mapped[i].originalValue;
        }
        
        return result;
    }
    
    private long MapNumber(int num, int[] mapping)
    {
        if (num == 0) return mapping[0];
        
        long result = 0;
        long multiplier = 1;
        
        while (num > 0)
        {
            int digit = num % 10;
            result += mapping[digit] * multiplier;
            multiplier *= 10;
            num /= 10;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * log n * d), where n is array length and d is average number of digits
- **Space:** O(n)
