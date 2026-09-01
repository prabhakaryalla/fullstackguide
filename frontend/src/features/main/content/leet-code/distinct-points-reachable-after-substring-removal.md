# 3694. Distinct Points Reachable After Substring Removal

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window, Prefix Sum

## Problem

You are given a string `s` consisting of characters `'U'`, `'D'`, `'L'`, and `'R'`, representing moves on an infinite 2D Cartesian grid (`'U'` increases `y` by 1, `'D'` decreases `y` by 1, `'L'` decreases `x` by 1, `'R'` increases `x` by 1). You are also given a positive integer `k`.

You must choose and remove exactly one contiguous substring of length `k` from `s`. Then, starting from `(0, 0)`, perform the remaining moves in order.

Return the number of distinct final coordinates reachable.

### Example

```
Input: s = "LUL", k = 1
Output: 2
Explanation: Removing each of the 3 single characters yields final points (-1,1), (-2,0), (-1,1); 2 are distinct.
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of only `'U'`, `'D'`, `'L'`, and `'R'`.
- `1 <= k <= s.length`

## Approach

Compute prefix sums of the `x` and `y` displacement contributed by each move. For a removed window `[start, start + k)`, the final coordinate equals the total displacement minus the displacement contributed by that window, which can be computed in O(1) using the prefix sums. Slide the window across all valid starting positions, encode each resulting `(x, y)` pair into a single hashable key, and count the number of distinct keys using a hash set.

## C# Solution

```csharp
public class Solution
{
    public int DistinctPoints(string s, int k)
    {
        int n = s.Length;
        int[] dx = new int[n + 1];
        int[] dy = new int[n + 1];

        for (int i = 0; i < n; i++)
        {
            int stepX = 0, stepY = 0;
            switch (s[i])
            {
                case 'U': stepY = 1; break;
                case 'D': stepY = -1; break;
                case 'L': stepX = -1; break;
                case 'R': stepX = 1; break;
            }
            dx[i + 1] = dx[i] + stepX;
            dy[i + 1] = dy[i] + stepY;
        }

        int totalX = dx[n], totalY = dy[n];
        HashSet<long> seen = new HashSet<long>();

        for (int start = 0; start + k <= n; start++)
        {
            int end = start + k;
            int removedX = dx[end] - dx[start];
            int removedY = dy[end] - dy[start];

            int finalX = totalX - removedX;
            int finalY = totalY - removedY;

            long key = ((long)(finalX + 200000) << 20) | (uint)(finalY + 200000);
            seen.Add(key);
        }

        return seen.Count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix sums and the hash set.
