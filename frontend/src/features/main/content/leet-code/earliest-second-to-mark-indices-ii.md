# 3049. Earliest Second to Mark Indices II

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Heap (Priority Queue)

## Problem

You are given a 0-indexed array `nums` of `n` positive integers, and a 0-indexed array `changeIndices` of size `m` (1-indexed values into `nums`). At each second from `1` to `m`, you may either decrement any positive entry of `nums` by 1, or, if `nums[changeIndices[s] - 1]` is already `0` and not yet marked, mark it. Return the earliest second by which every index can be marked, or `-1` if impossible.

## Approach

Binary search on the answer `maxSecond`: check feasibility with a greedy simulation. For each index, the earliest second at which it *could* be zeroed and marked (its first appearance in `changeIndices`) matters most, so precompute a map from second to candidate index. Sweep seconds backward from `maxSecond`; whenever a candidate appears, push its value onto a min-heap — if there aren't enough "spare" marking seconds banked yet, immediately pop the smallest value (that index gets zeroed "for free" via marks rather than decrements), otherwise bank a mark for later use. Seconds with no candidate always bank a mark. At the end, the heap holds the values that must actually be decremented to zero (2 seconds each: decrement + mark), while the popped ones only cost a mark each; verify the total cost fits within `maxSecond`.

## C# Solution

```csharp
public class Solution {
    public int EarliestSecondToMarkIndices(int[] nums, int[] changeIndices) {
        long numsSum = 0;
        foreach (int num in nums)
            numsSum += num;
        Dictionary<int, int> secondToIndex = GetSecondToIndex(nums, changeIndices);

        int lo = 0, hi = changeIndices.Length + 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (CanMark(nums, secondToIndex, mid, numsSum))
                hi = mid;
            else
                lo = mid + 1;
        }

        return lo <= changeIndices.Length ? lo : -1;
    }

    // Returns true if every index of nums can be marked within maxSecond seconds.
    private bool CanMark(int[] nums, Dictionary<int, int> secondToIndex, int maxSecond, long numsSum) {
        var minHeap = new PriorityQueue<int, int>();
        int marks = 0;

        for (int second = maxSecond - 1; second >= 0; second--) {
            if (secondToIndex.TryGetValue(second, out int index)) {
                minHeap.Enqueue(nums[index], nums[index]);
                if (marks == 0) {
                    minHeap.Dequeue();
                    marks++;
                } else {
                    marks--;
                }
            } else {
                marks++;
            }
        }

        int heapSize = minHeap.Count;
        long heapSum = 0;
        while (minHeap.Count > 0)
            heapSum += minHeap.Dequeue();

        long decrementAndMarkCost = numsSum - heapSum + (nums.Length - heapSize);
        long zeroAndMarkCost = (long)heapSize * 2;
        return decrementAndMarkCost + zeroAndMarkCost <= maxSecond;
    }

    private Dictionary<int, int> GetSecondToIndex(int[] nums, int[] changeIndices) {
        var indexToFirstSecond = new Dictionary<int, int>();
        var secondToIndex = new Dictionary<int, int>();

        for (int second = 0; second < changeIndices.Length; second++) {
            int index = changeIndices[second] - 1;
            if (nums[index] > 0 && !indexToFirstSecond.ContainsKey(index))
                indexToFirstSecond[index] = second;
        }
        foreach (var kvp in indexToFirstSecond)
            secondToIndex[kvp.Value] = kvp.Key;

        return secondToIndex;
    }
}
```

## Complexity

- Time: O((m + n log n) log m) — binary search over the answer, each check doing a linear sweep with heap operations.
- Space: O(m) — the second-to-index map and the heap.
