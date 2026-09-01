# 1997. First Day Where You Have Been in All the Rooms

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

There are `n` rooms starting at room `0` on day `0`. On day `i`, if you are in room `i`, you can move to room `nextVisit[i]` the following day (`nextVisit[i] <= i`), or if you have visited room `i` an odd number of times (including today) go to room `i+1` the next day, or stay if `i == n-1`. Return the day (modulo `10^9 + 7`) on which you first visit every room.

### Example

```
Input: nextVisit = [0,0,2]
Output: 6
Explanation: Simulating the visits day by day, room 2 (the last room) is first reached on day 6.
```

### Constraints

- `n == nextVisit.length`
- `2 <= n <= 10^5`
- `0 <= nextVisit[i] <= i`

## Approach

Let `dp[i]` be the number of days needed to go from first arriving at room `i` to first arriving at room `i+1`. Deriving the recurrence: on the day you first reach room `i` (day count so far accumulated), that visit is odd (1st time), so the next day you go to `nextVisit[i]`; then you need `dp[nextVisit[i]] + dp[nextVisit[i]+1] + ... + dp[i-1]` days to return to room `i` again (making the visit count even), plus 1 more day to move on to `i+1`. Using prefix sums `S[i] = dp[0] + ... + dp[i-1]`, this simplifies to `dp[i] = 2 + S[i] - S[nextVisit[i]]` (mod arithmetic, handled carefully to stay non-negative). The final answer is `S[n-1]` (sum of all `dp[i]` for `i` from `0` to `n-2`), taken modulo `10^9 + 7`.

## C# Solution

```csharp
public class Solution
{
    private const long Mod = 1_000_000_007;

    public int FirstDayBeenInAllRooms(int[] nextVisit)
    {
        int n = nextVisit.Length;
        long[] dp = new long[n];

        for (int i = 1; i < n; i++)
        {
            int prev = nextVisit[i - 1];
            dp[i] = (2 + dp[i - 1] - dp[prev] + 2 * Mod) % Mod;
            dp[i] = (dp[i] + dp[i - 1]) % Mod;
        }

        return (int)(dp[n - 1] % Mod);
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass computing the prefix-sum DP.
- **Space:** `O(n)` for the dp array.
