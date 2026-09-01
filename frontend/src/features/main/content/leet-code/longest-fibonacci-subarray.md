# 3708. Longest Fibonacci Subarray

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `arr`, return the length of the longest contiguous subarray in which every element from the third one onward equals the sum of the previous two elements.

### Example

Input: `arr = [1,2,3,5,8,13,21]`
Output: `7`
Explanation: The entire array is Fibonacci-like since each element equals the sum of the two preceding ones.

## Approach

Scan the array while tracking a running Fibonacci-like run length. Extend the run when `arr[i] == arr[i-1] + arr[i-2]`; otherwise reset it to `2` (any two elements trivially satisfy the base case). Track the maximum run seen.

## C# Solution

```csharp
public class Solution 
{
    public int LongestSubarray(int[] arr) 
    {
        int n = arr.Length;
        if (n < 2) return n;
        int maxLen = 2;
        int curLen = 2;
        for (int i = 2; i < n; i++) 
        {
            if ((long)arr[i] == (long)arr[i - 1] + arr[i - 2]) 
            {
                curLen++;
            } 
            else 
            {
                curLen = 2;
            }
            maxLen = Math.Max(maxLen, curLen);
        }
        return maxLen;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
