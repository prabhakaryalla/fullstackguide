# 2784. Check if Array is Good

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

You are given an integer array `nums`. Let `n = nums.length - 1`. The array is "good" if it is a permutation of the base array `[1, 2, 3, ..., n-1, n, n]` (numbers 1 through n each appearing once, plus an extra copy of n). Return `true` if `nums` is good, otherwise `false`.

### Example

Input: nums = [1,3,3,2]
Output: true
Explanation: n = 3, and the base array is [1,2,3,3]. Sorting nums gives [1,2,3,3], which matches.

## Approach

Compute `n = nums.Length - 1`. Count occurrences of every value. If any value is outside `[1, n]`, the array can't be good. Otherwise, every value from 1 to n-1 must appear exactly once, and n must appear exactly twice.

## C# Solution

```csharp
public class Solution 
{
    public bool IsGood(int[] nums) 
    {
        int n = nums.Length - 1;
        var count = new int[n + 2];
        foreach (int num in nums) 
        {
            if (num < 1 || num > n) return false;
            count[num]++;
        }

        for (int v = 1; v < n; v++) 
        {
            if (count[v] != 1) return false;
        }

        return count[n] == 2;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
