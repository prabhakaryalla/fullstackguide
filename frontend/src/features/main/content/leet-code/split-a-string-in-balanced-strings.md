# 1221. Split a String in Balanced Strings

**Difficulty:** Easy
**Category:** String, Greedy, Counting

## Problem

A balanced string contains an equal number of `L` and `R` characters. Given a balanced string `s`, split it into the maximum possible number of balanced substrings, and return that maximum count.

### Example

```
Input: s = "RLRRLLRLRL"
Output: 4
```

## Approach

Scan the string while tracking a running balance: add `1` for `R` and subtract `1` for `L` (or vice versa). Whenever the balance returns to zero, the characters seen since the last split form a valid balanced substring, so increment the split count and continue. Since the whole string is balanced, this greedy left-to-right cut always yields the maximum number of pieces.

## C# Solution

```csharp
public class Solution
{
    public int BalancedStringSplit(string s)
    {
        int balance = 0, count = 0;

        foreach (char c in s)
        {
            balance += c == 'L' ? 1 : -1;
            if (balance == 0) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `s`.
- **Space:** `O(1)`.
