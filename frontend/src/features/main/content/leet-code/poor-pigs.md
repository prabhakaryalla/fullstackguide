# 458. Poor Pigs

**Difficulty:** Hard
**Category:** Math, Dynamic Programming, Combinatorics

## Problem

There are `buckets` buckets, one of which is poisonous, and pigs used to identify it. Each test round takes `minutesToDie` minutes for a poisoned pig to show symptoms, and testing must complete within `minutesToTest` minutes. Return the minimum number of pigs needed to identify the poisonous bucket with certainty.

### Example

```
Input: buckets = 4, minutesToDie = 15, minutesToTest = 15
Output: 2
```

### Constraints

- `1 <= buckets <= 1000`
- `1 <= minutesToDie <= minutesToTest <= 10^9`

## Approach

Each pig can participate in `rounds = ⌊minutesToTest / minutesToDie⌋ + 1` distinct states (it can be fed at up to `rounds - 1` testing rounds, plus the "never got sick" state), since it either dies at some round or survives all of them. With `p` pigs, the number of distinguishable outcomes is `rounds^p`, which must be at least `buckets` to uniquely identify the poisoned one. Find the smallest `p` satisfying this.

## C# Solution

```csharp
public class Solution
{
    public int PoorPigs(int buckets, int minutesToDie, int minutesToTest)
    {
        int rounds = minutesToTest / minutesToDie + 1;
        int pigs = 0;

        while (Math.Pow(rounds, pigs) < buckets)
            pigs++;

        return pigs;
    }
}
```

## Complexity

- **Time:** `O(log buckets)`.
- **Space:** `O(1)`.
