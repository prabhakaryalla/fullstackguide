# 2928. Distribute Candies Among Children I

**Difficulty:** Easy
**Category:** Math, Enumeration

## Problem

You have `n` candies and want to distribute them among 3 children such that no child gets more than `limit` candies. Return the number of ways to distribute the candies.

### Example

```
Input: n = 5, limit = 2
Output: 3
Explanation: (2,2,1), (2,1,2), (1,2,2).
```

## Approach

Use three nested loops to enumerate all possible distributions (a, b, c) where a + b + c = n and each value is <= limit. Count valid combinations.

## C# Solution

```csharp
public class Solution 
{
    public int DistributeCandies(int n, int limit) 
    {
        int count = 0;
        
        for (int a = 0; a <= Math.Min(n, limit); a++) 
        {
            for (int b = 0; b <= Math.Min(n - a, limit); b++) 
            {
                int c = n - a - b;
                if (c >= 0 && c <= limit) 
                {
                    count++;
                }
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(limit^2)
- **Space:** O(1)
