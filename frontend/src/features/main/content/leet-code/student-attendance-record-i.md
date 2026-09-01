# 551. Student Attendance Record I

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `s` representing an attendance record made of `'A'` (absent), `'L'` (late), and `'P'` (present), return `true` if the student is eligible for an attendance award — at most one absence total, and never late for 3 or more consecutive days.

### Example

```
Input: s = "PPALLP"
Output: true
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of only `'A'`, `'L'`, and `'P'`.

## Approach

Scan the record once, tracking the total absence count and the length of the current consecutive-late streak (resetting it whenever a non-`'L'` character appears). Fail immediately if absences reach 2 or the late streak reaches 3.

## C# Solution

```csharp
public class Solution
{
    public bool CheckRecord(string s)
    {
        int absentCount = 0;
        int consecutiveLate = 0;

        foreach (var c in s)
        {
            if (c == 'A')
            {
                absentCount++;
                if (absentCount >= 2) return false;
            }

            consecutiveLate = c == 'L' ? consecutiveLate + 1 : 0;
            if (consecutiveLate >= 3) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
