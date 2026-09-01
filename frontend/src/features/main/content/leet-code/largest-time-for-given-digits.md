# 949. Largest Time for Given Digits

**Difficulty:** Medium
**Category:** Array, Enumeration

## Problem

Given an array of 4 digits, return the largest 24-hour time (`"HH:MM"`) that can be made using each digit exactly once, or an empty string if no valid time can be formed.

### Example

```
Input: arr = [1,2,3,4]
Output: "23:41"
```

## Approach

There are only `4! = 24` permutations of the 4 digits, so brute-force every arrangement into an hour (first two digits) and minute (last two digits), keeping the largest valid time (`hour < 24`, `minute < 60`) found via ordinal string comparison.

## C# Solution

```csharp
public class Solution
{
    public string LargestTimeFromDigits(int[] arr)
    {
        string best = "";
        Permute(arr, 0);
        return best;

        void Permute(int[] a, int start)
        {
            if (start == a.Length)
            {
                int h = a[0] * 10 + a[1];
                int m = a[2] * 10 + a[3];

                if (h < 24 && m < 60)
                {
                    string time = $"{h:D2}:{m:D2}";
                    if (string.Compare(time, best, StringComparison.Ordinal) > 0) best = time;
                }

                return;
            }

            for (int i = start; i < a.Length; i++)
            {
                (a[start], a[i]) = (a[i], a[start]);
                Permute(a, start + 1);
                (a[start], a[i]) = (a[i], a[start]);
            }
        }
    }
}
```

## Complexity

- **Time:** `O(1)` — at most `24` permutations of 4 digits.
- **Space:** `O(1)`.
