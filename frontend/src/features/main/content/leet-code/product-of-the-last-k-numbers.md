# 1352. Product of the Last K Numbers

**Difficulty:** Medium
**Category:** Array, Design, Prefix Sum, Data Stream

## Problem

Design a data structure that supports adding a number to a running stream and, at any point, querying the product of the last `k` numbers added.

### Example

```
Input: ["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
[[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]
Output: [null,null,null,null,null,null,20,40,0,null,32]
```

## Approach

Maintain a running list of prefix products. Whenever a `0` is added, it would make every future product `0` and division impossible, so instead reset the prefix list back to `[1]` and continue from there — any query for a window crossing that reset point simply returns `0` implicitly because the window would extend beyond the shortened prefix list. For a valid window, divide the latest prefix product by the one from `k` steps earlier.

## C# Solution

```csharp
public class ProductOfNumbers
{
    private readonly List<long> prefix = new() { 1 };

    public void Add(int num)
    {
        if (num == 0)
        {
            prefix.Clear();
            prefix.Add(1);
        }
        else
        {
            prefix.Add(prefix[^1] * num);
        }
    }

    public int GetProduct(int k)
    {
        if (k >= prefix.Count) return 0;
        return (int)(prefix[^1] / prefix[prefix.Count - 1 - k]);
    }
}
```

## Complexity

- **Time:** `O(1)` amortized per operation.
- **Space:** `O(n)` for the prefix product list.
