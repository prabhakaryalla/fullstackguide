# 1904. The Number of Full Rounds You Have Played

**Difficulty:** Medium
**Category:** String

## Problem

A new round of a game starts every 15 minutes on the clock (`00:00`, `00:15`, `00:30`, `00:45`, `01:00`, ...). Given a `loginTime` and `logoutTime` in `"HH:MM"` 24-hour format (where `logoutTime` may be on the next day if it is earlier than `loginTime`), return the number of full 15-minute rounds played between login and logout.

### Example

```
Input: loginTime = "09:31", logoutTime = "10:14"
Output: 1
Explanation: The only full round from 09:45 to 10:00 is fully contained within [09:31, 10:14].
```

### Constraints

- `loginTime` and `logoutTime` are in the format `"HH:MM"`.
- `00 <= HH <= 23`
- `00 <= MM <= 59`
- `loginTime` and `logoutTime` are not equal.

## Approach

Convert both times to minutes since midnight. If `logout < login`, add `1440` (minutes in a day) to `logout` to account for crossing midnight. Round `login` up to the next multiple of 15 and round `logout` down to the previous multiple of 15. The answer is `max(0, (roundedLogout - roundedLogin) / 15)`.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfRounds(string loginTime, string logoutTime)
    {
        int login = ToMinutes(loginTime);
        int logout = ToMinutes(logoutTime);
        if (logout < login) logout += 24 * 60;

        int roundedLogin = (login % 15 == 0) ? login : login + (15 - login % 15);
        int roundedLogout = logout - (logout % 15);

        return Math.Max(0, (roundedLogout - roundedLogin) / 15);
    }

    private int ToMinutes(string time)
    {
        int hh = (time[0] - '0') * 10 + (time[1] - '0');
        int mm = (time[3] - '0') * 10 + (time[4] - '0');
        return hh * 60 + mm;
    }
}
```

## Complexity

- **Time:** `O(1)` — fixed-length string parsing and arithmetic.
- **Space:** `O(1)`.
