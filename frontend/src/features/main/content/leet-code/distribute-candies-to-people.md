# 1103. Distribute Candies to People

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

Distribute `candies` one-by-one to `num_people` people seated in a row: give `1` to the first person, `2` to the second, and so on, wrapping back to the first person after the last, increasing the amount given by `1` each turn. The final turn may give fewer candies than requested if supply runs out. Return an array with how many candies each person ends up with.

### Example

```
Input: candies = 7, num_people = 4
Output: [1,2,3,1]
```

## Approach

Simulate the distribution directly: keep a running `give` counter that increases by one each turn, and hand out `min(candies, give)` to the current person (indexed with modulo `num_people`), stopping once `candies` reaches zero.

## C# Solution

```csharp
public class Solution
{
    public int[] DistributeCandies(int candies, int num_people)
    {
        int[] result = new int[num_people];
        int give = 1, i = 0;

        while (candies > 0)
        {
            int amount = Math.Min(candies, give);
            result[i % num_people] += amount;
            candies -= amount;
            give++;
            i++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(√candies + num_people)`.
- **Space:** `O(num_people)` for the result array.
