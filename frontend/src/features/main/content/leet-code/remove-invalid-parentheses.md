# 301. Remove Invalid Parentheses

**Difficulty:** Hard
**Category:** String, Backtracking, Breadth-First Search

## Problem

Given a string `s` that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid. Return all the possible results in any order.

### Example

```
Input: s = "()())()"
Output: ["(())()","()()()"]
```

### Constraints

- `1 <= s.length <= 25`
- `s` consists of lowercase English letters and parentheses `'('` and `')'`.
- There will be at most `20` parentheses in `s`.

## Approach

Use breadth-first search over strings reachable by deleting one parenthesis at a time. Explore level by level (by number of deletions); the first level containing valid strings has the minimum number of removals, so collect every valid string found at that level and stop.

## C# Solution

```csharp
public class Solution
{
    public IList<string> RemoveInvalidParentheses(string s)
    {
        var result = new List<string>();
        var visited = new HashSet<string> { s };
        var queue = new Queue<string>();
        queue.Enqueue(s);
        bool found = false;

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            for (int i = 0; i < levelSize; i++)
            {
                var current = queue.Dequeue();
                if (IsValid(current))
                {
                    result.Add(current);
                    found = true;
                }

                if (found) continue;

                for (int j = 0; j < current.Length; j++)
                {
                    if (current[j] != '(' && current[j] != ')') continue;

                    var next = current.Remove(j, 1);
                    if (visited.Add(next))
                        queue.Enqueue(next);
                }
            }

            if (found) break;
        }

        return result;
    }

    private bool IsValid(string s)
    {
        int balance = 0;
        foreach (var c in s)
        {
            if (c == '(') balance++;
            else if (c == ')')
            {
                balance--;
                if (balance < 0) return false;
            }
        }

        return balance == 0;
    }
}
```

## Complexity

- **Time:** `O(2^n)` in the worst case, since each level can branch into many candidate strings.
- **Space:** `O(2^n)` for the visited set and queue.
