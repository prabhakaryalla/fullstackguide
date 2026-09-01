# 2358. Maximum Number of Groups Entering a Competition

**Difficulty:** Medium
**Category:** Array, Math, Binary Search, Greedy

## Problem

You are given a positive integer array `grades` which represents the grades of students in a university. You would like to enter all these students into a competition in ordered non-empty groups, such that the ordering meets the following conditions:

- The sum of the grades of students in the `i-th` group is less than the sum of the grades of students in the `(i + 1)-th` group, for all groups (except the last).
- The total number of students in the `i-th` group is less than the total number of students in the `(i + 1)-th` group, for all groups (except the last).

Return the maximum number of groups that can be formed.

### Example

```
Input: grades = [10,6,12,7,3,5]
Output: 3
Explanation: Can form groups [3], [6,7], [5,10,12]
```

## Approach

The optimal strategy is to sort and use groups of increasing sizes: 1, 2, 3, ... Find the largest k such that 1 + 2 + ... + k <= n. This is equivalent to k * (k + 1) / 2 <= n, which can be solved with the quadratic formula.

## C# Solution

```csharp
public class Solution
{
    public int MaximumGroups(int[] grades)
    {
        int n = grades.Length;
        int k = (int)((Math.Sqrt(1 + 8.0 * n) - 1) / 2);
        return k;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
