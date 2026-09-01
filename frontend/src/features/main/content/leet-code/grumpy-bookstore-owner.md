# 1052. Grumpy Bookstore Owner

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem

A bookstore owner has `customers[i]` customers entering during minute `i`, and is grumpy or not per `grumpy[i]` (`1` if grumpy, meaning those customers are unsatisfied). The owner can suppress grumpiness for one contiguous window of `minutes` minutes. Return the maximum number of satisfied customers possible.

### Example

```
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
Output: 16
```

## Approach

Customers arriving during non-grumpy minutes are already satisfied regardless of the technique, so sum those first as a baseline. The technique only matters for grumpy minutes: use a sliding window of width `minutes` over the array, tracking the sum of customers during grumpy minutes inside the window (the extra customers gained by applying the technique there). Slide the window across the array and keep the best gain seen; add it to the baseline.

## C# Solution

```csharp
public class Solution
{
    public int MaxSatisfied(int[] customers, int[] grumpy, int minutes)
    {
        int n = customers.Length;
        int baseSatisfied = 0;

        for (int i = 0; i < n; i++)
        {
            if (grumpy[i] == 0) baseSatisfied += customers[i];
        }

        int windowGain = 0;
        for (int i = 0; i < minutes && i < n; i++)
        {
            if (grumpy[i] == 1) windowGain += customers[i];
        }

        int bestGain = windowGain;

        for (int i = minutes; i < n; i++)
        {
            if (grumpy[i] == 1) windowGain += customers[i];
            if (grumpy[i - minutes] == 1) windowGain -= customers[i - minutes];
            bestGain = Math.Max(bestGain, windowGain);
        }

        return baseSatisfied + bestGain;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass plus a sliding window pass.
- **Space:** `O(1)`.
