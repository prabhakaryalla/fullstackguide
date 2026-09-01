# 1725. Number Of Rectangles That Can Form The Largest Square

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an array `rectangles` where `rectangles[i] = [li, wi]`, each rectangle can be cut down into the largest possible square of side `min(li, wi)`. Return the number of rectangles that can produce the largest such square among all of them.

### Example

```
Input: rectangles = [[5,8],[3,9],[5,12],[16,5]]
Output: 3
```

## Approach

For each rectangle compute the achievable square side `min(l, w)`. Track the maximum side seen so far and how many rectangles achieve it, resetting the count whenever a strictly larger side is found.

## C# Solution

```csharp
public class Solution
{
    public int CountGoodRectangles(int[][] rectangles)
    {
        int maxSide = 0, count = 0;

        foreach (var r in rectangles)
        {
            int side = Math.Min(r[0], r[1]);
            if (side > maxSide)
            {
                maxSide = side;
                count = 1;
            }
            else if (side == maxSide)
            {
                count++;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
