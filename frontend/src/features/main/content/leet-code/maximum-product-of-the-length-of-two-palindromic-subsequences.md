# 2002. Maximum Product of the Length of Two Palindromic Subsequences

**Difficulty:** Medium
**Category:** Bit Manipulation, String, Dynamic Programming, Backtracking, Bitmask

## Problem

Given a string `s`, find two **disjoint** palindromic subsequences (they must not share any character index) of `s` such that the product of their lengths is maximized. Return *the maximum possible product of the lengths of the two palindromic subsequences*.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

### Example

```
Input: s = "leetcodecom"
Output: 9
Explanation: An optimal choice is "ete" (length 3) and "cdc" (length 3)... 
Better still, choosing "eeee" and "cdc" style disjoint palindromes can reach a product of 9 for well-chosen inputs.
```

## Approach

Because `1 <= s.length <= 12`, every subset of character indices can be represented as a bitmask (at most `2^12 = 4096` masks). Precompute two arrays over all masks: `popCount[mask]` (number of set bits) and `isPalindrome[mask]` (whether the subsequence formed by picking exactly the indices in `mask`, in order, reads the same forwards and backwards — checked with a two-pointer scan over the set bits).

Then, for every mask `m1` that is a palindrome, enumerate every submask `m2` of its complement `(~m1) & full` using the standard "iterate submasks" trick. If `m2` is also a palindrome, the two subsequences are disjoint by construction, so update the best answer with `popCount[m1] * popCount[m2]`. Enumerating all (mask, submask-of-complement) pairs costs `O(3^n)`, which is fast for `n <= 12`.

## C# Solution

```csharp
public class Solution
{
    public int MaxProduct(string s)
    {
        int n = s.Length;
        int full = 1 << n;
        var isPalindrome = new bool[full];
        var popCount = new int[full];

        for (int mask = 1; mask < full; mask++)
        {
            popCount[mask] = System.Numerics.BitOperations.PopCount((uint)mask);
            isPalindrome[mask] = IsPalindromeSubsequence(s, mask, n);
        }

        int best = 0;
        for (int mask1 = 1; mask1 < full; mask1++)
        {
            if (!isPalindrome[mask1]) continue;

            int complement = (full - 1) ^ mask1;
            for (int mask2 = complement; mask2 > 0; mask2 = (mask2 - 1) & complement)
            {
                if (isPalindrome[mask2])
                    best = Math.Max(best, popCount[mask1] * popCount[mask2]);
            }
        }

        return best;
    }

    private bool IsPalindromeSubsequence(string s, int mask, int n)
    {
        int left = 0, right = n - 1;
        while (left < right)
        {
            while (left < right && (mask & (1 << left)) == 0) left++;
            while (left < right && (mask & (1 << right)) == 0) right--;

            if (left < right)
            {
                if (s[left] != s[right]) return false;
                left++;
                right--;
            }
        }
        return true;
    }
}
```

## Complexity

- **Time:** `O(3^n + n * 2^n)` where `n = s.Length <= 12`.
- **Space:** `O(2^n)` for the precomputed arrays.
