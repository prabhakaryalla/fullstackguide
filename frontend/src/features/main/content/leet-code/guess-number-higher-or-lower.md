# 374. Guess Number Higher or Lower

**Difficulty:** Easy
**Category:** Binary Search, Interactive

## Problem

A number is picked between `1` and `n`. Guess it using calls to `guess(num)`, which returns `-1` if the pick is lower, `1` if higher, and `0` if you guessed correctly. Return the number that was picked.

### Example

```
Input: n = 10, pick = 6
Output: 6
```

### Constraints

- `1 <= n <= 2^31 - 1`
- `1 <= pick <= n`

## Approach

Binary search the range `[1, n]`: guess the midpoint, and narrow the search range based on the sign returned by `guess`, halving the search space each time until the exact match is found.

## C# Solution

```csharp
public class Solution : GuessGame
{
    public int GuessNumber(int n)
    {
        int left = 1, right = n;
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            int result = guess(mid);

            if (result == 0) return mid;
            if (result < 0) right = mid - 1;
            else left = mid + 1;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
