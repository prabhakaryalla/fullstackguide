# 3247. Number of Subsequences with Odd Sum

**Difficulty:** Medium
**Category:** Array, Combinatorics, Dynamic Programming, Math

## Problem
Given an integer array, count the number of non-empty subsequences whose sum is odd. Return the answer modulo `10^9 + 7`.

## Approach
Track two running counts as you process the array left to right: `even`, the number of subsequences formed so far (from the elements processed) with an even sum, and `odd`, the number with an odd sum. For each new number: if it's even, appending it to any existing subsequence doesn't change that subsequence's parity, and the number itself alone forms a new even-sum subsequence, so `even` becomes `2*even + 1` and `odd` becomes `2*odd`. If the number is odd, appending it flips the parity of every existing subsequence, and the number itself alone forms a new odd-sum subsequence, so the new `odd` becomes `odd + even + 1` and the new `even` becomes `even + odd` (using the pre-update values consistently). After processing all elements, the answer is the final `odd` count.

## C# Solution
```csharp
public class Solution {
    public int SubsequenceCount(int[] nums) {
        const int kMod = 1_000_000_007;
        long even = 0;
        long odd = 0;

        foreach (int num in nums) {
            if (num % 2 == 0) {
                even = (even + even + 1) % kMod;
                odd = (odd + odd) % kMod;
            } else {
                long newEven = (even + odd) % kMod;
                odd = (odd + even + 1) % kMod;
                even = newEven;
            }
        }

        return (int)(odd % kMod);
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
