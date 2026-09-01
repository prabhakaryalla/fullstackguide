# 1209. Remove All Adjacent Duplicates in String II

**Difficulty:** Medium
**Category:** String, Stack

## Problem

Given a string `s` and an integer `k`, repeatedly remove `k` adjacent and equal letters until no such removal is possible, and return the resulting string.

### Example

```
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
```

## Approach

Use a stack storing `(character, count)` pairs. For each new character, if it matches the character on top of the stack, increment that entry's count; otherwise push a new entry with count `1`. Whenever a count reaches `k`, pop that entry entirely, since those `k` characters cancel out. After processing the whole string, rebuild the answer by expanding each remaining `(character, count)` pair in order.

## C# Solution

```csharp
public class Solution
{
    public string RemoveDuplicates(string s, int k)
    {
        var stack = new Stack<(char Ch, int Count)>();

        foreach (char c in s)
        {
            if (stack.Count > 0 && stack.Peek().Ch == c)
            {
                var (ch, count) = stack.Pop();
                if (count + 1 < k) stack.Push((ch, count + 1));
            }
            else
            {
                stack.Push((c, 1));
            }
        }

        var sb = new StringBuilder();
        foreach (var (ch, count) in stack.Reverse())
            sb.Append(ch, count);

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `s`.
- **Space:** `O(n)` for the stack.
