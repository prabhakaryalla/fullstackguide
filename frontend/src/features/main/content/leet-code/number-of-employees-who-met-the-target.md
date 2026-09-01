# 2798. Number of Employees Who Met the Target

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed integer array `hours` of length `n`, where `hours[i]` is the number of hours worked by the `i`-th employee, and an integer `target`. Return the number of employees who worked at least `target` hours.

### Example

Input: hours = [0,1,2,3,4], target = 2
Output: 3
Explanation: Employees with 2, 3, and 4 hours meet the target.

## Approach

Iterate through `hours` and count every entry that is greater than or equal to `target`.

## C# Solution

```csharp
public class Solution 
{
    public int NumberOfEmployeesWhoMetTarget(int[] hours, int target) 
    {
        int count = 0;
        foreach (int h in hours) 
        {
            if (h >= target) count++;
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
