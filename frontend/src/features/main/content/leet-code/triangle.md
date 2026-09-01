# 120. Triangle

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given a `triangle` array (a list of rows, each one element longer than the last), return the minimum path sum from top to bottom. Each step may only move to an adjacent number in the row below (same index, or index + 1).

### Example 1

```
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The path 2 -> 3 -> 5 -> 1 has the minimum sum 11.
```

```mermaid
graph TB
    A["2"] --> B["3"]
    B --> D["5"]
    D --> H["1"]
    style A fill:#4caf50,color:#fff
    style B fill:#4caf50,color:#fff
    style D fill:#4caf50,color:#fff
    style H fill:#4caf50,color:#fff
```

### Example 2

```
Input: triangle = [[-10]]
Output: -10
```

### Constraints

- `1 <= triangle.length <= 200`
- `triangle[0].length == 1`
- `triangle[i].length == triangle[i - 1].length + 1`

## Approach

Work bottom-up: start with the last row's values as-is, then for each row above, update each entry to `triangle[row][col] + min(dp[col], dp[col+1])` — the cost of that cell plus the cheaper of the two reachable cells below it. After processing every row, `dp[0]` holds the answer.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTotal(IList<IList<int>> triangle)
    {
        int n = triangle.Count;
        var dp = new int[n];

        for (int i = 0; i < n; i++)
        {
            dp[i] = triangle[n - 1][i];
        }

        for (int row = n - 2; row >= 0; row--)
        {
            for (int col = 0; col <= row; col++)
            {
                dp[col] = triangle[row][col] + Math.Min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
```

## Complexity

- **Time:** `O(n^2)` — total number of triangle entries.
- **Space:** `O(n)` — for the DP array.
