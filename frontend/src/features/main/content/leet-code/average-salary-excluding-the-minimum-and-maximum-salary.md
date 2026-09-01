# 1491. Average Salary Excluding the Minimum and Maximum Salary

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an array `salary` of unique salaries, return the average salary after excluding both the minimum and the maximum values.

### Example

```
Input: salary = [4000,3000,1000,2000]
Output: 2500.00000
```

## Approach

Find the minimum and maximum values in a single pass, subtract both from the total sum, and divide by the count minus two.

## C# Solution

```csharp
public class Solution
{
    public double Average(int[] salary)
    {
        int min = salary.Min();
        int max = salary.Max();
        int sum = salary.Sum() - min - max;
        int count = salary.Length - 2;

        return (double)sum / count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
