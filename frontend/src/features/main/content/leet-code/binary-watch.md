# 401. Binary Watch

**Difficulty:** Easy
**Category:** Backtracking, Bit Manipulation

## Problem

A binary watch has 4 LEDs on top representing the hours (0-11) and 6 LEDs on the bottom representing the minutes (0-59). Given an integer `turnedOn` representing the number of LEDs that are currently on, return all possible times the watch could represent, in any order.

### Example

```
Input: turnedOn = 1
Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
```

### Constraints

- `0 <= turnedOn <= 10`

## Approach

Since the ranges of hours (`0`-`11`) and minutes (`0`-`59`) are both small, brute-force every combination directly: for each hour and minute pair, count the total set bits across both values, and keep the pair whenever that count matches `turnedOn`.

## C# Solution

```csharp
public class Solution
{
    public IList<string> ReadBinaryWatch(int turnedOn)
    {
        var result = new List<string>();

        for (int h = 0; h < 12; h++)
        {
            for (int m = 0; m < 60; m++)
            {
                if (BitCount(h) + BitCount(m) == turnedOn)
                    result.Add($"{h}:{m:D2}");
            }
        }

        return result;
    }

    private int BitCount(int n)
    {
        int count = 0;
        while (n > 0)
        {
            count += n & 1;
            n >>= 1;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by the fixed `12 * 60` combinations.
- **Space:** `O(1)` extra, excluding the output list.
