# 1470. Shuffle the Array

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array `nums` of `2n` elements in the form `[x1, x2, ..., xn, y1, y2, ..., yn]`, return the array shuffled into `[x1, y1, x2, y2, ..., xn, yn]`.

### Example

```
Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7]
```

## Approach

Directly build the result array by pairing up `nums[i]` (from the first half) with `nums[i + n]` (from the second half) for each `i` from `0` to `n - 1`.

## C# Solution

```csharp
public class Solution
{
    public int[] Shuffle(int[] nums, int n)
    {
        var result = new int[2 * n];

        for (int i = 0; i < n; i++)
        {
            result[2 * i] = nums[i];
            result[2 * i + 1] = nums[i + n];
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result array.
