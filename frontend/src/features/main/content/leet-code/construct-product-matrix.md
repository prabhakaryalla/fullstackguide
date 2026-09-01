# 2906. Construct Product Matrix

**Difficulty:** Medium
**Category:** Array, Matrix

## Problem

You are given a matrix `grid`. Construct a product matrix `p` where `p[i][j]` equals the product of all elements in `grid` except `grid[i][j]`, modulo 12345.

### Example

```
Input: grid = [[1,2],[3,4]]
Output: [[24,12],[8,6]]
Explanation: p[0][0] = 2*3*4 = 24, p[0][1] = 1*3*4 = 12, etc.
```

## Approach

Calculate the total product of all elements, then for each cell divide by that cell's value. Handle zeros specially: if multiple zeros exist, all cells become 0. If exactly one zero exists, only its position gets the product of all other elements.

## C# Solution

```csharp
public class Solution 
{
    public int[][] ConstructProductMatrix(int[][] grid) 
    {
        const int MOD = 12345;
        int m = grid.Length, n = grid[0].Length;
        int[][] result = new int[m][];
        
        for (int i = 0; i < m; i++) 
        {
            result[i] = new int[n];
        }
        
        long totalProduct = 1;
        int zeroCount = 0;
        int zeroRow = -1, zeroCol = -1;
        
        for (int i = 0; i < m; i++) 
        {
            for (int j = 0; j < n; j++) 
            {
                if (grid[i][j] == 0) 
                {
                    zeroCount++;
                    zeroRow = i;
                    zeroCol = j;
                } 
                else 
                {
                    totalProduct = (totalProduct * grid[i][j]) % MOD;
                }
            }
        }
        
        if (zeroCount > 1) 
        {
            return result;
        }
        
        if (zeroCount == 1) 
        {
            result[zeroRow][zeroCol] = (int)totalProduct;
            return result;
        }
        
        for (int i = 0; i < m; i++) 
        {
            for (int j = 0; j < n; j++) 
            {
                result[i][j] = (int)((totalProduct * ModInverse(grid[i][j], MOD)) % MOD);
            }
        }
        
        return result;
    }
    
    private long ModInverse(long a, long mod) 
    {
        return ModPow(a, mod - 2, mod);
    }
    
    private long ModPow(long baseNum, long exp, long mod) 
    {
        long result = 1;
        baseNum %= mod;
        while (exp > 0) 
        {
            if ((exp & 1) == 1) result = (result * baseNum) % mod;
            baseNum = (baseNum * baseNum) % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(m * n * log MOD)
- **Space:** O(m * n)
