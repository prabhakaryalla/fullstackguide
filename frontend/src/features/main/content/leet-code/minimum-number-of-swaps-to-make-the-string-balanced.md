# 1963. Minimum Number of Swaps to Make the String Balanced

**Difficulty:** Medium
**Category:** String, Stack, Greedy, Two Pointers

## Problem

Given a string `s` of length `2n` made only of `'['` and `']'` with an equal number of each, you may swap any two characters at any positions any number of times. Return the minimum number of swaps needed to make `s` balanced (a valid bracket sequence).

### Example

```
Input: s = "][]["
Output: 1
Explanation: Swap the first ']' with the last '[' to get "[[]]", which is balanced.
```

### Constraints

- `n == s.length / 2`
- `1 <= n <= 10^5`
- `s[i]` is either `'['` or `']'`.
- The number of `'['` equals the number of `']'`.

## Approach

Scan the string maintaining a running balance (increment for `'['`, decrement for `']'`); track the minimum balance reached (most negative). This minimum balance represents the maximum "imbalance depth" of unmatched closing brackets at some prefix. Since each swap can fix two units of imbalance (moving one unmatched `'['` from later in the string to replace an unmatched `']'`), the answer is `ceil(maxImbalance / 2)`, i.e., `(-minBalance + 1) / 2`.

## C# Solution

```csharp
public class Solution
{
    public int MinSwaps(string s)
    {
        int balance = 0;
        int minBalance = 0;

        foreach (char c in s)
        {
            balance += c == '[' ? 1 : -1;
            minBalance = Math.Min(minBalance, balance);
        }

        int maxImbalance = -minBalance;
        return (maxImbalance + 1) / 2;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass through the string.
- **Space:** `O(1)`.
