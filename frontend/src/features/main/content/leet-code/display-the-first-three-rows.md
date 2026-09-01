# 2879. Display the First Three Rows

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `employees` containing columns `employee_id`, `name`, `department`, and `salary`. Write a solution to display the first 3 rows of this data set.

## Approach
This problem is originally solved with the Python pandas library using `DataFrame.head(3)`, which returns the first `n` rows of a `DataFrame`. Since this repository targets C#, the data set is modeled as a `List<Dictionary<string, object>>` (one dictionary per row, keyed by column name), and the pandas `head` operation is adapted to a simple `Take` over the list.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> SelectFirstRows(List<Dictionary<string, object>> employees) 
    {
        return employees.Take(3).ToList();
    }
}
```

## Complexity

- **Time:** O(1) — only the first 3 rows are copied, regardless of table size.
- **Space:** O(1) — the returned list holds at most 3 rows.
