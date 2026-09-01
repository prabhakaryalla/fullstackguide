# 1464. Maximum Product of Two Elements in an Array

**Difficulty:** Easy
**Category:** Array, Sorting, Heap (Priority Queue)

## Problem

Given an integer array `nums`, choose indices `i` and `j` (`i != j`) to maximize `(nums[i] - 1) * (nums[j] - 1)`.

### Example

```
Input: nums = [3,4,5,2]
Output: 12
```

## Approach

The maximum value is always achieved using the two largest elements in the array. Track the largest and second-largest values in a single pass, then compute `(first - 1) * (second - 1)`.

## C# Solution

```csharp
public class Solution
{
    public int MaxProduct(int[] nums)
    {
        int first = 0, second = 0;

        foreach (var n in nums)
        {
            if (n > first)
            {
                second = first;
                first = n;
            }
            else if (n > second)
            {
                second = n;
            }
        }

        return (first - 1) * (second - 1);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
