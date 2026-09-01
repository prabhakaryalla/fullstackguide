# 3478. Choose K Elements With Maximum Sum

**Difficulty:** Medium
**Category:** Array, Sorting, Heap (Priority Queue)

## Problem

You are given two integer arrays `nums1` and `nums2`, both of length `n`, and an integer `k`. For each index `i`, consider all indices `j` such that `nums1[j] < nums1[i]`; among those, select up to `k` indices with the largest `nums2[j]` values and sum them. Return an array `answer` where `answer[i]` is this sum for index `i` (or `0` if no such index exists).

### Example

`nums1 = [4,2,1,5,3], nums2 = [10,20,30,40,50], k = 2` → for index 0 (`nums1[0] = 4`), the eligible indices are those with `nums1[j] < 4`, i.e. indices 1, 2, 4; the two largest `nums2` values among them are summed for `answer[0]`.

## Approach

Process indices in increasing order of `nums1` value, but handle all indices that share the same `nums1` value together as a batch — since ties don't count toward each other, every index in a tie group must be answered using the state *before* any of that group's `nums2` values are added. Maintain a min-heap of size at most `k` holding the largest `nums2` values seen so far (from strictly smaller `nums1` values), along with a running sum. For each group: first record the current running sum as the answer for every index in the group, then insert each of the group's `nums2` values into the heap (replacing the smallest element if the heap is full and the new value is larger), updating the running sum accordingly.

## C# Solution

```csharp
public class Solution 
{
    public long[] FindMaxSum(int[] nums1, int[] nums2, int k) 
    {
        int n = nums1.Length;
        long[] result = new long[n];

        int[] indices = new int[n];
        for (int i = 0; i < n; i++)
            indices[i] = i;
        Array.Sort(indices, (a, b) => nums1[a].CompareTo(nums1[b]));

        List<int> heap = new List<int>();
        long sum = 0;

        int idx = 0;
        while (idx < n)
        {
            int j = idx;
            while (j < n && nums1[indices[j]] == nums1[indices[idx]])
                j++;

            for (int t = idx; t < j; t++)
                result[indices[t]] = sum;

            for (int t = idx; t < j; t++)
                InsertIntoMinHeap(heap, nums2[indices[t]], k, ref sum);

            idx = j;
        }

        return result;
    }

    private void InsertIntoMinHeap(List<int> heap, int val, int k, ref long sum)
    {
        if (heap.Count < k)
        {
            heap.Add(val);
            sum += val;
            HeapifyUp(heap, heap.Count - 1);
        }
        else if (heap.Count > 0 && val > heap[0])
        {
            sum += val - heap[0];
            heap[0] = val;
            HeapifyDown(heap, 0);
        }
    }

    private void HeapifyUp(List<int> heap, int i)
    {
        while (i > 0)
        {
            int parent = (i - 1) / 2;
            if (heap[parent] <= heap[i]) break;
            (heap[parent], heap[i]) = (heap[i], heap[parent]);
            i = parent;
        }
    }

    private void HeapifyDown(List<int> heap, int i)
    {
        int n = heap.Count;
        while (true)
        {
            int left = 2 * i + 1, right = 2 * i + 2, smallest = i;
            if (left < n && heap[left] < heap[smallest]) smallest = left;
            if (right < n && heap[right] < heap[smallest]) smallest = right;
            if (smallest == i) break;
            (heap[smallest], heap[i]) = (heap[i], heap[smallest]);
            i = smallest;
        }
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
