# 1105. Filling Bookcase Shelves

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given `books[i] = [thickness, height]` in reading order and a bookcase `shelfWidth`, place the books on shelves in order (a shelf's height equals the tallest book placed on it, and its total thickness cannot exceed `shelfWidth`). Return the minimum possible total height of the bookcase.

### Example

```
Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelfWidth = 4
Output: 6
```

## Approach

Use dynamic programming where `dp[i]` is the minimum height needed to shelve the first `i` books. For each `i`, try ending the current shelf at book `i` and extending it backwards through books `j..i` as long as their combined thickness fits `shelfWidth`, tracking the tallest book on that shelf; `dp[i]` is the best of `dp[j - 1] + shelfHeight` over all valid `j`.

## C# Solution

```csharp
public class Solution
{
    public int MinHeightShelves(int[][] books, int shelfWidth)
    {
        int n = books.Length;
        int[] dp = new int[n + 1];

        for (int i = 1; i <= n; i++)
        {
            int width = 0, height = 0;
            dp[i] = int.MaxValue;

            for (int j = i; j >= 1; j--)
            {
                width += books[j - 1][0];
                if (width > shelfWidth) break;
                height = Math.Max(height, books[j - 1][1]);
                dp[i] = Math.Min(dp[i], dp[j - 1] + height);
            }
        }

        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the DP array.
