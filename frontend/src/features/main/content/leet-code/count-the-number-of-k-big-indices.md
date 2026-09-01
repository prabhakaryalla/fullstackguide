# 2519. Count the Number of K-Big Indices

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Divide and Conquer, Binary Search, Segment Tree, Merge Sort, Ordered Set

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 0-indexed integer array `nums` and a positive integer `k`.

An index `i` is k-big if:
- There are at least k smaller elements to the left of index i
- There are at least k smaller elements to the right of index i

Return the number of k-big indices.

### Example

```
Input: nums = [2,3,6,5,2,3], k = 2
Output: 2
Explanation: Indices 2 and 3 are k-big
```

## Approach

Use two passes:
1. Left pass: for each index, count elements smaller than nums[i] to its left
2. Right pass: for each index, count elements smaller than nums[i] to its right
3. Count indices where both counts >= k

Use a data structure like TreeSet/SortedSet or Binary Indexed Tree for efficient counting.

## C# Solution

```csharp
public class Solution
{
    public int KBigIndices(int[] nums, int k)
    {
        int n = nums.Length;
        var leftSmaller = new int[n];
        var rightSmaller = new int[n];
        
        var sortedList = new SortedSet<(int val, int idx)>();
        
        for (int i = 0; i < n; i++)
        {
            leftSmaller[i] = sortedList.Count(x => x.val < nums[i]);
            sortedList.Add((nums[i], i));
        }
        
        sortedList.Clear();
        
        for (int i = n - 1; i >= 0; i--)
        {
            rightSmaller[i] = sortedList.Count(x => x.val < nums[i]);
            sortedList.Add((nums[i], i));
        }
        
        int count = 0;
        for (int i = 0; i < n; i++)
        {
            if (leftSmaller[i] >= k && rightSmaller[i] >= k)
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n² log n) with SortedSet; can be optimized to O(n log n) with BIT
- **Space:** O(n)
