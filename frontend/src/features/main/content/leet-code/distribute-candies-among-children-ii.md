# 2929. Distribute Candies Among Children II

**Difficulty:** Medium
**Category:** Math, Combinatorics

## Problem

Similar to problem 2928 but with potentially larger values requiring an optimized mathematical approach instead of brute force enumeration.

### Example

```
Input: n = 5, limit = 2
Output: 3
```

## Approach

Use inclusion-exclusion principle with stars and bars. Total unrestricted ways to distribute n candies among 3 children is C(n+2, 2). Subtract cases where at least one child exceeds limit by calculating overcounts.

## C# Solution

```csharp
public class Solution 
{
    public long DistributeCandies(int n, int limit) 
    {
        long total = Combination(n + 2, 2);
        long exceed1 = Combination(n - limit - 1 + 2, 2);
        long exceed2 = Combination(n - 2 * (limit + 1) + 2, 2);
        
        return total - 3 * exceed1 + 3 * exceed2;
    }
    
    private long Combination(int n, int r) 
    {
        if (n < r || n < 0) return 0;
        if (r == 0) return 1;
        
        long result = 1;
        for (int i = 0; i < r; i++) 
        {
            result = result * (n - i) / (i + 1);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
