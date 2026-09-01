# 1641. Count Sorted Vowel Strings

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Combinatorics

## Problem

Given an integer `n`, return the number of strings of length `n` made only of vowels (`a`, `e`, `i`, `o`, `u`) that are sorted in lexicographical order.

### Example

```
Input: n = 2
Output: 15
```

## Approach

Let `dp[j]` be the number of valid sorted strings of the current length ending exactly with the `j`-th vowel. Building a string of length `len` by appending one more vowel `j` requires the previous last vowel to be `<= j`, so `dp_new[j]` is the prefix sum of `dp_old[0..j]`. Starting from length 1 (`dp = [1,1,1,1,1]`), iterate up to length `n` and sum the final array.

## C# Solution

```csharp
public class Solution
{
    public int CountVowelStrings(int n)
    {
        int[] dp = { 1, 1, 1, 1, 1 };

        for (int len = 2; len <= n; len++)
        {
            int[] next = new int[5];
            int prefixSum = 0;

            for (int j = 0; j < 5; j++)
            {
                prefixSum += dp[j];
                next[j] = prefixSum;
            }

            dp = next;
        }

        int total = 0;
        foreach (int v in dp)
        {
            total += v;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (fixed 5-slot arrays).
