# 2998. Minimum Number of Operations to Make X and Y Equal

**Difficulty:** Medium
**Category:** Math, Breadth-First Search, Memoization

## Problem

You are given two positive integers `x` and `y`. You can perform these operations on `x`:
1. Divide by 11 (if divisible)
2. Divide by 5 (if divisible)
3. Decrement by 1
4. Increment by 1

Return the minimum number of operations to make `x` equal to `y`.

### Example

```
Input: x = 26, y = 1
Output: 3
Explanation: 26 -> 25 (decrement) -> 5 (divide by 5) -> 1 (divide by 5)

Input: x = 54, y = 2
Output: 4
```

## Approach

Use BFS to explore all reachable values from `x`. For each value, try all four operations. Track visited states to avoid cycles. Return the number of steps when reaching `y`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperationsToMakeEqual(int x, int y)
    {
        if (x <= y) return y - x;

        var queue = new Queue<(int val, int steps)>();
        var visited = new HashSet<int>();
        queue.Enqueue((x, 0));
        visited.Add(x);

        while (queue.Count > 0)
        {
            var (current, steps) = queue.Dequeue();

            if (current == y) return steps;

            // Try all operations
            var nextValues = new List<int>();

            if (current % 11 == 0) nextValues.Add(current / 11);
            if (current % 5 == 0) nextValues.Add(current / 5);
            nextValues.Add(current - 1);
            nextValues.Add(current + 1);

            foreach (var next in nextValues)
            {
                if (next >= 0 && next <= 10000 && !visited.Contains(next))
                {
                    visited.Add(next);
                    queue.Enqueue((next, steps + 1));
                }
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** O(max(x, y)) in worst case
- **Space:** O(max(x, y)) for visited set
