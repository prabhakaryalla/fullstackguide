# 2576. Find the Maximum Number of Marked Indices

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Greedy, Sorting

## Problem

You are given a 0-indexed integer array `nums`.

Initially, all of the indices are unmarked. You are allowed to make this operation any number of times:

- Pick two different unmarked indices `i` and `j` such that `2 * nums[i] <= nums[j]`, then mark `i` and `j`.

Return the maximum possible number of marked indices in `nums`.

### Example

```
Input: nums = [3,5,2,4]
Output: 2
Explanation:
Mark indices 2 and 3: 2*2 <= 4
Total marked = 2

Input: nums = [9,2,5,4]
Output: 4
Explanation:
Mark 0 and 2: 2*2 <= 5? No, 4 <= 5? Yes
Mark 1 and 3: 2*2 <= 4? Yes
Total marked = 4

Input: nums = [7,6,8]
Output: 0
```

## Approach

Sort the array. Use a greedy two-pointer approach:

1. Sort `nums`
2. Try to pair elements from the first half with elements from the second half
3. Use two pointers: `i` starting from 0, `j` starting from `n/2`
4. If `2 * nums[i] <= nums[j]`, we can pair them (increment both pointers)
5. Otherwise, try the next larger element in the second half (increment `j` only)

The answer is `2 * pairs` (each pair marks 2 indices).

## C# Solution

```csharp
public class Solution
{
    public int MaxNumOfMarkedIndices(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;
        int i = 0, j = (n + 1) / 2;
        int pairs = 0;
        
        while (i < (n + 1) / 2 && j < n)
        {
            if (2 * nums[i] <= nums[j])
            {
                pairs++;
                i++;
                j++;
            }
            else
            {
                j++;
            }
        }
        
        return pairs * 2;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1) excluding sort space
