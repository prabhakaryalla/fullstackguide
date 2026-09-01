# 810. Chalkboard XOR Game

**Difficulty:** Hard
**Category:** Array, Math, Bit Manipulation, Brainteaser, Game Theory

## Problem

Given an array of numbers on a chalkboard, two players alternately erase one number; if erasing a number makes the XOR of all remaining numbers equal `0`, the player who erased it loses (unless the board is empty, in which case that would-be-losing condition doesn't apply and the game already ended in the other player's favor). Assuming both play optimally and Alice goes first, return `true` if Alice wins.

### Example

```
Input: nums = [1,1,2]
Output: false
```

## Approach

This is a classic game-theory result: if the XOR of all numbers is already `0`, Alice wins immediately, because any single number she could erase must be non-zero relative to the rest, and it can be shown the position is favorable to the player about to move. Otherwise, Alice wins if and only if the total count of numbers is even, since with an even count, Bob is eventually forced into the losing position; with an odd count and non-zero XOR, Bob can mirror a winning strategy.

## C# Solution

```csharp
public class Solution
{
    public bool XorGame(int[] nums)
    {
        int xorAll = 0;
        foreach (var num in nums) xorAll ^= num;

        if (xorAll == 0) return true;

        return nums.Length % 2 == 0;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
