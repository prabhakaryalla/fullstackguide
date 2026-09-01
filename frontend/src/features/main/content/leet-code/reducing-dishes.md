# 1402. Reducing Dishes

**Difficulty:** Hard
**Category:** Array, Math, Greedy, Sorting

## Problem

A chef has `satisfaction[i]` for each dish. Cooking a dish at a chosen time `t` (positions are `1, 2, 3, ...` in the cooking order) contributes `satisfaction[i] * t` to the total "like-time coefficient". The chef may discard any subset of dishes. Return the maximum sum of like-time coefficients achievable by choosing an order (and possibly discarding dishes).

### Example

```
Input: satisfaction = [-1,-8,0,5,-9]
Output: 14
Explanation: Cook dishes with satisfaction [-1,5] in that order: -1*1 + 5*2 = 9? 
Actually the optimal order is [-1,0,5]: -1*1 + 0*2 + 5*3 = 14.
```

## Approach

Sort the satisfaction values ascending. The best dishes to keep are always a suffix of this sorted array (the largest values), because adding a lower-value dish only helps if it doesn't drag the running suffix sum negative. Walk from the largest value down to the smallest, maintaining a running `sum` of included dishes; each time a dish is included, add the (updated) `sum` to `total` — this correctly simulates shifting every previously chosen dish's time multiplier up by one while inserting the new dish at time `1`. Stop as soon as including one more dish would make `sum` non-positive, since sorted order guarantees it only gets worse from there.

## C# Solution

```csharp
public class Solution
{
    public int MaxSatisfaction(int[] satisfaction)
    {
        Array.Sort(satisfaction);

        int total = 0;
        int sum = 0;

        for (int i = satisfaction.Length - 1; i >= 0; i--)
        {
            sum += satisfaction[i];
            if (sum <= 0) break;
            total += sum;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(1)` extra space (in-place sort).
