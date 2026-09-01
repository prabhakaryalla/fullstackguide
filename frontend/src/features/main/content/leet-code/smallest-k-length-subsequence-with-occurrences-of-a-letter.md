# 2030. Smallest K-Length Subsequence With Occurrences of a Letter

**Difficulty:** Hard
**Category:** String, Stack, Greedy

## Problem

Given a string `s`, an integer `k`, a letter `letter`, and an integer `repetition`, return *the lexicographically smallest subsequence of `s` of length `k`* that contains `letter` at least `repetition` times. It is guaranteed that at least one valid subsequence exists.

## Approach

This extends the classic "build the smallest subsequence with a monotonic stack" technique (as in *Remove Duplicate Letters*) with an extra constraint on how many times `letter` must appear.

Precompute a suffix count array `suffixCount[i]` = number of occurrences of `letter` in `s[i..n-1]`. Then iterate through `s` while maintaining a stack representing the best subsequence built so far, along with `used`, the count of `letter` currently in the stack:

- While the stack is non-empty, its top character is greater than the current character, there's still enough of the string left to fill the stack to length `k` if we pop (`stack.Count - 1 + (n - i) >= k`), and popping wouldn't make it impossible to still reach `repetition` occurrences of `letter` (only relevant if the top is `letter`: `used - 1 + suffixCount[i] >= repetition`), pop the stack.
- If there's still room (`stack.Count < k`): always push the current character if it equals `letter` (it helps satisfy the requirement); otherwise, only push it if there's still enough remaining capacity to fit all the still-needed occurrences of `letter` later (`k - stack.Count - 1 >= repetition - used`).

## C# Solution

```csharp
public class Solution
{
    public string SmallestSubsequence(string s, int k, char letter, int repetition)
    {
        int n = s.Length;
        var suffixCount = new int[n + 1];
        for (int i = n - 1; i >= 0; i--)
            suffixCount[i] = suffixCount[i + 1] + (s[i] == letter ? 1 : 0);

        var stack = new List<char>();
        int used = 0;

        for (int i = 0; i < n; i++)
        {
            char c = s[i];

            while (stack.Count > 0 &&
                   stack[^1] > c &&
                   (stack.Count - 1 + (n - i)) >= k &&
                   (stack[^1] != letter || used - 1 + suffixCount[i] >= repetition))
            {
                if (stack[^1] == letter) used--;
                stack.RemoveAt(stack.Count - 1);
            }

            if (stack.Count < k)
            {
                if (c == letter)
                {
                    stack.Add(c);
                    used++;
                }
                else if (k - stack.Count - 1 >= repetition - used)
                {
                    stack.Add(c);
                }
            }
        }

        return new string(stack.ToArray());
    }
}
```

## Complexity

- **Time:** `O(n)` amortized — each character is pushed and popped from the stack at most once.
- **Space:** `O(n)` for the suffix count array and the stack.
