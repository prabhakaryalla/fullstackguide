# 2125. Number of Laser Beams in a Bank

**Difficulty:** Medium
**Category:** Array, String, Math

## Problem

Security devices are represented as '1' in a binary string matrix. Laser beams connect devices in different rows (not vertically). Return the total number of laser beams in the bank.

### Example

```
Input: bank = ["011001","000000","010100","001000"]
Output: 8
Explanation: Beams connect between rows with devices.
```

## Approach

Count devices in each row. For each pair of consecutive non-empty rows, multiply their device counts to get beams between them. Sum all such products.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfBeams(string[] bank)
    {
        int total = 0;
        int prevCount = 0;
        
        foreach (string row in bank)
        {
            int count = row.Count(c => c == '1');
            if (count > 0)
            {
                total += prevCount * count;
                prevCount = count;
            }
        }
        
        return total;
    }
}
```

## Complexity

- **Time:** O(m * n) where m is rows and n is columns
- **Space:** O(1)
