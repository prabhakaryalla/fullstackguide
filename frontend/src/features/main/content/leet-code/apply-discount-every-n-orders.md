# 1357. Apply Discount Every n Orders

**Difficulty:** Medium
**Category:** Array, Hash Table, Design

## Problem

Design a cashier system where every `n`th customer gets a `discount` percent off their bill, given a list of `products` with prices.

### Example

```
Input: ["Cashier","getBill","getBill","getBill","getBill","getBill","getBill","getBill"]
[[3,50,[1,2,3,4,5,6,7],[100,200,300,400,300,200,100]],[[1,2],[1,2]],[[3,5],[5,3]],[[1,5,3,4],[2,10,3,4]],[[1,2],[1,2]],[[1,2],[1,2]],[[1,2],[1,2]],[[1,2],[1,2]]]
Output: [null,750.0,2500.0,4000.0,750.0,750.0,750.0,135.0]
```

## Approach

Store each product's price in a lookup dictionary. Track how many bills have been processed; on every `n`th bill, apply the discount by scaling the computed total, otherwise return the total unchanged.

## C# Solution

```csharp
public class Cashier
{
    private readonly int n;
    private readonly int discount;
    private readonly Dictionary<int, int> prices = new();
    private int customerCount = 0;

    public Cashier(int n, int discount, int[] products, int[] prices)
    {
        this.n = n;
        this.discount = discount;
        for (int i = 0; i < products.Length; i++) this.prices[products[i]] = prices[i];
    }

    public double GetBill(int[] product, int[] amount)
    {
        double total = 0;
        for (int i = 0; i < product.Length; i++)
        {
            total += prices[product[i]] * amount[i];
        }

        customerCount++;
        if (customerCount % n == 0)
        {
            total -= total * discount / 100.0;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(items in bill)` per query.
- **Space:** `O(distinct products)`.
