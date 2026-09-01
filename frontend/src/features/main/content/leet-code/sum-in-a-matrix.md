# 2679. Sum in a Matrix

**Difficulty:** Medium
**Category:** Array, Matrix, Sorting, Simulation

## Problem

You are given a 0-indexed 2D integer array `nums`. Initially, your score is `0`. Perform the following operation until `nums` becomes empty:

- From each row in `nums`, select the largest number and remove it. Among all the numbers removed in this step, add the maximum to your score.

Return the final score.

### Example

```
Input: nums = [[7,2,1],[6,4,2],[6,5,3],[3,2,1]]
Output: 15
Explanation:
Step 1: Remove [7,6,6,3], max = 7, score = 7
Step 2: Remove [2,4,5,2], max = 5, score = 7 + 5 = 12
Step 3: Remove [1,2,3,1], max = 3, score = 12 + 3 = 15

Input: nums = [[1]]
Output: 1
```

## Approach

Sort each row in descending order. Then iterate through columns from left to right. In each iteration, find the maximum value in that column and add it to the score.

## C# Solution

```csharp
public class Solution
{
    public int MatrixSum(int[][] nums)
    {
        int m = nums.Length;
        int n = nums[0].Length;
        
        foreach (var row in nums)
        {
            Array.Sort(row);
            Array.Reverse(row);
        }
        
        int score = 0;
        
        for (int col = 0; col < n; col++)
        {
            int maxInColumn = 0;
            for (int row = 0; row < m; row++)
            {
                maxInColumn = Math.Max(maxInColumn, nums[row][col]);
            }
            score += maxInColumn;
        }
        
        return score;
    }
}
```

## Complexity

- **Time:** O(m * n * log n) for sorting each row
- **Space:** O(1) excluding the input
