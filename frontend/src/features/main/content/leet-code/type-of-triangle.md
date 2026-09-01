# 3024. Type of Triangle

**Difficulty:** Easy
**Category:** Array, Math, Sorting

## Problem

You are given a 0-indexed integer array `nums` of size `3`, representing the side lengths of a triangle. Classify the triangle:

- Return `"none"` if the three sides can't form a valid triangle.
- Return `"equilateral"` if all three sides are equal.
- Return `"isosceles"` if exactly two sides are equal.
- Return `"scalene"` if all three sides are different.

### Example

```
Input: nums = [3,3,3]
Output: "equilateral"

Input: nums = [3,4,5]
Output: "scalene"
```

## Approach

Sort the three sides so the largest is last. A valid triangle requires the sum of the two smaller sides to strictly exceed the largest side (the triangle inequality); otherwise it's `"none"`. Otherwise, compare the sorted values pairwise to classify it as equilateral, isosceles, or scalene.

## C# Solution

```csharp
public class Solution {
    public string TriangleType(int[] nums) {
        Array.Sort(nums);
        if (nums[0] + nums[1] <= nums[2])
            return "none";
        if (nums[0] == nums[1] && nums[1] == nums[2])
            return "equilateral";
        if (nums[0] == nums[1] || nums[1] == nums[2])
            return "isosceles";
        return "scalene";
    }
}
```

## Complexity

- Time: O(1) — sorting a fixed-size array of 3 elements.
- Space: O(1).
