# 1985. Find the Kth Largest Integer in the Array

**Difficulty:** Medium
**Category:** Array, String, Divide and Conquer, Sorting, Heap (Priority Queue), Quickselect

## Problem

Given an array of digit-strings `nums` (representing integers, possibly very large, without leading zeros other than `"0"` itself) and an integer `k`, return the string representing the `k`-th largest integer in `nums`.

### Example

```
Input: nums = ["3","6","7","10"], k = 4
Output: "3"
Explanation: Sorted descending as integers: 10, 7, 6, 3 — the 4th largest is "3".
```

### Constraints

- `1 <= k <= nums.length <= 10^4`
- `1 <= nums[i].length <= 100`
- `nums[i]` consists of only digits and does not have leading zeros unless it is `"0"` itself.

## Approach

Since the numbers can be arbitrarily large (up to 100 digits), they cannot be parsed into a standard numeric type. Instead, sort the strings using a custom comparator that first compares lengths (a longer digit string without leading zeros represents a larger number), and breaks ties with ordinary string (lexicographic) comparison when lengths are equal. Sort in descending order and return the element at index `k - 1`.

## C# Solution

```csharp
public class Solution
{
    public string KthLargestNumber(string[] nums, int k)
    {
        Array.Sort(nums, (a, b) =>
        {
            if (a.Length != b.Length)
            {
                return b.Length - a.Length;
            }
            return string.CompareOrdinal(b, a);
        });

        return nums[k - 1];
    }
}
```

## Complexity

- **Time:** `O(n log n * L)` where `L` is the average string length, for sorting with string comparisons.
- **Space:** `O(log n)` for the sort's recursion, plus `O(1)` extra beyond the input array.
