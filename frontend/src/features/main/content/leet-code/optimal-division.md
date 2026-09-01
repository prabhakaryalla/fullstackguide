# 553. Optimal Division

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming

## Problem

Given an integer array `nums`, insert `'/'` between every pair of adjacent numbers and optionally add parentheses to maximize the result of the resulting expression, evaluated left to right (division only). Return the corresponding expression as a string.

### Example

```
Input: nums = [1000,100,10,2]
Output: "1000/(100/10/2)"
```

### Constraints

- `1 <= nums.length <= 10`
- `2 <= nums[i] <= 1000`

## Approach

To maximize the result, divide the first number by everything else grouped together as one large divisor — since dividing by a smaller combined denominator (achieved by making all remaining terms multiply together via nested division, e.g. `a/(b/c/d) = a*c*d/b`) yields the largest possible value. This is achieved simply by wrapping every number after the second one inside a single set of parentheses following the first division.

## C# Solution

```csharp
public class Solution
{
    public string OptimalDivision(int[] nums)
    {
        if (nums.Length == 1) return nums[0].ToString();
        if (nums.Length == 2) return $"{nums[0]}/{nums[1]}";

        var sb = new StringBuilder();
        sb.Append(nums[0]).Append("/(").Append(nums[1]);

        for (int i = 2; i < nums.Length; i++)
            sb.Append('/').Append(nums[i]);

        sb.Append(')');
        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result string.
