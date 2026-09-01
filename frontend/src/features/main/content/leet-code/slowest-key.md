# 1629. Slowest Key

**Difficulty:** Easy
**Category:** Array, String

## Problem

A key of some keypad is pressed in a sequence, given by `releaseTimes` and `keysPressed`. The duration of the first key is `releaseTimes[0]`, and for each subsequent key `i`, the duration is `releaseTimes[i] - releaseTimes[i - 1]`. Return the key with the longest duration; break ties by picking the lexicographically largest key.

### Example

```
Input: releaseTimes = [9,29,49,50], keysPressed = "cbcd"
Output: "c"
```

## Approach

Track the best duration and key found so far, starting from the first key. For each subsequent key compute its duration and replace the best if it is strictly longer, or equally long with a lexicographically larger character.

## C# Solution

```csharp
public class Solution
{
    public char SlowestKey(int[] releaseTimes, string keysPressed)
    {
        char best = keysPressed[0];
        int bestDuration = releaseTimes[0];

        for (int i = 1; i < releaseTimes.Length; i++)
        {
            int duration = releaseTimes[i] - releaseTimes[i - 1];

            if (duration > bestDuration || (duration == bestDuration && keysPressed[i] > best))
            {
                bestDuration = duration;
                best = keysPressed[i];
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
