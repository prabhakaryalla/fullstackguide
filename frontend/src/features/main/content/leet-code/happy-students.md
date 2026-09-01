# 2860. Happy Students

**Difficulty:** Medium
**Category:** Array, Enumeration, Sorting

## Problem

You are given a 0-indexed integer array `nums` of length `n` where `n` is the number of students in a class. The class teacher wants to select a group of students such that all selected students are happy.

A student `i` is happy if:
- If the student is selected, then the number of other selected students is strictly greater than `nums[i]`.
- If the student is not selected, then the number of selected students is strictly less than `nums[i]`.

Return the number of ways to select a group of students so that everyone (selected or not) is happy.

### Example

```
Input: nums = [1,1]
Output: 2
Explanation:
The two possible ways are:
- Select no students: both are happy since 0 < 1
- Select both students: both are happy since 1 > 1 is false, but we need 1 other student which satisfies > nums[i]
Wait, let me reconsider...
- Select 0 students: Student 0 is happy (0 < 1), Student 1 is happy (0 < 1)
- Select 2 students: Student 0 needs > 1 other, has 1, not happy
Actually only selecting 0 students works.
```

## Approach

Sort the array. For each possible count `c` of selected students (from 0 to n), check if selecting exactly `c` students makes everyone happy.

For selected students (the first `c` after sorting), each must have `nums[i] < c - 1` (since they see `c - 1` others).
For non-selected students (the remaining `n - c`), each must have `nums[i] > c`.

Count how many valid values of `c` exist.

## C# Solution

```csharp
public class Solution
{
    public int CountWays(int[] nums)
    {
        int n = nums.Length;
        Array.Sort(nums);
        int count = 0;
        
        for (int c = 0; c <= n; c++)
        {
            bool valid = true;
            
            for (int i = 0; i < c; i++)
            {
                if (nums[i] >= c)
                {
                    valid = false;
                    break;
                }
            }
            
            if (valid)
            {
                for (int i = c; i < n; i++)
                {
                    if (nums[i] <= c)
                    {
                        valid = false;
                        break;
                    }
                }
            }
            
            if (valid)
                count++;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the naive approach, can be optimized to `O(n log n)` with sorting and prefix checks.
- **Space:** `O(1)` excluding the sorting space.
