# 546. Remove Boxes

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Memoization

## Problem

Given an array `boxes` where `boxes[i]` represents the color of the `i`th box, remove boxes to maximize points: removing `k` continuous boxes with the same color earns `k * k` points. Return the maximum points obtainable.

### Example

```
Input: boxes = [1,3,2,2,2,3,4,3,1]
Output: 23
```

### Constraints

- `1 <= boxes.length <= 100`
- `1 <= boxes[i] <= 100`

## Approach

Use memoized recursion over `(left, right, streak)`, where `streak` is the number of boxes of the same color as `boxes[right]` that have already been merged onto the right end (from earlier removals). First, extend `right` leftward over any boxes matching its own color, folding them into `streak`. Then compare two options: remove this merged group immediately (scoring `(streak+1)^2` plus the best result on the remaining left segment), or find an earlier box of the same color within the segment and remove everything between them first, allowing the two same-colored groups to merge into an even larger streak for a potentially bigger payoff.

## C# Solution

```csharp
public class Solution
{
    public int RemoveBoxes(int[] boxes)
    {
        int n = boxes.Length;
        var memo = new int[n, n, n];
        return Dfs(boxes, 0, n - 1, 0, memo);
    }

    private int Dfs(int[] boxes, int left, int right, int streak, int[,,] memo)
    {
        if (left > right) return 0;
        if (memo[left, right, streak] != 0) return memo[left, right, streak];

        int adjustedRight = right;
        int adjustedStreak = streak;

        while (adjustedRight > left && boxes[adjustedRight] == boxes[adjustedRight - 1])
        {
            adjustedRight--;
            adjustedStreak++;
        }

        int best = (adjustedStreak + 1) * (adjustedStreak + 1) + Dfs(boxes, left, adjustedRight - 1, 0, memo);

        for (int i = left; i < adjustedRight; i++)
        {
            if (boxes[i] == boxes[adjustedRight])
            {
                best = Math.Max(best, Dfs(boxes, left, i, adjustedStreak + 1, memo) + Dfs(boxes, i + 1, adjustedRight - 1, 0, memo));
            }
        }

        memo[left, right, streak] = best;
        return best;
    }
}
```

## Complexity

- **Time:** `O(n^4)`.
- **Space:** `O(n^3)` for the memoization table.
