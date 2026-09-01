# 2224. Minimum Number of Operations to Convert Time

**Difficulty:** Easy
**Category:** String, Greedy

## Problem

You are given two strings `current` and `correct` representing two 24-hour times.

24-hour times are formatted as "HH:MM", where HH is between 00 and 23, and MM is between 00 and 59.

You can increment the time `current` in increments of 1, 5, 15, or 60 minutes. You can perform this operation any number of times.

Return the minimum number of operations needed to convert `current` to `correct`.

### Example

```
Input: current = "02:30", correct = "04:35"
Output: 3
Explanation: Convert current to correct as follows:
- Add 60 minutes: "02:30" -> "03:30"
- Add 60 minutes: "03:30" -> "04:30"
- Add 5 minutes: "04:30" -> "04:35"
Total operations = 3
```

## Approach

1. Convert both times to minutes from midnight
2. Calculate the difference in minutes
3. Greedily use the largest increments first: 60, 15, 5, then 1

## C# Solution

```csharp
public class Solution
{
    public int ConvertTime(string current, string correct)
    {
        int currentMinutes = TimeToMinutes(current);
        int correctMinutes = TimeToMinutes(correct);
        
        int diff = correctMinutes - currentMinutes;
        int operations = 0;
        
        int[] increments = {60, 15, 5, 1};
        
        foreach (int inc in increments)
        {
            operations += diff / inc;
            diff %= inc;
        }
        
        return operations;
    }
    
    private int TimeToMinutes(string time)
    {
        string[] parts = time.Split(':');
        int hours = int.Parse(parts[0]);
        int minutes = int.Parse(parts[1]);
        return hours * 60 + minutes;
    }
}
```

## Complexity

- **Time:** O(1), constant time operations
- **Space:** O(1)
