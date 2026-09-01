# 3273. Minimum Amount of Damage Dealt to Bob

**Difficulty:** Hard
**Category:** Array, Math, Greedy, Sorting

## Problem

Bob is fighting `n` enemies. You are given Bob's attack `power`, and two arrays `damage` and `health`, where `damage[i]` and `health[i]` are the damage per turn and health of the `i`-th enemy. Every turn, Bob attacks exactly one enemy of his choosing, reducing its health by `power`. Then, every enemy that is still alive deals its `damage[i]` to Bob. This continues until all enemies are dead. Return the minimum total damage Bob can take.

### Example

```
Input: power = 4, damage = [1,2,3,4], health = [4,5,6,8]
Output: 39
```

## Approach

Focusing on one enemy at a time until it dies is always at least as good as splitting attacks, since delaying an enemy's death only increases the total damage taken with no benefit. For a fixed order of elimination, if `t_i = ceil(health[i] / power)` is the number of turns to kill enemy `i`, the damage contributed by enemy `i` equals `damage[i]` multiplied by the sum of turns spent up to and including killing it (because it stays alive and deals damage during all of those turns). This means the total damage equals `sum(damage[i] * prefixSum(t))` over the chosen order. A greedy exchange argument shows the optimal order sorts enemies by `damage[i] / t[i]` in descending order (comparing via cross multiplication to avoid floating-point error), attacking the highest damage-per-turn-cost enemies first.

## C# Solution

```csharp
public class Solution 
{
    public long MinDamage(int power, int[] damage, int[] health) 
    {
        int n = damage.Length;
        long[] turns = new long[n];
        for (int i = 0; i < n; i++) 
        {
            turns[i] = (health[i] + power - 1) / power;
        }

        int[] order = new int[n];
        for (int i = 0; i < n; i++) 
        {
            order[i] = i;
        }

        Array.Sort(order, (a, b) => 
        {
            long lhs = (long)damage[a] * turns[b];
            long rhs = (long)damage[b] * turns[a];
            return rhs.CompareTo(lhs);
        });

        long answer = 0;
        long prefixTurns = 0;

        foreach (int idx in order) 
        {
            prefixTurns += turns[idx];
            answer += (long)damage[idx] * prefixTurns;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
