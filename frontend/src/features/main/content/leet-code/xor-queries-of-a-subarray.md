# 1310. XOR Queries of a Subarray

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Prefix Sum

## Problem

Given an array `arr` and a list of `queries`, where each query is `[left, right]`, return an array of answers where each answer is the XOR of the elements `arr[left]` through `arr[right]` inclusive.

### Example

```
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8]
```

## Approach

Build a prefix XOR array `prefix` where `prefix[i]` is the XOR of `arr[0..i-1]`. Since XOR is its own inverse, the XOR of any range `[l, r]` equals `prefix[r+1] XOR prefix[l]`, letting every query be answered in constant time.

## C# Solution

```csharp
public class Solution
{
    public int[] XorQueries(int[] arr, int[][] queries)
    {
        int n = arr.Length;
        var prefix = new int[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] ^ arr[i];

        var result = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++)
        {
            int l = queries[i][0], r = queries[i][1];
            result[i] = prefix[r + 1] ^ prefix[l];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + q)`.
- **Space:** `O(n)` for the prefix array.
