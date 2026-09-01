# 630. Course Schedule III

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting, Heap

## Problem

Given an array `courses` where `courses[i] = [duration, lastDay]`, return the maximum number of courses that can be taken, given that only one course can be studied at a time and each course must finish by its `lastDay`.

### Example

```
Input: courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
Output: 3
```

### Constraints

- `1 <= courses.length <= 10^4`
- `1 <= duration, lastDay <= 10^4`

## Approach

Sort courses by deadline ascending, and greedily attempt to take every course in that order, tracking total elapsed time and keeping taken durations in a max-heap. If taking a new course pushes the total elapsed time past its deadline, it doesn't necessarily mean rejecting the new course — instead, check whether removing the *longest* course taken so far (from the max-heap) would free up enough time; since all currently-taken courses have deadlines at or before the current one, swapping out the longest one for the current shorter one (if it's shorter) can only help finish more courses within their deadlines.

## C# Solution

```csharp
public class Solution
{
    public int ScheduleCourse(int[][] courses)
    {
        Array.Sort(courses, (a, b) => a[1].CompareTo(b[1]));

        var maxHeap = new PriorityQueue<int, int>();
        int totalTime = 0;

        foreach (var course in courses)
        {
            int duration = course[0], lastDay = course[1];

            totalTime += duration;
            maxHeap.Enqueue(duration, -duration);

            if (totalTime > lastDay)
            {
                totalTime -= maxHeap.Dequeue();
            }
        }

        return maxHeap.Count;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the heap.
