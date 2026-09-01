# 1058. Minimize Rounding Error to Meet Target

**Difficulty:** Medium
**Category:** Array, Math, String, Greedy, Sorting

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of decimal price strings `prices` and an integer `target`, round each price to either its floor or ceiling integer so that the sum of the rounded values equals `target`. Return the minimum total rounding error, formatted as a string with three decimal places, or `"-1"` if it's impossible.

### Example

```
Input: prices = ["0.700","2.800","4.900"], target = 8
Output: "1.000"
```

## Approach

If every price is rounded down, the sum is `floorSum` and the total error is the sum of all fractional parts. To reach `target`, exactly `needed = target - floorSum` prices must instead be rounded up. This is only possible if `0 <= needed <= n`. Rounding a price up instead of down changes its error from `fractional` to `1 - fractional`; to minimize the total error increase, prefer rounding up the prices with the **largest** fractional parts first (since `(1 - fractional) - fractional` is smallest, i.e. best, when `fractional` is large). Sort fractional parts descending and apply this adjustment to the top `needed` of them.

## C# Solution

```csharp
public class Solution
{
    public string MinimizeError(string[] prices, int target)
    {
        int n = prices.Length;
        var fractionals = new double[n];
        int floorSum = 0;
        double totalError = 0;

        for (int i = 0; i < n; i++)
        {
            double value = double.Parse(prices[i]);
            int floorValue = (int)Math.Floor(value);
            floorSum += floorValue;

            double fractional = value - floorValue;
            fractionals[i] = fractional;
            totalError += fractional;
        }

        int needed = target - floorSum;
        if (needed < 0 || needed > n) return "-1";

        Array.Sort(fractionals);
        Array.Reverse(fractionals);

        for (int i = 0; i < needed; i++)
        {
            totalError += (1 - fractionals[i]) - fractionals[i];
        }

        return totalError.ToString("F3");
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting fractional parts.
- **Space:** `O(n)`.
