# 771. Jewels and Stones

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a string `jewels` representing the types of stones that are jewels, and a string `stones` representing the stones you have, return how many of the stones you have are also jewels.

### Example

```
Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
```

## Approach

Store every jewel character in a hash set for O(1) lookup, then count how many characters in `stones` appear in that set.

## C# Solution

```csharp
public class Solution
{
    public int NumJewelsInStones(string jewels, string stones)
    {
        var jewelSet = new HashSet<char>(jewels);
        int count = 0;

        foreach (var c in stones)
        {
            if (jewelSet.Contains(c)) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(j + s)`.
- **Space:** `O(j)` for the jewel set.
