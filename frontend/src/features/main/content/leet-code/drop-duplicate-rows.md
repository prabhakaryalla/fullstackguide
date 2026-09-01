# 2882. Drop Duplicate Rows

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `customers` containing columns `customer_id`, `name`, and `email`. Some customers appear more than once with the same `email`. Write a solution to remove all duplicate rows based on the `email` column, keeping only the first occurrence of each email.

## Approach
Pandas exposes this directly via `customers.drop_duplicates(subset='email')`, which keeps the first occurrence by default. Adapted to C#, iterate the rows in order while tracking which emails have already been seen in a `HashSet<string>`, keeping only the first row for each distinct email.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> DropDuplicateEmails(List<Dictionary<string, object>> customers) 
    {
        var seen = new HashSet<string>();
        var result = new List<Dictionary<string, object>>();

        foreach (var row in customers) 
        {
            string email = (string)row["email"];
            if (seen.Add(email)) 
            {
                result.Add(row);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `customers`.
- **Space:** O(n) for the set of seen emails.
