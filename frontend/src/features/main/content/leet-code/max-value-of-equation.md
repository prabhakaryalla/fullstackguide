# 1499. Max Value of Equation

**Difficulty:** Hard
**Category:** Array, Queue, Sliding Window, Heap (Priority Queue), Monotonic Queue

## Problem

Given `points` sorted by increasing `x`-coordinate and an integer `k`, find the maximum value of `yi + yj + |xi - xj|` over all pairs `i < j` with `xj - xi <= k`.

### Example

```
Input: points = [[1,3],[2,0],[5,10],[6,-10]], k = 1
Output: 4
```

## Approach

Since points are sorted by `x` and `i < j`, `|xi - xj| = xj - xi`, so the expression becomes `(yi - xi) + (yj + xj)`. For each point `j`, the best partner `i` within the window `xj - xi <= k` is the one maximizing `yi - xi`. Maintain a monotonically decreasing deque of `(x, yi - xi)` pairs: drop entries that fall outside the current window from the front, use the front (maximum `y - x`) to compute a candidate answer, then push the current point's `y - x` value after evicting any smaller-or-equal entries from the back.

## C# Solution

```csharp
public class Solution
{
    public int FindMaxValueOfEquation(int[][] points, int k)
    {
        var deque = new LinkedList<(int X, int Val)>();
        int best = int.MinValue;

        foreach (var p in points)
        {
            int x = p[0], y = p[1];

            while (deque.Count > 0 && x - deque.First.Value.X > k)
                deque.RemoveFirst();

            if (deque.Count > 0)
                best = Math.Max(best, deque.First.Value.Val + y + x);

            int curVal = y - x;
            while (deque.Count > 0 && deque.Last.Value.Val <= curVal)
                deque.RemoveLast();

            deque.AddLast((x, curVal));
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)` — each point enters and leaves the deque at most once.
- **Space:** `O(n)` for the deque.
