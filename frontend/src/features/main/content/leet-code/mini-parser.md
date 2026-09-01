# 385. Mini Parser

**Difficulty:** Medium
**Category:** Stack, Depth-First Search, String

## Problem

Given a string `s` representing a nested list of integers, deserialize it and return the corresponding `NestedInteger` representation.

### Example

```
Input: s = "[123,[456,[789]]]"
Output: [123,[456,[789]]]
```

### Constraints

- `1 <= s.length <= 5 * 10^4`
- `s` consists of digits, square brackets `"[]"`, a negative sign `'-'`, and commas `','`.
- `s` is guaranteed to be a valid representation of a nested list.

## Approach

Scan the string once, using a stack of `NestedInteger` containers to track nesting depth. Each `[` opens a new list (pushing the current one, if any, onto the stack), and each `,` or `]` closes off the number token accumulated since the last delimiter, adding it to the current list; a `]` also pops back to the parent list and attaches the completed child list to it.

## C# Solution

```csharp
public class Solution
{
    public NestedInteger Deserialize(string s)
    {
        if (s[0] != '[')
            return new NestedInteger(int.Parse(s));

        var stack = new Stack<NestedInteger>();
        NestedInteger current = null;
        int start = 0;

        for (int i = 0; i < s.Length; i++)
        {
            char c = s[i];

            if (c == '[')
            {
                var next = new NestedInteger();
                if (current != null) stack.Push(current);
                current = next;
                start = i + 1;
            }
            else if (c == ',' || c == ']')
            {
                if (i > start)
                {
                    int value = int.Parse(s.Substring(start, i - start));
                    current.Add(new NestedInteger(value));
                }

                start = i + 1;

                if (c == ']' && stack.Count > 0)
                {
                    var completed = current;
                    current = stack.Pop();
                    current.Add(completed);
                }
            }
        }

        return current;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the string.
- **Space:** `O(d)`, where `d` is the maximum nesting depth (for the stack).
