# 1109. Corporate Flight Bookings

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

There are `n` flights numbered `1` to `n`. Given `bookings[i] = [firsti, lasti, seatsi]`, meaning `seatsi` seats were reserved on every flight from `firsti` to `lasti` inclusive, return an array of length `n` with the total seats reserved on each flight.

### Example

```
Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10,55,45,25,25]
```

## Approach

Use a difference array: add `seats` at index `first - 1` and subtract it just after index `last - 1`. A single prefix-sum pass over the difference array then reconstructs the total seats booked on each flight.

## C# Solution

```csharp
public class Solution
{
    public int[] CorpFlightBookings(int[][] bookings, int n)
    {
        int[] diff = new int[n + 1];

        foreach (var b in bookings)
        {
            diff[b[0] - 1] += b[2];
            diff[b[1]] -= b[2];
        }

        int[] result = new int[n];
        int running = 0;

        for (int i = 0; i < n; i++)
        {
            running += diff[i];
            result[i] = running;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + bookings.Length)`.
- **Space:** `O(n)` for the difference array.
