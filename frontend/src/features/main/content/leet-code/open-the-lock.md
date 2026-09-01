# 752. Open the Lock

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Breadth-First Search

## Problem

A lock has 4 circular wheels, each with digits `0-9`; each move turns one wheel by one slot in either direction. Given a list of `deadends` (states that immediately stop the lock) and a `target` combination, return the minimum number of moves to reach `target` from `"0000"`, or `-1` if impossible.

### Example

```
Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
```

## Approach

This is a shortest-path problem on an implicit graph where each 4-digit state connects to 8 neighbors (turning each of the 4 wheels up or down by one). Perform a breadth-first search from `"0000"`, skipping dead-end states and already-visited states, counting levels until the target is found.

## C# Solution

```csharp
public class Solution
{
    public int OpenLock(string[] deadends, string target)
    {
        var dead = new HashSet<string>(deadends);
        if (dead.Contains("0000")) return -1;
        if (target == "0000") return 0;

        var visited = new HashSet<string> { "0000" };
        var queue = new Queue<string>();
        queue.Enqueue("0000");
        int steps = 0;

        while (queue.Count > 0)
        {
            steps++;
            int size = queue.Count;

            for (int i = 0; i < size; i++)
            {
                var current = queue.Dequeue();

                foreach (var next in GetNeighbors(current))
                {
                    if (dead.Contains(next) || visited.Contains(next)) continue;
                    if (next == target) return steps;

                    visited.Add(next);
                    queue.Enqueue(next);
                }
            }
        }

        return -1;
    }

    private IEnumerable<string> GetNeighbors(string state)
    {
        var chars = state.ToCharArray();
        for (int i = 0; i < 4; i++)
        {
            char original = chars[i];

            chars[i] = original == '9' ? '0' : (char)(original + 1);
            yield return new string(chars);

            chars[i] = original == '0' ? '9' : (char)(original - 1);
            yield return new string(chars);

            chars[i] = original;
        }
    }
}
```

## Complexity

- **Time:** `O(10^4)` states, each with 8 neighbors.
- **Space:** `O(10^4)` for the visited set and queue.
