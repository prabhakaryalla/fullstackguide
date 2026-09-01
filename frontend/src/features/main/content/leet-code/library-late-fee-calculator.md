# 3687. Library Late Fee Calculator

**Difficulty:** Easy
**Category:** Array
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A library tracks `n` borrowed books using three integer arrays `borrowDays`, `allowedDays`, and `feePerDay`, each of length `n`.

For each book `i`, `allowedDays[i]` is the number of days it may be kept for free. If `borrowDays[i]` (the number of days it was actually kept) exceeds `allowedDays[i]`, a late fee of `feePerDay[i]` is charged for each day beyond the allowed period.

Return the total late fee charged across all books.

### Example

```
Input: borrowDays = [10,5,20], allowedDays = [7,7,14], feePerDay = [2,3,1]
Output: 12
Explanation:
- Book 0: 3 late days x 2 = 6
- Book 1: not late, fee = 0
- Book 2: 6 late days x 1 = 6
Total = 12
```

### Constraints

- `1 <= borrowDays.length == allowedDays.length == feePerDay.length <= 1000`
- `1 <= borrowDays[i], allowedDays[i] <= 365`
- `1 <= feePerDay[i] <= 100`

## Approach

For each book, compute the number of late days as `max(0, borrowDays[i] - allowedDays[i])`, multiply by that book's daily fee, and accumulate the total across all books.

## C# Solution

```csharp
public class Solution
{
    public long CalculateLateFees(int[] borrowDays, int[] allowedDays, int[] feePerDay)
    {
        long total = 0;

        for (int i = 0; i < borrowDays.Length; i++)
        {
            int lateDays = Math.Max(0, borrowDays[i] - allowedDays[i]);
            total += (long)lateDays * feePerDay[i];
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of books.
- **Space:** `O(1)`.
