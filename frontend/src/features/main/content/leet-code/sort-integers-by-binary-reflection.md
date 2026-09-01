# 3769. Sort Integers by Binary Reflection

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an integer array `nums`, the binary reflection of a positive integer is obtained by reversing the order of its binary digits (ignoring leading zeros) and interpreting the result as decimal. Sort `nums` ascending by binary reflection; if two numbers have the same reflection, the smaller original value comes first.

### Example

Input: `nums = [4,5,4]`
Output: `[4,4,5]`

`4 -> "100" -> reversed "001" -> 1`; `5 -> "101" -> reversed "101" -> 5`.

## Approach

For each number, compute its binary string, reverse it, and parse back to an integer to get the reflection. Sort using the reflection as the primary key and the original value as the tiebreaker.

## C# Solution

```csharp
public class Solution 
{
    public int[] SortByReflection(int[] nums) 
    {
        return nums
            .Select(v => (Value: v, Reflection: Reflect(v)))
            .OrderBy(t => t.Reflection)
            .ThenBy(t => t.Value)
            .Select(t => t.Value)
            .ToArray();
    }

    private int Reflect(int v)
    {
        string bin = Convert.ToString(v, 2);
        char[] arr = bin.ToCharArray();
        Array.Reverse(arr);
        return Convert.ToInt32(new string(arr), 2);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
