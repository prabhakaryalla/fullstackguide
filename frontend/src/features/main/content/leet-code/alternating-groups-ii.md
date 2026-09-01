# 3208. Alternating Groups II

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem
This is the generalized version of "Alternating Groups I": balls are arranged in a circle, each colored red or blue. Given an integer `k`, count the number of "alternating groups" of exactly size `k` — that is, the number of starting positions such that the `k` consecutive balls (wrapping around the circle if needed) starting there strictly alternate in color.

## Approach
Traverse the circular array (conceptually unrolled by iterating slightly past `n` to handle wraparound properly), maintaining a running count of how many consecutive balls so far have alternated correctly with their immediate predecessor. Whenever two adjacent balls (current and previous, in circular order) share the same color, reset this running alternating-streak counter to 1 (since the streak breaks and restarts fresh); otherwise, increment the streak. Every time the streak reaches at least `k`, it means a valid alternating group of size `k` ends at the current position, so increment the answer.

## C# Solution
```csharp
public class Solution {
    public int NumberOfAlternatingGroups(int[] colors, int k) {
        int n = colors.Length;
        int ans = 0;
        int alternating = 1;

        for (int i = 0; i < n + k - 2; i++) {
            alternating = colors[i % n] == colors[(i - 1 + n) % n] ? 1 : alternating + 1;
            if (alternating >= k)
                ans++;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n + k)
- Space: O(1)
