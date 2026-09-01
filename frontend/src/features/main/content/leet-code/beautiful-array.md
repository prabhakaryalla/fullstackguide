# 932. Beautiful Array

**Difficulty:** Medium
**Category:** Array, Math, Divide and Conquer

## Problem

An array of distinct integers `nums` is *beautiful* if for every `i < k < j`, `2 * nums[k] != nums[i] + nums[j]`. Given `n`, return any beautiful array containing exactly the integers `1` to `n`.

### Example

```
Input: n = 4
Output: [2,1,4,3]
```

## Approach

If an array is beautiful, transforming it to all-odd values (`2x - 1`) or all-even values (`2x`) preserves beauty, and concatenating a beautiful odd-only array with a beautiful even-only array is still beautiful (an odd + even sum can never be even, so no violation crosses the split). Starting from `[1]`, repeatedly build a bigger beautiful array by mapping the current array through both transforms and concatenating, until it reaches size `n`, then trim/filter to values `<= n`.

## C# Solution

```csharp
public class Solution
{
    public int[] BeautifulArray(int n)
    {
        var result = new List<int> { 1 };

        while (result.Count < n)
        {
            var next = new List<int>();
            foreach (var x in result) if (2 * x - 1 <= n) next.Add(2 * x - 1);
            foreach (var x in result) if (2 * x <= n) next.Add(2 * x);
            result = next;
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n log n)` across recursive doublings.
