# 2542. Maximum Subsequence Score

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

You are given two integer arrays `nums1` and `nums2` of equal length `n` and a positive integer `k`. You must choose a subsequence of indices from `nums1` of length `k`.

For chosen indices `i_0, i_1, ..., i_{k-1}`, your score is:
- The sum of the selected elements from `nums1` multiplied by the minimum of the selected elements from `nums2`

Return the maximum possible score.

### Example

```
Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12
Explanation: Choose indices 0, 2, 3: sum(1+3+2) = 6, min(2,3,4) = 2, score = 6×2 = 12.
```

## Approach

Sort pairs by `nums2` values in descending order. Use a min-heap to track the k largest values from `nums1` as we iterate. For each position (which determines the minimum `nums2` value), calculate the score using the current sum of the k largest `nums1` values.

## C# Solution

```csharp
public class Solution
{
    public long MaxScore(int[] nums1, int[] nums2, int k)
    {
        int n = nums1.Length;
        var pairs = new List<(int val1, int val2)>();
        
        for (int i = 0; i < n; i++)
        {
            pairs.Add((nums1[i], nums2[i]));
        }
        
        pairs.Sort((a, b) => b.val2.CompareTo(a.val2));
        
        PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();
        long sum = 0;
        long maxScore = 0;
        
        foreach (var (val1, val2) in pairs)
        {
            minHeap.Enqueue(val1, val1);
            sum += val1;
            
            if (minHeap.Count > k)
            {
                sum -= minHeap.Dequeue();
            }
            
            if (minHeap.Count == k)
            {
                maxScore = Math.Max(maxScore, sum * val2);
            }
        }
        
        return maxScore;
    }
}
```

## Complexity

- **Time:** O(n × log n)
- **Space:** O(n) for sorting and heap
