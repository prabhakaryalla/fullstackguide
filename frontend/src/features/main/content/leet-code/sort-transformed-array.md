# 360. Sort Transformed Array

**Difficulty:** Medium
**Category:** Array, Math, Two Pointers, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a sorted integer array `nums` and integers `a`, `b`, `c`, apply the quadratic function `f(x) = a*x^2 + b*x + c` to every element and return the resulting array sorted in ascending order.

### Example

```
Input: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
Output: [1,3,9,23]
```

### Constraints

- `1 <= nums.length <= 200`
- `-100 <= nums[i], a, b, c <= 100`
- `nums` is sorted in ascending order.

## Approach

A quadratic function is a parabola, so applying it to a sorted array produces values that first decrease then increase (if `a > 0`) or first increase then decrease (if `a < 0`) — meaning the largest (or smallest) transformed values always occur at the two ends of the original sorted array. Use two pointers starting at both ends: if `a >= 0`, repeatedly take the larger of the two endpoint values and place it at the back of the result (filling right to left); if `a < 0`, take the smaller of the two and fill left to right.

## C# Solution

```csharp
public class Solution
{
    public int[] SortTransformedArray(int[] nums, int a, int b, int c)
    {
        int n = nums.Length;
        var result = new int[n];
        int left = 0, right = n - 1;
        int index = a >= 0 ? n - 1 : 0;

        while (left <= right)
        {
            int leftVal = Quad(nums[left], a, b, c);
            int rightVal = Quad(nums[right], a, b, c);

            if (a >= 0)
            {
                if (leftVal >= rightVal)
                {
                    result[index--] = leftVal;
                    left++;
                }
                else
                {
                    result[index--] = rightVal;
                    right--;
                }
            }
            else
            {
                if (leftVal <= rightVal)
                {
                    result[index++] = leftVal;
                    left++;
                }
                else
                {
                    result[index++] = rightVal;
                    right--;
                }
            }
        }

        return result;
    }

    private int Quad(int x, int a, int b, int c) => a * x * x + b * x + c;
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result array.
