# 2545. Sort the Students by Their Kth Score

**Difficulty:** Medium
**Category:** Array, Matrix, Sorting

## Problem

You are given an `m x n` integer matrix `score` and an integer `k`. Each row represents one student, and `score[i][j]` denotes the score of the `i-th` student in the `j-th` exam.

Return the matrix after sorting it in descending order by the students' scores in the `k-th` (0-indexed) exam.

### Example

```
Input: score = [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2
Output: [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
Explanation: Sort by column 2: [11, 9, 3], descending gives this order.
```

## Approach

Sort the rows of the matrix based on the value at index k in descending order.

## C# Solution

```csharp
public class Solution
{
    public int[][] SortTheStudents(int[][] score, int k)
    {
        Array.Sort(score, (a, b) => b[k].CompareTo(a[k]));
        return score;
    }
}
```

## Complexity

- **Time:** O(m × log m) where m is the number of students
- **Space:** O(1) if we exclude the sorting space
