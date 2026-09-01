# 1535. Find the Winner of an Array Game

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

Given an integer array `arr` of distinct values and an integer `k`, simulate a game where the first two elements are compared: the larger stays at the front and the smaller moves to the end of the array. The winner of a round is the element that stayed. The game ends once some element has won `k` consecutive rounds; return that element. If `k >= arr.Length - 1`, the game effectively runs until the overall maximum has beaten everyone.

### Example

```
Input: arr = [2,1,3,5,4,6,7], k = 2
Output: 5
```

## Approach

Simulate directly rather than physically rotating the array: track the `current` champion (starting as `arr[0]`) and a `winStreak` counter. Walk through the rest of the array; each time the champion beats the next challenger, increment the streak (returning early if it reaches `k`); otherwise the challenger becomes the new champion and the streak resets to 1. If `k` is at least `n - 1`, the loop naturally terminates with the global maximum as champion without ever reaching a streak of `k`, so track the maximum as a fallback.

## C# Solution

```csharp
public class Solution
{
    public int GetWinner(int[] arr, int k)
    {
        int current = arr[0];
        int winStreak = 0;

        for (int i = 1; i < arr.Length; i++)
        {
            if (arr[i] > current)
            {
                current = arr[i];
                winStreak = 1;
            }
            else
            {
                winStreak++;
            }

            if (winStreak == k)
            {
                return current;
            }
        }

        return current;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
