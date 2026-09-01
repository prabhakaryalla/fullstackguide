nd c# 2515. Shortest Distance to Target String in a Circular Array

**Difficulty:** Easy
**Category:** Array, String

## Problem

You are given a circular array of strings `words` and a string `target`. A circular array means that the end of the array connects back to the beginning.

You are also given an integer `startIndex` indicating the starting position in the array. Starting from `startIndex`, you can move one step at a time clockwise or counterclockwise.

Return the shortest distance needed to reach the string `target`. If `target` does not exist in `words`, return -1.

### Example

```
Input: words = ["hello","i","am","leetcode","hello"], target = "hello", startIndex = 1
Output: 1
Explanation: Start at index 1 and move one step clockwise to reach "hello" at index 2.
```

## Approach

Find all occurrences of the target string. For each occurrence, calculate the circular distance from the start index (considering both clockwise and counterclockwise paths). Return the minimum distance found.

## C# Solution

```csharp
public class Solution
{
    public int ClosetTarget(string[] words, string target, int startIndex)
    {
        int n = words.Length;
        int minDist = int.MaxValue;
        
        for (int i = 0; i < n; i++)
        {
            if (words[i] == target)
            {
                int clockwise = (i - startIndex + n) % n;
                int counterClockwise = (startIndex - i + n) % n;
                minDist = Math.Min(minDist, Math.Min(clockwise, counterClockwise));
            }
        }
        
        return minDist == int.MaxValue ? -1 : minDist;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of words array
- **Space:** O(1)
