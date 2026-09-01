# 2567. Minimum Score by Changing Two Elements

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

You are given a 0-indexed integer array `nums`.

- The low score of `nums` is the minimum value of `|nums[i] - nums[j]|` over all `0 <= i < j < nums.length`.
- The high score of `nums` is the maximum value of `|nums[i] - nums[j]|` over all `0 <= i < j < nums.length`.
- The score of `nums` is the sum of the high and low scores.

To minimize the score of `nums`, you can change the value of at most two elements. Return the minimum possible score.

### Example

```
Input: nums = [1,4,3]
Output: 0
Explanation: Change nums to [3,3,3]. Low score = 0, high score = 0, total = 0.

Input: nums = [1,4,7,8,5]
Output: 3
Explanation: Change to [4,4,4,5,5] or similar. Best score = 3.
```

## Approach

Sort the array. The high score is initially `nums[n-1] - nums[0]`.

To minimize the score, we want to reduce both the range and minimum difference. The optimal strategy:
- Change up to 2 extreme values (smallest or largest)
- Try changing: 0 elements, 1 smallest, 1 largest, 2 smallest, 2 largest, or 1 smallest + 1 largest

After sorting, try these scenarios:
1. Change nums[0] and nums[1] to nums[2]
2. Change nums[n-1] and nums[n-2] to nums[n-3]
3. Change nums[0] to nums[2] and nums[n-1] to nums[n-2]
4. Change nums[0] to nums[1] and nums[n-1] to nums[n-2]

Calculate score for each and return minimum.

## C# Solution

```csharp
public class Solution
{
    public int MinimizeSum(int[] nums)
    {
        int n = nums.Length;
        if (n <= 3) return 0;
        
        Array.Sort(nums);
        
        // Option 1: Change 2 smallest
        int option1 = nums[n - 1] - nums[2];
        
        // Option 2: Change 2 largest
        int option2 = nums[n - 3] - nums[0];
        
        // Option 3: Change 1 smallest and 1 largest
        int option3 = nums[n - 2] - nums[1];
        
        return Math.Min(option1, Math.Min(option2, option3));
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1)
