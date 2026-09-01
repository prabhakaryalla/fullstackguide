# 3753. Total Waviness of Numbers in Range II

**Difficulty:** Hard
**Category:** Digit DP, Math

## Problem
The **waviness** of a positive integer is defined as the number of positions where a digit is a strict local extremum among its neighbors within the decimal representation (i.e., a digit that is strictly greater than both neighbors, or strictly less than both neighbors; digits at the two ends only have one neighbor and are compared against just that neighbor). Given two integers `l` and `r`, return the sum of the waviness of every integer in the inclusive range `[l, r]`, modulo `10^9 + 7`. This is the harder variant with much larger bounds on `l` and `r`, requiring a digit-DP approach rather than direct enumeration.

## Approach
Compute `f(r) - f(l - 1)` where `f(x)` is the total waviness summed over `[1, x]`. Use digit DP over the decimal digits of `x`. The DP state tracks: current position, the previous placed digit, a 4-way **relation** of the previous digit to *its own* left neighbor (`Start` = no left neighbor yet, `Flat` = equal to left neighbor, `Asc` = greater than left neighbor, `Desc` = less than left neighbor), whether the number is still tight against the prefix of `x` (`isLimit`), and whether we're still in the leading-zero phase. When placing a new digit `d` after `prevDigit`, we can immediately decide whether `prevDigit` becomes a confirmed extremum: if its relation to its left neighbor was `Start` (it has no left neighbor, so a single strict comparison with `d` decides its fate) or `Asc`/`Desc` (it needs a strict opposite comparison on the right to complete a peak/valley), while `Flat` can never become an extremum since one side already ties. At the very end of the digits, the last digit is scored the same way using only its stored relation to its left neighbor, since it has no right neighbor to consider. Memoize on the non-tight states and combine `f(r)` and `f(l-1)` via modular subtraction.

## C# Solution

```csharp
public class Solution 
{
    private const int Mod = 1_000_000_007;
    private const int Start = 0, Flat = 1, Asc = 2, Desc = 3;

    private string digits;
    private Dictionary<string, (long count, long sum)> memo;

    public int TotalWaviness(long l, long r)
    {
        long ans = (Compute(r) - Compute(l - 1) + Mod) % Mod;
        return (int)ans;
    }

    private long Compute(long x)
    {
        if (x <= 0) return 0;
        digits = x.ToString();
        memo = new Dictionary<string, (long, long)>();
        var (_, sum) = Dfs(0, -1, Start, true, true);
        return sum % Mod;
    }

    private (long count, long sum) Dfs(int pos, int prevDigit, int relation, bool isLimit, bool isLeadingZero)
    {
        if (pos == digits.Length)
        {
            bool isEndExtremum = !isLeadingZero && (relation == Asc || relation == Desc);
            return (1, isEndExtremum ? 1 : 0);
        }

        string key = !isLimit ? $"{pos}|{prevDigit}|{relation}|{isLeadingZero}" : null;
        if (key != null && memo.TryGetValue(key, out var cached))
        {
            return cached;
        }

        long totalCount = 0;
        long totalSum = 0;
        int upper = isLimit ? digits[pos] - '0' : 9;

        for (int d = 0; d <= upper; d++)
        {
            bool nextLimit = isLimit && d == upper;
            bool nextLeadingZero = isLeadingZero && d == 0;

            int extremaHere = 0;
            int nextRelation;

            if (nextLeadingZero)
            {
                nextRelation = Start;
            }
            else if (isLeadingZero)
            {
                // d is the first significant digit; it has no left neighbor yet
                nextRelation = Start;
            }
            else if (d == prevDigit)
            {
                nextRelation = Flat;
            }
            else if (d > prevDigit)
            {
                if (relation == Start || relation == Desc) extremaHere = 1;
                nextRelation = Asc;
            }
            else
            {
                if (relation == Start || relation == Asc) extremaHere = 1;
                nextRelation = Desc;
            }

            var (cnt, sm) = Dfs(pos + 1, d, nextRelation, nextLimit, nextLeadingZero);
            totalCount = (totalCount + cnt) % Mod;
            totalSum = (totalSum + sm + (long)extremaHere * cnt) % Mod;
        }

        var result = (totalCount, totalSum);
        if (key != null)
        {
            memo[key] = result;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(D^2) per query where D is the number of digits (states bounded by position, previous digit, trend)
- **Space:** O(D^2)
