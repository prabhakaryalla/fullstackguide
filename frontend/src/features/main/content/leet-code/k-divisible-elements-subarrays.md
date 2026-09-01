# 2261. K Divisible Elements Subarrays

**Difficulty:** Medium
**Category:** Array, Hash Table, Trie, Rolling Hash, Hash Function, Enumeration

## Problem

Given an integer array `nums` and two integers `k` and `p`, return the number of distinct subarrays that have at most `k` elements divisible by `p`.

### Example

```
Input: nums = [2,3,3,2,2], k = 2, p = 2
Output: 11
```

## Approach

Generate all subarrays, count how many elements in each are divisible by p. If the count is at most k, convert the subarray to a string or hash and add to a set to track distinct subarrays. Return the set size.

## C# Solution

```csharp
public class Solution
{
    public int CountDistinct(int[] nums, int k, int p)
    {
        var distinct = new HashSet<string>();
        int n = nums.Length;
        
        for (int i = 0; i < n; i++)
        {
            int count = 0;
            var sb = new StringBuilder();
            for (int j = i; j < n; j++)
            {
                if (nums[j] % p == 0) count++;
                if (count > k) break;
                
                sb.Append(nums[j]).Append(',');
                distinct.Add(sb.ToString());
            }
        }
        
        return distinct.Count;
    }
}
```

## Complexity

- **Time:** O(n²)
- **Space:** O(n²)
