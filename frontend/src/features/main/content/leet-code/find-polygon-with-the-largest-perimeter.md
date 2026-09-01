# 2971. Find Polygon With the Largest Perimeter

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Prefix Sum

## Problem

You are given an array `nums` of positive integers. A polygon is valid if the sum of any subset of `k` elements (where k >= 3) satisfies the polygon inequality (the sum of all sides except the largest must be greater than the largest side).

Return the largest perimeter of a valid polygon, or -1 if none exists.

### Example

```
Input: nums = [5, 5, 5]
Output: 15
Explanation: The only polygon is a triangle with sides 5,5,5. Perimeter = 15.

Input: nums = [1, 12, 1, 2, 5, 50, 3]
Output: 12
```

## Approach

Sort the array. Use prefix sums. For each position from right to left with at least 3 elements, check if the sum of all smaller elements is greater than the current element. If so, the perimeter is the sum including this element. Return the maximum such perimeter.

## C# Solution

```csharp
public class Solution
{
    public long LargestPerimeter(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;
        long sum = 0;
        long maxPerimeter = -1;

        for (int i = 0; i < n; i++)
        {
            if (i >= 2 && sum > nums[i])
            {
                maxPerimeter = sum + nums[i];
            }
            sum += nums[i];
        }

        return maxPerimeter;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1)
