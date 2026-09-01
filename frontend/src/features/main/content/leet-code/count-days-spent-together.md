# 2409. Count Days Spent Together

**Difficulty:** Easy
**Category:** String, Math

## Problem

Alice and Bob are traveling to Rome for separate business trips. You are given 4 strings `arriveAlice`, `leaveAlice`, `arriveBob`, and `leaveBob`. Alice will be in the city from the dates `arriveAlice` to `leaveAlice` (inclusive), while Bob will be in the city from the dates `arriveBob` to `leaveBob` (inclusive). Each will be a 5-character string in the format `"MM-DD"`, corresponding to the month and day of the date.

Return the total number of days that Alice and Bob are in Rome together. Assume all dates are in the same calendar year (non-leap year).

### Example

```
Input: arriveAlice = "08-15", leaveAlice = "08-18", arriveBob = "08-16", leaveBob = "08-19"
Output: 3
Explanation: Alice is in Rome from August 15 to August 18. Bob is in Rome from August 16 to August 19. They are both in Rome on August 16, 17, and 18.
```

## Approach

Convert each date to day-of-year. Find the overlap between the two intervals by taking the maximum of arrival dates and minimum of departure dates. If the overlap is valid, return the difference plus one; otherwise return zero.

## C# Solution

```csharp
public class Solution
{
    private int[] daysInMonth = new int[] { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
    
    public int CountDaysTogether(string arriveAlice, string leaveAlice, string arriveBob, string leaveBob)
    {
        int aliceArrive = ConvertToDay(arriveAlice);
        int aliceLeave = ConvertToDay(leaveAlice);
        int bobArrive = ConvertToDay(arriveBob);
        int bobLeave = ConvertToDay(leaveBob);
        
        int start = Math.Max(aliceArrive, bobArrive);
        int end = Math.Min(aliceLeave, bobLeave);
        
        return Math.Max(0, end - start + 1);
    }
    
    private int ConvertToDay(string date)
    {
        int month = int.Parse(date.Substring(0, 2));
        int day = int.Parse(date.Substring(3, 2));
        
        int dayOfYear = day;
        for (int i = 0; i < month - 1; i++)
        {
            dayOfYear += daysInMonth[i];
        }
        
        return dayOfYear;
    }
}
```

## Complexity

- **Time:** O(1) since months are constant
- **Space:** O(1)
