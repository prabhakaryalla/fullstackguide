# 1996. The Number of Weak Characters in the Game

**Difficulty:** Medium
**Category:** Array, Stack, Greedy, Sorting, Monotonic Stack

## Problem

Given `properties[i] = [attack, defense]` for each character, a character is "weak" if there exists another character with strictly greater attack AND strictly greater defense. Return the number of weak characters.

### Example

```
Input: properties = [[5,5],[6,3],[3,6]]
Output: 0
Explanation: No character is strictly dominated in both attributes by another.
```

### Constraints

- `2 <= properties.length <= 10^5`
- `properties[i].length == 2`
- `1 <= attacki, defensei <= 10^5`

## Approach

Sort characters by attack ascending; for equal attack values, sort by defense descending (this ensures that when scanning left to right, characters with the same attack never incorrectly count each other as dominating, since only a strictly greater attack should count, and processing equal-attack groups together with descending defense prevents false-positive domination within the same attack tier). Then scan from right to left tracking the maximum defense seen so far among strictly higher-attack characters; a character is weak if its defense is less than that running maximum.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfWeakCharacters(int[][] properties)
    {
        Array.Sort(properties, (a, b) =>
        {
            if (a[0] != b[0]) return a[0] - b[0];
            return b[1] - a[1];
        });

        int n = properties.Length;
        int maxDefense = 0;
        int weakCount = 0;

        for (int i = n - 1; i >= 0; i--)
        {
            if (properties[i][1] < maxDefense)
            {
                weakCount++;
            }
            else
            {
                maxDefense = properties[i][1];
            }
        }

        return weakCount;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(log n)` to `O(n)` depending on the sort implementation.
