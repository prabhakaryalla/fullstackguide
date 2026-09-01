# 1792. Maximum Average Pass Ratio

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue), Greedy

## Problem

Given `classes` where `classes[i] = [passi, totali]` and an integer `extraStudents` of guaranteed-to-pass students to distribute among the classes, return the maximum possible average pass ratio across all classes after optimally assigning the extra students.

### Example

```
Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
```

## Approach

Adding one guaranteed-pass student to a class increases its ratio by `(pass+1)/(total+1) - pass/total`; this marginal gain shrinks as more students are added to the same class, and is largest for classes with the most room to improve. Use a max-heap keyed by marginal gain, repeatedly assigning one extra student to the class with the current largest gain, `extraStudents` times, then average the final ratios.

## C# Solution

```csharp
public class Solution
{
    public double MaxAverageRatio(int[][] classes, int extraStudents)
    {
        double Gain(int pass, int total) => (double)(pass + 1) / (total + 1) - (double)pass / total;

        var pq = new PriorityQueue<int[], double>();
        foreach (var c in classes) pq.Enqueue(c, -Gain(c[0], c[1]));

        while (extraStudents-- > 0)
        {
            var c = pq.Dequeue();
            c[0]++;
            c[1]++;
            pq.Enqueue(c, -Gain(c[0], c[1]));
        }

        double sum = 0;
        foreach (var c in classes) sum += (double)c[0] / c[1];

        return sum / classes.Length;
    }
}
```

## Complexity

- **Time:** `O((n + extraStudents) log n)`.
- **Space:** `O(n)` for the heap.
