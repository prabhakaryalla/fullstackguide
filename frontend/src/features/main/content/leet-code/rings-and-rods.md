# 2103. Rings and Rods

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

You are given a string `rings` representing colored rings placed on numbered rods. Each pair of characters represents a color (R, G, or B) followed by a rod number (0-9). Return the count of rods that have all three colors on them.

### Example

```
Input: rings = "B0B6G0R6R0R6G9"
Output: 1
Explanation: Rod 0 has all three colors: B, G, R.
```

## Approach

Use a hash map (or array of size 10) to track which colors appear on each rod. For each rod, use a set or bit mask to record colors. After processing all rings, count how many rods have all three colors.

## C# Solution

```csharp
public class Solution
{
    public int CountPoints(string rings)
    {
        var rods = new HashSet<char>[10];
        for (int i = 0; i < 10; i++)
            rods[i] = new HashSet<char>();
        
        for (int i = 0; i < rings.Length; i += 2)
        {
            char color = rings[i];
            int rod = rings[i + 1] - '0';
            rods[rod].Add(color);
        }
        
        int count = 0;
        for (int i = 0; i < 10; i++)
        {
            if (rods[i].Count == 3)
                count++;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of rings
- **Space:** O(1) - fixed size storage for 10 rods
