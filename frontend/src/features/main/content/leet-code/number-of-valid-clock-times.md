# 2437. Number of Valid Clock Times

**Difficulty:** Easy
**Category:** String, Enumeration

## Problem

You are given a string `time` in the format "HH:MM" where some digits are hidden (represented by `?`). Return the number of different valid clock times that can be formed by replacing each `?` with a digit from 0 to 9.

Valid times are in 24-hour format where hours range from 00 to 23 and minutes range from 00 to 59.

### Example

```
Input: time = "?5:00"
Output: 2
Explanation: The two valid times are "05:00" and "15:00".
```

## Approach

Check each `?` position and count valid digit choices based on constraints:
- First hour digit: 0-2 (but if second hour digit is known and > 3, first must be 0 or 1)
- Second hour digit: depends on first digit (0-9 if first is 0 or 1, else 0-3 if first is 2)
- First minute digit: 0-5
- Second minute digit: 0-9

Multiply the number of choices for each position.

## C# Solution

```csharp
public class Solution
{
    public int CountTime(string time)
    {
        int count = 1;
        
        // Hour positions
        char h1 = time[0];
        char h2 = time[1];
        
        if (h1 == '?' && h2 == '?')
        {
            count *= 24; // 00-23
        }
        else if (h1 == '?')
        {
            count *= (h2 >= '0' && h2 <= '3') ? 3 : 2; // 0-2 or 0-1
        }
        else if (h2 == '?')
        {
            count *= (h1 == '2') ? 4 : 10; // 0-3 or 0-9
        }
        
        // Minute positions
        if (time[3] == '?') count *= 6; // 0-5
        if (time[4] == '?') count *= 10; // 0-9
        
        return count;
    }
}
```

## Complexity

- **Time:** O(1) - constant number of operations
- **Space:** O(1)
