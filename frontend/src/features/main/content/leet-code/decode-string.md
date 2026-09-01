# 394. Decode String

**Difficulty:** Medium
**Category:** Stack, String, Recursion

## Problem

Given an encoded string in the form `k[encoded_string]` (where the encoded string inside brackets is repeated exactly `k` times), return its decoded string. The encoding can be nested.

### Example

```
Input: s = "3[a2[c]]"
Output: "accaccacc"
```

### Constraints

- `1 <= s.length <= 30`
- `s` consists of lowercase English letters, digits, and square brackets `'[]'`.
- `s` is guaranteed to be a valid input.

## Approach

Use two stacks: one for pending repeat counts and one for the string built so far before each `[`. On `[`, push the current count and string, and start a fresh string; on `]`, pop the count and prior string, and append the just-built segment repeated that many times onto the prior string. Digits accumulate into the current count, and other characters append directly to the current string.

## C# Solution

```csharp
public class Solution
{
    public string DecodeString(string s)
    {
        var countStack = new Stack<int>();
        var stringStack = new Stack<StringBuilder>();
        var current = new StringBuilder();
        int count = 0;

        foreach (var c in s)
        {
            if (char.IsDigit(c))
            {
                count = count * 10 + (c - '0');
            }
            else if (c == '[')
            {
                countStack.Push(count);
                stringStack.Push(current);
                count = 0;
                current = new StringBuilder();
            }
            else if (c == ']')
            {
                var repeat = countStack.Pop();
                var previous = stringStack.Pop();
                for (int i = 0; i < repeat; i++)
                    previous.Append(current);

                current = previous;
            }
            else
            {
                current.Append(c);
            }
        }

        return current.ToString();
    }
}
```

## Complexity

- **Time:** `O(m)`, where `m` is the length of the final decoded string.
- **Space:** `O(m)` for the stacks and output.
