# 2966. Divide Array Into Arrays With Max Difference

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

You are given an integer array `nums` of size `n` (where `n` is a multiple of 3) and a positive integer `k`.

Divide the array into `n/3` arrays of size 3 such that:
- Each element belongs to exactly one array
- The difference between any two elements in an array is at most `k`

Return a 2D array containing the division. If it's not possible, return an empty 2D array.

### Example

```
Input: nums = [1, 3, 4, 8, 7, 9, 3, 5, 1], k = 2
Output: [[1, 1, 3], [3, 4, 5], [7, 8, 9]]
Explanation: After sorting, we can group consecutive triplets.

Input: nums = [1, 3, 3, 2, 7, 3], k = 3
Output: []
```

## Approach

Sort the array. Try to group consecutive triplets. For each triplet, check if the difference between the maximum and minimum element is at most `k`. If all triplets satisfy this, return the result; otherwise, return an empty array.

## C# Solution

```csharp
public class Solution
{
    public int[][] DivideArray(int[] nums, int k)
    {
        Array.Sort(nums);
        int n = nums.Length;
        var result = new List<int[]>();

        for (int i = 0; i < n; i += 3)
        {
            int min = nums[i];
            int max = nums[i + 2];

            if (max - min > k)
            {
                return new int[0][];
            }

            result.Add(new int[] { nums[i], nums[i + 1], nums[i + 2] });
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the result array
