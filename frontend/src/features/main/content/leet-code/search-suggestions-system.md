# 1268. Search Suggestions System

**Difficulty:** Medium
**Category:** Array, String, Trie, Sorting, Heap, Binary Search

## Problem

Given a `products` array and a `searchWord`, return, for every prefix of `searchWord` (as it's typed character by character), up to 3 lexicographically smallest products from `products` that start with that prefix.

### Example

```
Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
```

## Approach

Sort `products` lexicographically once so that all products sharing any given prefix form a contiguous block. For each growing prefix of `searchWord`, binary search for the first product that is `>=` the prefix, then scan forward from there collecting up to 3 products that still start with that prefix (stopping early once a product no longer matches, since the sorted order guarantees no more matches follow).

## C# Solution

```csharp
public class Solution
{
    public IList<IList<string>> SuggestedProducts(string[] products, string searchWord)
    {
        Array.Sort(products, StringComparer.Ordinal);
        var result = new List<IList<string>>();
        string prefix = "";

        foreach (char c in searchWord)
        {
            prefix += c;
            var suggestions = new List<string>();
            int index = LowerBound(products, prefix);

            for (int i = index; i < products.Length && suggestions.Count < 3; i++)
            {
                if (!products[i].StartsWith(prefix, StringComparison.Ordinal)) break;
                suggestions.Add(products[i]);
            }

            result.Add(suggestions);
        }

        return result;
    }

    private int LowerBound(string[] products, string prefix)
    {
        int lo = 0, hi = products.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (string.CompareOrdinal(products[mid], prefix) < 0) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O(n log n + m log n)`, where `n` is the number of products and `m` is the length of `searchWord`.
- **Space:** `O(n)` for the sorted array.
