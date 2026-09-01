# 2851. String Transformation

**Difficulty:** Hard
**Category:** Dynamic Programming, String

## Problem

You are given two strings `s` and `t` of equal length `n`. You can perform the following operation on string `s` any number of times:
- Remove a suffix of `s` of length `l` where `0 < l < n` and append it at the start of `s`.

For example, if `s = "abcd"`, removing the suffix "cd" and appending it at the start gives "cdab".

Return the minimum number of operations needed to transform string `s` into string `t`. Return -1 if it is impossible.

### Example

```
Input: s = "abcd", t = "cdab"
Output: 2
Explanation:
- Operation 1: Remove suffix "d" and append to start → "dabcd"
- Operation 2: Remove suffix "bcd" and append to start → "cdab"
Result matches t.
```

## Approach

First check if `t` is a rotation of `s` by verifying if `t` appears in `s + s`. If not, return -1.

For the minimum operations, use BFS or dynamic programming. Consider all possible rotations of `s` and track the minimum moves needed to reach each state. The key insight is that each operation moves a suffix to the front, and we need to find the shortest sequence of such moves to reach `t`.

Alternatively, observe that the problem reduces to finding the minimum number of steps where each step rotates the string by removing a suffix. This can be computed by simulating all possible suffix removals and using BFS to find the shortest path from `s` to `t`.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfWays(string s, string t)
    {
        int n = s.Length;
        if (!(s + s).Contains(t))
            return -1;
        
        if (s == t)
            return 0;
        
        var queue = new Queue<(string str, int ops)>();
        var visited = new HashSet<string>();
        
        queue.Enqueue((s, 0));
        visited.Add(s);
        
        while (queue.Count > 0)
        {
            var (current, ops) = queue.Dequeue();
            
            for (int l = 1; l < n; l++)
            {
                string next = current.Substring(n - l) + current.Substring(0, n - l);
                
                if (next == t)
                    return ops + 1;
                
                if (visited.Add(next))
                    queue.Enqueue((next, ops + 1));
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** `O(n^3)` — at most O(n!) states but typically much less due to early termination.
- **Space:** `O(n^2)` for the visited set storing strings.
