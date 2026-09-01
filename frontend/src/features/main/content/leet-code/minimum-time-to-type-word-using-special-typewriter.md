# 1974. Minimum Time to Type Word Using Special Typewriter

**Difficulty:** Easy
**Category:** String, Greedy

## Problem

A special typewriter has a pointer starting at `'a'` on a circular alphabet dial; each second you may move the pointer one step clockwise or counter-clockwise, or type the letter currently under the pointer (1 second). Given a string `word`, return the minimum time to type it in order.

### Example

```
Input: word = "abc"
Output: 5
Explanation: Type 'a' (1s), move to 'b' (1s), type 'b' (1s), move to 'c' (1s), type 'c' (1s) = 5 seconds.
```

### Constraints

- `1 <= word.length <= 100`
- `word` consists of lowercase English letters.

## Approach

Track the current pointer position starting at `'a'`. For each character in `word`, compute the clockwise distance `d = |current - target|` and the minimum rotation cost as `min(d, 26 - d)` (whichever direction is shorter around the circular dial), add `1` for typing, and update the current position to the new character. Sum this over the whole word.

## C# Solution

```csharp
public class Solution
{
    public int MinTimeToType(string word)
    {
        int current = 'a' - 'a';
        int totalTime = 0;

        foreach (char c in word)
        {
            int target = c - 'a';
            int diff = Math.Abs(target - current);
            int moveCost = Math.Min(diff, 26 - diff);
            totalTime += moveCost + 1;
            current = target;
        }

        return totalTime;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the word.
- **Space:** `O(1)`.
