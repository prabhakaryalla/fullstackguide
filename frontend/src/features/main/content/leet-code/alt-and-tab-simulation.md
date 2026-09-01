# 3237. Alt and Tab Simulation

**Difficulty:** Medium
**Category:** Array, Hash Table, Simulation

## Problem
You have a list of open application windows in their current order (most recently used ordering initially given). You are given a sequence of "switch to window X" query events, simulating pressing Alt+Tab to bring a specific window to the front. Determine the final order of windows after processing all queries, where each accessed window moves to the front of the list (and any window never accessed keeps its relative order after all accessed ones).

## Approach
Process the queries in reverse order: the last time a window was switched to determines its final "most recently used" position, so by walking backward and recording each newly-seen window (using a seen-set to avoid duplicates), we build up the final front-to-back order of previously queried windows in the correct final order. After exhausting the queries, append the remaining windows from the original list (those never queried, or effectively finalize any still-unseen windows) in their original relative order, skipping any already added.

## C# Solution
```csharp
public class Solution {
    public IList<int> SimulationResult(int[] windows, int[] queries) {
        List<int> ans = new List<int>();
        HashSet<int> seen = new HashSet<int>();

        for (int i = queries.Length - 1; i >= 0; i--) {
            if (seen.Add(queries[i]))
                ans.Add(queries[i]);
        }

        foreach (int window in windows) {
            if (seen.Add(window))
                ans.Add(window);
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n)
