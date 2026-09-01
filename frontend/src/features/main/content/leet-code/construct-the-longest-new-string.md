# 2745. Construct the Longest New String

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Greedy

## Problem

You are given three integers `x`, `y`, and `z`. You have x strings equal to "AA", y strings equal to "BB", and z strings equal to "CC".

You want to concatenate these strings to form a new string without having three consecutive equal characters.

Return the maximum possible length of the new string.

### Example

```
Input: x = 2, y = 5, z = 1
Output: 12
Explanation: One optimal string is "AABBBBCCAABB" with length 12.

Input: x = 3, y = 2, z = 2
Output: 14
Explanation: One optimal string could be "AABBCCAABBCCAA".
```

## Approach

Key observations:
1. Each string contributes 2 to the length
2. "AA" can be followed by "BB" or "CC"
3. "BB" can be followed by "AA" or "CC"
4. "CC" can be followed by "AA" or "BB"

Strategy: Try to balance the usage to avoid three consecutive. Use dynamic programming or greedy approach based on the counts.

Special case: If one type dominates heavily, we might not be able to use all pieces.

## C# Solution

```csharp
public class Solution 
{
    public int LongestString(int x, int y, int z) 
    {
        if (x == y)
        {
            return (x + y + z) * 2;
        }
        else if (x < y)
        {
            return (2 * x + 1 + z) * 2;
        }
        else
        {
            return (2 * y + 1 + z) * 2;
        }
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
