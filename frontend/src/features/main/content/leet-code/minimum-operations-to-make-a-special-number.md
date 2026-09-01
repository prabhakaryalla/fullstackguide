# 2844. Minimum Operations to Make a Special Number

**Difficulty:** Medium
**Category:** Math, String, Greedy, Enumeration

## Problem

You are given a 0-indexed string num representing a non-negative integer. In one operation, you can delete any digit of num.

Return the minimum number of operations required to make num special. A number is special if it is divisible by 25.

### Example

```
Input: num = "2245047"
Output: 2
Explanation: Delete digits at indices 3 and 6 to get "22450" which is divisible by 25
```

## Approach

A number is divisible by 25 if it ends in 00, 25, 50, or 75.

We try to form each of these endings by finding the rightmost occurrence of the second digit, then finding the rightmost occurrence of the first digit that comes before it.

For each valid ending pattern:
- Count how many digits need to be removed from the right to expose the second digit
- Count how many digits need to be removed between the two digits
- Account for leading zeros after removal

Take the minimum across all possible endings.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(string num)
    {
        int n = num.Length;
        int minOps = n; // worst case: delete all digits to get "0"
        
        string[] endings = new string[] { "00", "25", "50", "75" };
        
        foreach (string ending in endings)
        {
            int ops = FindOperations(num, ending[0], ending[1]);
            minOps = Math.Min(minOps, ops);
        }
        
        // Special case: if we remove all non-zero digits, we get "0"
        int zeroCount = 0;
        foreach (char c in num)
        {
            if (c == '0')
                zeroCount++;
        }
        
        if (zeroCount > 0)
            minOps = Math.Min(minOps, n - 1);
        
        return minOps;
    }
    
    private int FindOperations(string num, char first, char second)
    {
        int n = num.Length;
        int secondPos = -1;
        
        // Find rightmost occurrence of second digit
        for (int i = n - 1; i >= 0; i--)
        {
            if (num[i] == second)
            {
                secondPos = i;
                break;
            }
        }
        
        if (secondPos == -1)
            return int.MaxValue;
        
        // Find rightmost occurrence of first digit before second digit
        int firstPos = -1;
        for (int i = secondPos - 1; i >= 0; i--)
        {
            if (num[i] == first)
            {
                firstPos = i;
                break;
            }
        }
        
        if (firstPos == -1)
            return int.MaxValue;
        
        // Count operations: digits after secondPos + digits between firstPos and secondPos
        int ops = (n - 1 - secondPos) + (secondPos - firstPos - 1);
        
        // Check if result would be "0" or empty
        if (firstPos == 0 && first == '0')
        {
            // All remaining digits are 0, result is "0"
            bool allZeros = true;
            for (int i = 0; i < firstPos; i++)
            {
                if (num[i] != '0')
                {
                    allZeros = false;
                    break;
                }
            }
        }
        
        return ops;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of num (we try 4 endings, each taking O(n))
- **Space:** O(1) for auxiliary variables
