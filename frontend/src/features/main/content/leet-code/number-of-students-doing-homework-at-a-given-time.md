# 1450. Number of Students Doing Homework at a Given Time

**Difficulty:** Easy
**Category:** Array

## Problem

Given `startTime[i]` and `endTime[i]` representing when student `i` started and finished their homework, and a `queryTime`, return the number of students who were doing homework at exactly `queryTime` (inclusive on both ends).

### Example

```
Input: startTime = [1,2,3], endTime = [3,2,7], queryTime = 4
Output: 1
```

## Approach

Iterate through all students and count how many have `startTime[i] <= queryTime <= endTime[i]`.

## C# Solution

```csharp
public class Solution
{
    public int BusyStudent(int[] startTime, int[] endTime, int queryTime)
    {
        int count = 0;

        for (int i = 0; i < startTime.Length; i++)
            if (startTime[i] <= queryTime && queryTime <= endTime[i])
                count++;

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
