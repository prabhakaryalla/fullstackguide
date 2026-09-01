# 403. Frog Jump

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Hash Table

## Problem

A frog crosses a river by jumping on stones at given positions `stones`, starting on the first stone with a jump of size `1`. If the frog's last jump was `k` units, its next jump must be `k - 1`, `k`, or `k + 1` units, and it may only jump forward. Return `true` if the frog can cross the river by landing on the last stone.

### Example

```
Input: stones = [0,1,3,5,6,8,12,17]
Output: true
```

### Constraints

- `2 <= stones.length <= 2000`
- `0 <= stones[i] <= 2^31 - 1`
- `stones[0] == 0`
- `stones` is sorted in strictly increasing order.

## Approach

Map each stone to the set of jump sizes that can land on it. Starting from the first stone (reachable with a jump of `0`), process stones in order, and for every jump size that reaches the current stone, try the three possible next jump sizes (`k-1`, `k`, `k+1`) and record them against whichever stone (if any) they land on. The frog can cross if the last stone ends up with any recorded jump size.

## C# Solution

```csharp
public class Solution
{
    public bool CanCross(int[] stones)
    {
        var jumpsAtStone = new Dictionary<int, HashSet<int>>();
        foreach (var stone in stones)
            jumpsAtStone[stone] = new HashSet<int>();

        jumpsAtStone[stones[0]].Add(0);

        foreach (var stone in stones)
        {
            foreach (var jump in jumpsAtStone[stone])
            {
                for (int next = jump - 1; next <= jump + 1; next++)
                {
                    if (next <= 0) continue;

                    int nextStone = stone + next;
                    if (jumpsAtStone.TryGetValue(nextStone, out var jumps))
                        jumps.Add(next);
                }
            }
        }

        return jumpsAtStone[stones[^1]].Count > 0;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — each stone can hold up to `O(n)` distinct jump sizes.
- **Space:** `O(n^2)` for the jump sets.
