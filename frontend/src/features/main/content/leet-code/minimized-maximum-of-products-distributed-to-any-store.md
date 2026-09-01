# 2064. Minimized Maximum of Products Distributed to Any Store

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

There are `n` specialty retail stores and `m` product types, where `quantities[i]` is the number of products of the `i`th type. Each store can be given products of only a **single** type (though a product type may be split across multiple stores). Distribute every product to some store so as to minimize the maximum number of products given to any single store. Return *that minimized maximum*.

## Approach

Binary search on the answer `x` (the candidate maximum products per store). For a given `x`, check feasibility: the number of stores required to distribute `quantities[i]` products of type `i`, giving at most `x` per store, is `ceil(quantities[i] / x)`. Summing this over all product types gives the total stores needed; the distribution is feasible for `x` if this total is `<= n`. Since larger `x` always needs fewer or equal stores, feasibility is monotonic, so binary search for the smallest feasible `x`.

## C# Solution

```csharp
public class Solution
{
    public int MinimizedMaximum(int n, int[] quantities)
    {
        int lo = 1, hi = quantities.Max();

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (StoresNeeded(quantities, mid) <= n)
                hi = mid;
            else
                lo = mid + 1;
        }

        return lo;
    }

    private int StoresNeeded(int[] quantities, int x)
    {
        int stores = 0;
        foreach (var q in quantities)
            stores += (q + x - 1) / x;

        return stores;
    }
}
```

## Complexity

- **Time:** `O(m log(max(quantities)))`.
- **Space:** `O(1)`.
