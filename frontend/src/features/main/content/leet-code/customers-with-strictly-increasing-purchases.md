# 2474. Customers With Strictly Increasing Purchases

**Difficulty:** Medium
**Category:** Database, Array, Hash Table, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a collection of purchase records, each with a `customer_id`, `order_id`, `price`, and `purchase_date`, find customers whose total yearly spend has **strictly increased every year**, across a run of **consecutive calendar years** with no gaps, from their first purchase year to their last purchase year. A customer must have purchase activity in at least two distinct years to qualify.

For each qualifying customer, report the `customer_id`, the first year and last year of their purchase history, and their overall total amount spent across all years. Results are ordered by `customer_id`.

## Approach
1. Group purchase records by `customer_id`, then by the year of `purchase_date`, summing `price` within each (customer, year) group.
2. For each customer, sort their yearly totals by year.
3. Walk consecutive year-pairs, verifying that each year is exactly one more than the previous year (no gaps) and that the total strictly increased.
4. Skip customers with fewer than two distinct years, since "strictly increasing" requires at least one comparison.
5. For customers that pass every consecutive check, emit the customer id, first year, last year, and the sum of all their yearly totals.

## C# Solution

```csharp
public class Solution
{
    public List<(int CustomerId, int FirstYear, int LastYear, int TotalAmount)> CustomersWithStrictlyIncreasingPurchases(
        List<(int CustomerId, int OrderId, int Price, DateTime PurchaseDate)> purchases)
    {
        var customerYearTotals = purchases
            .GroupBy(p => p.CustomerId)
            .Select(g => new
            {
                CustomerId = g.Key,
                ByYear = g.GroupBy(p => p.PurchaseDate.Year)
                          .OrderBy(yg => yg.Key)
                          .Select(yg => (Year: yg.Key, Total: yg.Sum(p => p.Price)))
                          .ToList()
            });

        var result = new List<(int, int, int, int)>();

        foreach (var customer in customerYearTotals)
        {
            var years = customer.ByYear;
            if (years.Count < 2)
            {
                continue;
            }

            bool valid = true;
            for (int i = 1; i < years.Count; i++)
            {
                bool consecutiveYear = years[i].Year == years[i - 1].Year + 1;
                bool strictlyIncreasing = years[i].Total > years[i - 1].Total;
                if (!consecutiveYear || !strictlyIncreasing)
                {
                    valid = false;
                    break;
                }
            }

            if (valid)
            {
                int total = years.Sum(y => y.Total);
                result.Add((customer.CustomerId, years[0].Year, years[^1].Year, total));
            }
        }

        return result.OrderBy(r => r.Item1).ToList();
    }
}
```

## Complexity

- **Time:** O(n log n), dominated by grouping and sorting purchases per customer.
- **Space:** O(n) for the grouped year totals.
