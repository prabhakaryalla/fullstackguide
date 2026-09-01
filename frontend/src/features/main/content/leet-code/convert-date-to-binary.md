# 3280. Convert Date to Binary

**Difficulty:** Easy
**Category:** Math, String

## Problem

You are given a date string `date` in the format `"YYYY-MM-DD"`. Convert each of the year, month, and day components to its binary representation (without leading zeros) and return the result joined by hyphens in the same order.

### Example

```
Input: date = "2080-02-29"
Output: "100000100000-10-11101"
```

## Approach

Split the input string on `'-'` to get the year, month, and day as separate strings. Parse each as an integer and convert it to its binary string representation. Join the three binary strings back together with `'-'`.

## C# Solution

```csharp
public class Solution 
{
    public string ConvertDateToBinary(string date) 
    {
        string[] parts = date.Split('-');
        string year = Convert.ToString(int.Parse(parts[0]), 2);
        string month = Convert.ToString(int.Parse(parts[1]), 2);
        string day = Convert.ToString(int.Parse(parts[2]), 2);

        return year + "-" + month + "-" + day;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
