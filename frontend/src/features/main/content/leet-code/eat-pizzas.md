# 3457. Eat Pizzas!

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem
You are given an array `pizzas` of length `n` (n is a multiple of 4) representing the weights of pizzas. You eat all pizzas over `n / 4` days. On each "cycle" of 4 days, you eat 4 pizzas with the following rule: on the 1st day you eat the largest pizza remaining, contributing its full weight; on the 2nd day you eat the 2nd largest remaining, contributing its full weight; on the 3rd day, you eat the smallest remaining pizza but it contributes 0 to your total weight gained; on the 4th day similarly the 2nd smallest contributes 0. Return the maximum total weight you can gain by choosing the order optimally (i.e., choosing which 4 pizzas go together each cycle).

## Approach
Sort the pizzas in descending order. Greedily, to maximize total weight gained, you want the largest pizzas to always land on "day 1" and "day 2" slots (which count), and pair them against the smallest available pizzas for the "day 3"/"day 4" slots (which don't count). Process pairs of two largest remaining pizzas at a time (both counted), and consume two of the smallest remaining pizzas per cycle to "absorb" the zero-value days, alternating the pattern based on parity of the number of cycles per known optimal greedy (take top 1 for every odd cycle contributes 2 pizzas from top, even cycles contribute 1 pizza from top and 1 from the next batch), matching the pattern derived from competitive analysis: for `n/4` days groups, the first `ceil(days/2)` groups contribute 2 top pizzas each (both days 1 and 2 count), and remaining groups contribute 1 top pizza plus consume from the back.

## C# Solution

```csharp
public class Solution 
{
    public long MaxWeight(int[] pizzas) 
    {
        int n = pizzas.Length;
        int days = n / 4;

        var sorted = (int[])pizzas.Clone();
        System.Array.Sort(sorted);
        System.Array.Reverse(sorted); // descending order

        long total = 0;
        int left = 0; // pointer into sorted (largest side)
        int oddDays = (days + 1) / 2; // number of "odd" cycles that take 2 top pizzas

        // Odd-indexed days (1-based: 1,3,5,...) take 2 top pizzas each (both count)
        for (int i = 0; i < oddDays; i++)
        {
            total += sorted[left];
            total += sorted[left + 1];
            left += 2;
        }

        // Remaining (even) days take 1 top pizza each (counts), 
        // the other 3 "slots" per remaining day are absorbed from the smallest remaining pizzas
        int evenDays = days - oddDays;
        int right = n - 1;
        for (int i = 0; i < evenDays; i++)
        {
            total += sorted[left];
            left += 1;
            right -= 3; // 3 pizzas consumed from the bottom that don't count (2 zero-days + adjustment)
        }

        return total;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the sorted copy
