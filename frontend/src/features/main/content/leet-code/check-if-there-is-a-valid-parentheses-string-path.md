# 2267. Check if There Is a Valid Parentheses String Path

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Matrix

## Problem

A parentheses string is valid if it is empty, "("+valid+")", or valid+valid. Given an `m x n` matrix of parentheses, return true if there is a valid parentheses path from the top-left to bottom-right, moving only right or down.

### Example

```
Input: grid = [["(","(","("],[")","(",")"],["(","(",")"],["(","(",")"]]
Output: true
```

## Approach

Use dynamic programming with memoization. Track the current position and the balance (open - close count). A path is valid if it ends at the destination with balance 0, and the balance never goes negative during the path.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<(int, int, int), bool> memo;
    private char[][] grid;
    private int m, n;
    
    public bool HasValidPath(char[][] grid)
    {
        this.grid = grid;
        m = grid.Length;
        n = grid[0].Length;
        memo = new Dictionary<(int, int, int), bool>();
        
        if ((m + n - 1) % 2 == 1 || grid[0][0] == ')' || grid[m - 1][n - 1] == '(')
        {
            return false;
        }
        
        return Dfs(0, 0, 0);
    }
    
    private bool Dfs(int r, int c, int balance)
    {
        if (balance < 0 || balance > m + n - r - c - 1) return false;
        
        if (r == m - 1 && c == n - 1) return balance == 0;
        
        var key = (r, c, balance);
        if (memo.ContainsKey(key)) return memo[key];
        
        int newBalance = balance + (grid[r][c] == '(' ? 1 : -1);
        bool result = false;
        
        if (r + 1 < m) result |= Dfs(r + 1, c, newBalance);
        if (!result && c + 1 < n) result |= Dfs(r, c + 1, newBalance);
        
        memo[key] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(m * n * (m + n))
- **Space:** O(m * n * (m + n))
