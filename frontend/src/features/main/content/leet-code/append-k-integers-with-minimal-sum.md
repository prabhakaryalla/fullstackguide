# 2438. Append K Integers With Minimal Sum

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Sorting

## Problem

You are given an integer array `nums` and an integer `k`. Append `k` unique positive integers that do not appear in `nums` to `nums` such that the resulting total sum is minimum.

Return the sum of the `k` integers appended to `nums`.

### Example

```
Input: nums = [1,4,25,10,25], k = 2
Output: 5
Explanation: The two unique positive integers that do not appear in nums which we append are 2 and 3.
The resulting sum of nums is 1 + 4 + 25 + 10 + 25 + 2 + 3 = 70, which is the minimum.
The sum of the two integers appended is 2 + 3 = 5.
```

## Approach

Sort the array and remove duplicates. Fill in the gaps between consecutive numbers with the smallest available integers, starting from 1. If we still need more integers, take consecutive integers after the maximum.

## C# Solution

```csharp
public class Solution
{
    public long MinimalKSum(int[] nums, int k)
    {
        Array.Sort(nums);
        var unique = new List<int>();
        
        for (int i = 0; i < nums.Length; i++)
        {
            if (i == 0 || nums[i] != nums[i - 1])
            {
                unique.Add(nums[i]);
            }
        }
        
        long sum = 0;
        long current = 1;
        int count = 0;
        int idx = 0;
        
        while (count < k)
        {
            if (idx < unique.Count && current == unique[idx])
            {
                current++;
                idx++;
            }
            else
            {
                sum += current;
                current++;
                count++;
            }
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the unique list
