# 1472. Design Browser History

**Difficulty:** Medium
**Category:** Array, Linked List, Stack, Design, Doubly-Linked List, Data Stream

## Problem

Design a browser history system supporting: `Visit(url)` — visit a new page, clearing all forward history; `Back(steps)` — move back up to `steps` pages (clamped to the oldest page); `Forward(steps)` — move forward up to `steps` pages (clamped to the newest page). Each navigation call returns the URL landed on.

### Example

```
Input: ["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"]
[["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]
Output: [null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]
```

## Approach

Maintain the visited history as a list along with a pointer to the current position. Visiting a new URL truncates any "forward" entries beyond the current pointer, then appends the new URL and advances the pointer. `Back` and `Forward` simply move the pointer by the requested number of steps, clamped to the valid range of the list.

## C# Solution

```csharp
public class BrowserHistory
{
    private readonly List<string> history = new();
    private int current;

    public BrowserHistory(string homepage)
    {
        history.Add(homepage);
        current = 0;
    }

    public void Visit(string url)
    {
        history.RemoveRange(current + 1, history.Count - current - 1);
        history.Add(url);
        current++;
    }

    public string Back(int steps)
    {
        current = Math.Max(0, current - steps);
        return history[current];
    }

    public string Forward(int steps)
    {
        current = Math.Min(history.Count - 1, current + steps);
        return history[current];
    }
}
```

## Complexity

- **Time:** `O(1)` amortized for `Back`/`Forward`; `O(k)` for `Visit` where `k` is the number of discarded forward entries.
- **Space:** `O(n)` for the stored history.
