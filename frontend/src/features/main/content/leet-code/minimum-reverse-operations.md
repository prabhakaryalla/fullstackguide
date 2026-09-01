# 2612. Minimum Reverse Operations

**Difficulty:** Hard
**Category:** Array, Breadth-First Search

## Problem

You are given an integer `n` and an integer `p` in the range `[0, n - 1]`. Representing a 0-indexed array `arr` of length `n` where all positions are set to `0`'s, except position `p` which is set to `1`.

You are also given an integer array `banned` containing some positions. For the `i`th position in `banned`, `arr[banned[i]] = 0`, and it cannot be set to `1`.

You can perform multiple operations on `arr`. In an operation, you can choose a subarray with size `k` and reverse it. However, the `1` in `arr` should always be inside the subarray. In other words, when reversing a subarray, the position of `1` must stay within the boundaries of the subarray.

Return an array `ans` where for each position `i` from `[0, n - 1]`, `ans[i]` is the minimum number of operations needed to bring the `1` to position `i` in `arr`, or `-1` if it is impossible.

### Example

```
Input: n = 4, p = 0, banned = [1,2], k = 4
Output: [0,-1,-1,1]
Explanation: Starting from position 0, we can reverse the entire array to reach position 3.
```

## Approach

Use BFS to explore reachable positions. For each position, compute the range of positions the `1` can jump to by reversing a subarray of size `k`. Use ordered sets to efficiently track unvisited positions and avoid processing banned positions.

## C# Solution

```csharp
public class Solution
{
    public int[] MinReverseOperations(int n, int p, int[] banned, int k)
    {
        var bannedSet = new HashSet<int>(banned);
        var result = new int[n];
        Array.Fill(result, -1);
        result[p] = 0;
        
        var even = new SortedSet<int>();
        var odd = new SortedSet<int>();
        
        for (int i = 0; i < n; i++)
        {
            if (i != p && !bannedSet.Contains(i))
            {
                if (i % 2 == 0)
                    even.Add(i);
                else
                    odd.Add(i);
            }
        }
        
        var queue = new Queue<int>();
        queue.Enqueue(p);
        
        while (queue.Count > 0)
        {
            int curr = queue.Dequeue();
            int left = Math.Max(0, curr - k + 1);
            int right = Math.Min(n - k, curr);
            
            int newLeft = left + (k - 1 - (curr - left));
            int newRight = right + (k - 1 - (curr - right));
            
            var targetSet = newLeft % 2 == 0 ? even : odd;
            var toRemove = new List<int>();
            
            foreach (int pos in targetSet.GetViewBetween(newLeft, newRight))
            {
                result[pos] = result[curr] + 1;
                queue.Enqueue(pos);
                toRemove.Add(pos);
            }
            
            foreach (int pos in toRemove)
                targetSet.Remove(pos);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) — BFS with sorted set operations
- **Space:** O(n) — for tracking unvisited positions
