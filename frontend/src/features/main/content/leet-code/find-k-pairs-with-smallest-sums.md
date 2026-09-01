# 373. Find K Pairs with Smallest Sums

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue)

## Problem

Given two integer arrays `nums1` and `nums2` sorted in ascending order and an integer `k`, return the `k` pairs `(u, v)` with `u` from `nums1` and `v` from `nums2` that have the smallest sums.

### Example

```
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
```

### Constraints

- `1 <= nums1.length, nums2.length <= 10^5`
- `-10^9 <= nums1[i], nums2[i] <= 10^9`
- `nums1` and `nums2` are both sorted in non-decreasing order.
- `1 <= k <= 10^4`

## Approach

Seed a min-heap with pairs `(i, 0)` for the first `min(nums1.Length, k)` indices `i`, keyed by their sum. Repeatedly pop the smallest-sum pair, add it to the result, and push the next candidate in `nums2` for that same `nums1` index — this mirrors merging `nums1.Length` sorted lists without ever generating more than `k` candidates at once.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> KSmallestPairs(int[] nums1, int[] nums2, int k)
    {
        var result = new List<IList<int>>();
        if (nums1.Length == 0 || nums2.Length == 0 || k == 0) return result;

        var heap = new PriorityQueue<(int I, int J), long>();
        for (int i = 0; i < Math.Min(nums1.Length, k); i++)
            heap.Enqueue((i, 0), (long)nums1[i] + nums2[0]);

        while (result.Count < k && heap.Count > 0)
        {
            var (i, j) = heap.Dequeue();
            result.Add(new List<int> { nums1[i], nums2[j] });

            if (j + 1 < nums2.Length)
                heap.Enqueue((i, j + 1), (long)nums1[i] + nums2[j + 1]);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(k log k)` — at most `k` heap operations, each `O(log k)`.
- **Space:** `O(k)` for the heap and result.
