# 3232. Find if Digit Game Can Be Won

**Difficulty:** Easy
**Category:** Array, Math

## Problem
Alice and Bob play a game with an array of integers. On each turn, a player removes one number from the array: if the removed number has a single digit (less than 10), it's added to that player's score; if it has two digits (10 or greater), it's subtracted from their score instead. Alice goes first, and both players play optimally to maximize their own final score relative to the opponent. Determine whether Alice can guarantee a win.

## Approach
Since both players simply want to maximize their own net contribution (single-digit numbers add positively, double-digit numbers subtract), and turns alternate but the total combined effect summed over all numbers is fixed regardless of who picks what (each number's sign contribution to the overall combined sum is fixed based on whether it's single or double digit), the overall game reduces to a simple parity check: compute the sum where every number less than 10 contributes positively and every number 10 or greater contributes negatively. If this total sum is nonzero, Alice can always force a win by playing optimally to end up ahead; if it's exactly zero, the game is guaranteed to end in a tie, meaning Alice cannot win.

## C# Solution
```csharp
public class Solution {
    public bool CanAliceWin(int[] nums) {
        int total = 0;
        foreach (int num in nums)
            total += num < 10 ? num : -num;
        return total != 0;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
