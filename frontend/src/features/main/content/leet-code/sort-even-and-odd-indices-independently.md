# 2164. Sort Even and Odd Indices Independently

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

You are given a 0-indexed integer array `nums`. Rearrange the values at odd indices of `nums` in non-increasing order and the values at even indices in non-decreasing order.

Return the array formed after rearranging the values.

### Example

```
Input: nums = [4,1,2,3]
Output: [2,3,4,1]
Explanation: Even indices [0,2]: [4,2] sorted ascending -> [2,4]
Odd indices [1,3]: [1,3] sorted descending -> [3,1]
Result: [2,3,4,1]
```

## Approach

Extract elements at even and odd indices separately, sort them according to requirements, then merge back into the result array.

## C# Solution

```csharp
public class Solution
{
    public int[] SortEvenOdd(int[] nums)
    {
        var even = new List<int>();
        var odd = new List<int>();
        
        for (int i = 0; i < nums.Length; i++)
        {
            if (i % 2 == 0)
                even.Add(nums[i]);
            else
                odd.Add(nums[i]);
        }
        
        even.Sort();
        odd.Sort();
        odd.Reverse();
        
        var result = new int[nums.Length];
        int evenIdx = 0, oddIdx = 0;
        
        for (int i = 0; i < nums.Length; i++)
        {
            if (i % 2 == 0)
                result[i] = even[evenIdx++];
            else
                result[i] = odd[oddIdx++];
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the separate lists
