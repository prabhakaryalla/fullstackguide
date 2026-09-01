# 2350. Shortest Impossible Sequence of Rolls

**Difficulty:** Hard
**Category:** Array, Hash Table, Greedy

## Problem

You are given an integer array `rolls` of length `n` and an integer `k`. You roll a `k` sided dice numbered from `1` to `k`, `n` times, where the result of the `ith` roll is `rolls[i]`.

Return the length of the shortest sequence of rolls that cannot be taken from `rolls`.

A sequence of rolls of length `len` is the result of rolling a `k` sided dice `len` times.

### Example

```
Input: rolls = [4,2,1,2,3,3,2,4,1], k = 4
Output: 3
Explanation: 
Every possible sequence of rolls of length 1 can be obtained: [1], [2], [3], [4].
Every possible sequence of rolls of length 2 can be obtained: [1,1], [1,2], ..., [4,4].
The sequence [1,4,2] cannot be obtained, so we return 3.
```

## Approach

Greedily track complete "rounds" where we've seen all k values. Use a hash set to track which values we've seen in the current round. Once we've seen all k values, increment the round counter and reset the set. The answer is rounds + 1.

## C# Solution

```csharp
public class Solution
{
    public int ShortestSequence(int[] rolls, int k)
    {
        HashSet<int> seen = new HashSet<int>();
        int rounds = 0;
        
        foreach (int roll in rolls)
        {
            seen.Add(roll);
            
            if (seen.Count == k)
            {
                rounds++;
                seen.Clear();
            }
        }
        
        return rounds + 1;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of rolls
- **Space:** O(k) for the hash set
