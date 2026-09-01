# 3606. Coupon Code Validator

**Difficulty:** Easy
**Category:** Array, String, Sorting

## Problem
You are given three arrays `code`, `businessLine`, and `isActive`, all of length `n`, where `code[i]` is a coupon code, `businessLine[i]` is its category, and `isActive[i]` indicates whether it is currently active. A coupon is **valid** if all of the following hold:
1. `code[i]` is non-empty and consists only of alphanumeric characters, underscores (`_`), and hyphens (`-`).
2. `businessLine[i]` is one of `"electronics"`, `"grocery"`, `"pharmacy"`, or `"restaurant"`.
3. `isActive[i]` is `true`.

Return the `code` values of all valid coupons, sorted primarily by business line in the priority order `electronics < grocery < pharmacy < restaurant`, and secondarily by code in ascending lexicographical order.

## Approach
Iterate over all coupons and filter using a regular expression to validate the code format, combined with a fixed set of allowed business lines and the `isActive` flag. Assign each allowed business line a priority index (`electronics = 0, grocery = 1, pharmacy = 2, restaurant = 3`). Collect the valid `(businessLine priority, code)` pairs and sort them by priority first, then by code lexicographically, finally projecting out just the codes.

## C# Solution

```csharp
public class Solution 
{
    public IList<string> ValidateCoupons(string[] code, string[] businessLine, bool[] isActive) 
    {
        var priority = new Dictionary<string, int>
        {
            ["electronics"] = 0,
            ["grocery"] = 1,
            ["pharmacy"] = 2,
            ["restaurant"] = 3
        };

        var regex = new System.Text.RegularExpressions.Regex("^[a-zA-Z0-9_-]+$");
        var valid = new List<(int priority, string code)>();

        for (int i = 0; i < code.Length; i++)
        {
            if (!isActive[i])
                continue;
            if (!priority.TryGetValue(businessLine[i], out int p))
                continue;
            if (!regex.IsMatch(code[i]))
                continue;

            valid.Add((p, code[i]));
        }

        valid.Sort((a, b) =>
        {
            if (a.priority != b.priority)
                return a.priority.CompareTo(b.priority);
            return string.CompareOrdinal(a.code, b.code);
        });

        var result = new List<string>(valid.Count);
        foreach (var (_, c) in valid)
            result.Add(c);

        return result;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
