# 514. Freedom Trail

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Breadth-First Search

## Problem

Given a circular dial `ring` and a string `key`, where you start pointing at `ring[0]` and can rotate the dial clockwise or counterclockwise one position at a time (each rotation costs 1 step) plus spend 1 step to press the center button to spell a character, return the minimum number of steps to spell every character of `key` in order.

### Example

```
Input: ring = "godding", key = "gd"
Output: 4
```

### Constraints

- `1 <= ring.length, key.length <= 100`
- `ring` and `key` consist of only lowercase English letters.
- It is guaranteed that `key` could always be spelled by rotating `ring`.

## Approach

Use dynamic programming over "which ring position the dial currently points to" after spelling each prefix of `key`. For each character of `key`, consider every ring position holding that character as a new possible dial position, and transition from every previous dial position by the shortest rotation distance (the minimum of clockwise and counterclockwise distance around the circular ring) plus one button press.

## C# Solution

```csharp
public class Solution
{
    public int FindRotateSteps(string ring, string key)
    {
        int n = ring.Length;
        var positions = new Dictionary<char, List<int>>();

        for (int i = 0; i < n; i++)
        {
            if (!positions.TryGetValue(ring[i], out var list))
            {
                list = new List<int>();
                positions[ring[i]] = list;
            }

            list.Add(i);
        }

        var dp = new Dictionary<int, int> { [0] = 0 };

        foreach (var c in key)
        {
            var nextDp = new Dictionary<int, int>();

            foreach (var pos in positions[c])
            {
                int best = int.MaxValue;

                foreach (var (prevPos, steps) in dp)
                {
                    int diff = Math.Abs(pos - prevPos);
                    int distance = Math.Min(diff, n - diff);
                    best = Math.Min(best, steps + distance + 1);
                }

                nextDp[pos] = best;
            }

            dp = nextDp;
        }

        return dp.Values.Min();
    }
}
```

## Complexity

- **Time:** `O(key.Length * ring.Length^2)` in the worst case.
- **Space:** `O(ring.Length)` for the DP maps.
