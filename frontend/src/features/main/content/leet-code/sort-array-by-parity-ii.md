# 922. Sort Array By Parity II

**Difficulty:** Easy
**Category:** Array, Two Pointers, Sorting

## Problem

Given an array `nums` with an equal number of odd and even integers, rearrange it so that every even-indexed element is even and every odd-indexed element is odd. Any valid arrangement may be returned.

### Example

```
Input: nums = [4,2,5,7]
Output: [4,5,2,7]
```

## Approach

Walk the source array once, placing each even number into the next available even slot (`0, 2, 4, ...`) and each odd number into the next available odd slot (`1, 3, 5, ...`) of a new result array.

## C# Solution

```csharp
public class Solution
{
    public int[] SortArrayByParityII(int[] nums)
    {
        int n = nums.Length;
        var result = new int[n];
        int evenIdx = 0, oddIdx = 1;

        foreach (var num in nums)
        {
            if (num % 2 == 0) { result[evenIdx] = num; evenIdx += 2; }
            else { result[oddIdx] = num; oddIdx += 2; }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result array.
