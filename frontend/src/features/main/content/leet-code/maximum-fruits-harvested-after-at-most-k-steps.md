# 2106. Maximum Fruits Harvested After at Most K Steps

**Difficulty:** Hard
**Category:** Array, Sliding Window, Prefix Sum

## Problem

You stand at position `startPos` on an infinite number line. There are fruits at various positions. You can take at most `k` steps (left or right) and want to collect the maximum number of fruits.

### Example

```
Input: fruits = [[2,8],[6,3],[8,6]], startPos = 5, k = 4
Output: 9
Explanation: Move from 5 to 2 (3 left), then to 6 (4 right) = 7 steps exceeds k.
Best: go to position 2 and back to 8, collecting 8+6=14 fruits (6 steps).
```

## Approach

For any strategy, either go left first then right, or right first then left. For each case, enumerate how far to go in one direction (0 to k), compute steps needed, and check if remaining steps allow reaching positions in the other direction. Use prefix sums for efficient fruit counting.

## C# Solution

```csharp
public class Solution
{
    public int MaxTotalFruits(int[][] fruits, int startPos, int k)
    {
        var dict = new Dictionary<int, int>();
        foreach (var f in fruits)
            dict[f[0]] = f[1];
        
        int maxFruits = 0;
        
        // Try going left first
        for (int leftDist = 0; leftDist <= k; leftDist++)
        {
            int leftPos = startPos - leftDist;
            int remaining = k - leftDist * 2;
            if (remaining < 0) break;
            int rightPos = startPos + remaining;
            int sum = 0;
            foreach (var f in fruits)
            {
                if (f[0] >= leftPos && f[0] <= rightPos)
                    sum += f[1];
            }
            maxFruits = Math.Max(maxFruits, sum);
        }
        
        // Try going right first
        for (int rightDist = 0; rightDist <= k; rightDist++)
        {
            int rightPos = startPos + rightDist;
            int remaining = k - rightDist * 2;
            if (remaining < 0) break;
            int leftPos = startPos - remaining;
            int sum = 0;
            foreach (var f in fruits)
            {
                if (f[0] >= leftPos && f[0] <= rightPos)
                    sum += f[1];
            }
            maxFruits = Math.Max(maxFruits, sum);
        }
        
        return maxFruits;
    }
}
```

## Complexity

- **Time:** O(k * n) where n is the number of fruit positions
- **Space:** O(n)
