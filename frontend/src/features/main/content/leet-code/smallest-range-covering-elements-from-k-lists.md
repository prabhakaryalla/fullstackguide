# 632. Smallest Range Covering Elements from K Lists

**Difficulty:** Hard
**Category:** Array, Hash Table, Greedy, Sorting, Sliding Window, Heap

## Problem

Given `k` sorted integer lists, return the smallest range `[a, b]` that includes at least one number from each of the `k` lists. If multiple ranges tie for smallest, return the one with the smallest `a`.

### Example

```
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
```

### Constraints

- `1 <= nums.length <= 3500`
- `1 <= nums[i].length <= 50`

## Approach

Use a min-heap seeded with the first element of every list, and separately track the current maximum value across all heap entries. At each step, the range from the heap's minimum to the tracked maximum is a valid candidate (since it covers one element from every list); update the best answer if this range is smaller. Then advance the list that contributed the minimum value to its next element, updating the running maximum, and repeat until any list is exhausted (at which point no further list can contribute a value, so no smaller valid range can exist).

## C# Solution

```csharp
public class Solution
{
    public int[] SmallestRange(IList<IList<int>> nums)
    {
        var heap = new PriorityQueue<(int Value, int ListIndex, int ElementIndex), int>();
        int currentMax = int.MinValue;

        for (int i = 0; i < nums.Count; i++)
        {
            heap.Enqueue((nums[i][0], i, 0), nums[i][0]);
            currentMax = Math.Max(currentMax, nums[i][0]);
        }

        int bestStart = 0, bestEnd = int.MaxValue;

        while (heap.Count == nums.Count)
        {
            var (value, listIndex, elementIndex) = heap.Dequeue();

            if (currentMax - value < bestEnd - bestStart)
            {
                bestStart = value;
                bestEnd = currentMax;
            }

            if (elementIndex + 1 < nums[listIndex].Count)
            {
                int nextValue = nums[listIndex][elementIndex + 1];
                heap.Enqueue((nextValue, listIndex, elementIndex + 1), nextValue);
                currentMax = Math.Max(currentMax, nextValue);
            }
        }

        return new[] { bestStart, bestEnd };
    }
}
```

## Complexity

- **Time:** `O(n log k)`, where `n` is the total number of elements across all lists.
- **Space:** `O(k)` for the heap.
