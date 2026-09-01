# 1386. Cinema Seat Allocation

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation

## Problem

Given an `n x 10` cinema and a list of already-reserved `[row, seatNumber]` seats, return the maximum number of four-person family groups that can be seated together in one of the three fixed column blocks `[2,3,4,5]`, `[4,5,6,7]`, or `[6,7,8,9]` within a row.

### Example

```
Input: n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]
Output: 4
```

## Approach

Record each row's reserved seats as a bitmask. For rows with reservations, check each of the three four-seat blocks against the mask to see which are free, place at most two non-overlapping families per row using the block combinations (`[2,3,4,5]` with `[6,7,8,9]` together, or either the left, middle, or right block alone). Every unmentioned row can seat exactly two families.

## C# Solution

```csharp
public class Solution
{
    public int MaxNumberOfFamilies(int n, int[][] reservedSeats)
    {
        var rowMasks = new Dictionary<int, int>();

        foreach (var seat in reservedSeats)
        {
            int row = seat[0], col = seat[1];
            if (col < 2 || col > 9) continue;

            int bit = 1 << (col - 2);
            rowMasks[row] = rowMasks.GetValueOrDefault(row, 0) | bit;
        }

        int left = 0b0001111;
        int middle = 0b0111100;
        int right = 0b1111000;

        int total = (n - rowMasks.Count) * 2;

        foreach (var mask in rowMasks.Values)
        {
            if ((mask & left) == 0 && (mask & right) == 0)
            {
                total += 2;
            }
            else if ((mask & left) == 0 || (mask & middle) == 0 || (mask & right) == 0)
            {
                total += 1;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(reservedSeats.Length)`.
- **Space:** `O(distinct reserved rows)`.
