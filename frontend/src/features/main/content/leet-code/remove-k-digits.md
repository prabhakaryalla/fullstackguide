# 402. Remove K Digits

**Difficulty:** Medium
**Category:** String, Stack, Greedy, Monotonic Stack

## Problem

Given a string `num` representing a non-negative integer and an integer `k`, remove `k` digits from `num` so that the remaining number is the smallest possible, and return it as a string (with no leading zeros, unless the result is `"0"`).

### Example

```
Input: num = "1432219", k = 3
Output: "1219"
```

### Constraints

- `1 <= k <= num.length <= 10^5`
- `num` consists of only digits.
- `num` does not have any leading zeros except for the zero itself.

## Approach

Use a monotonic increasing stack: scan digits left to right, and while the stack's top digit is greater than the current one and removals remain, pop it (removing a larger digit earlier always helps make a smaller number). Push the current digit, then trim any leftover removals from the end and strip leading zeros from the result.

## C# Solution

```csharp
public class Solution
{
    public string RemoveKdigits(string num, int k)
    {
        var stack = new Stack<char>();

        foreach (var c in num)
        {
            while (k > 0 && stack.Count > 0 && stack.Peek() > c)
            {
                stack.Pop();
                k--;
            }

            stack.Push(c);
        }

        while (k > 0 && stack.Count > 0)
        {
            stack.Pop();
            k--;
        }

        var digits = stack.ToArray();
        Array.Reverse(digits);

        var result = new string(digits).TrimStart('0');
        return result.Length == 0 ? "0" : result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each digit is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
