# 179. Largest Number

**Difficulty:** Medium
**Category:** Array, String, Greedy, Sorting

## Problem

Given a list of non-negative integers `nums`, arrange them so they form the largest possible number, and return the result as a string.

### Example

```
nums = [10,2] -> "210"
nums = [3,30,34,5,9] -> "9534330"
```

## Approach

Convert each number to a string, then sort using a custom comparator: string `a` should come before `b` if the concatenation `a+b` is lexicographically larger than `b+a` — this greedy pairwise comparison produces a globally optimal arrangement. After sorting, concatenate all pieces (a leading "0" result means every number is zero).

## C# Solution

```csharp
public class Solution
{
    public string LargestNumber(int[] nums)
    {
        var strs = nums.Select(n => n.ToString()).ToArray();

        Array.Sort(strs, (a, b) => string.Compare(b + a, a + b, StringComparison.Ordinal));

        if (strs[0] == "0") return "0"; // all zeros

        return string.Concat(strs);
    }
}
```

## Complexity

- **Time:** `O(n log n * k)` — sorting `n` strings, each comparison costing `O(k)` for strings of average length `k`.
- **Space:** `O(n * k)` — for the string array and result.
