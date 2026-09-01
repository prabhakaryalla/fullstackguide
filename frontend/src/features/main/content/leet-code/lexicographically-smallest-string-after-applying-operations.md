# 1625. Lexicographically Smallest String After Applying Operations

**Difficulty:** Medium
**Category:** String, Backtracking, Breadth-First Search

## Problem

Given a string `s` of even-length digits and integers `a` and `b`, you may repeatedly: (1) add `a` to every digit at an odd index, wrapping mod 10, or (2) rotate `s` to the right by `b` positions. Return the lexicographically smallest string reachable via any sequence of these operations.

### Example

```
Input: s = "5525", a = 9, b = 2
Output: "2050"
```

## Approach

Since both operations are deterministic and reversible into a finite state space (at most 10 possible digit-add phases times the string length possible rotations), explore all reachable strings with a BFS from `s`, applying both operations to each discovered state and tracking the lexicographically smallest string seen using a visited set to avoid revisiting states.

## C# Solution

```csharp
public class Solution
{
    public string FindLexSmallestString(string s, int a, int b)
    {
        HashSet<string> visited = new HashSet<string>();
        Queue<string> queue = new Queue<string>();
        queue.Enqueue(s);
        visited.Add(s);
        string best = s;

        while (queue.Count > 0)
        {
            string current = queue.Dequeue();

            if (string.CompareOrdinal(current, best) < 0)
            {
                best = current;
            }

            string added = Add(current, a);
            string rotated = Rotate(current, b);

            foreach (string next in new[] { added, rotated })
            {
                if (visited.Add(next))
                {
                    queue.Enqueue(next);
                }
            }
        }

        return best;
    }

    private string Add(string s, int a)
    {
        char[] chars = s.ToCharArray();

        for (int i = 1; i < chars.Length; i += 2)
        {
            int digit = (chars[i] - '0' + a) % 10;
            chars[i] = (char)('0' + digit);
        }

        return new string(chars);
    }

    private string Rotate(string s, int b)
    {
        int n = s.Length;
        b %= n;
        return s.Substring(n - b) + s.Substring(0, n - b);
    }
}
```

## Complexity

- **Time:** `O(n * 10 * n)` bounded states, each requiring `O(n)` work.
- **Space:** `O(10 * n * n)` for the visited set of strings.
