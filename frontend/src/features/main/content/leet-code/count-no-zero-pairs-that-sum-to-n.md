# 3704. Count No-Zero Pairs That Sum to N

**Difficulty:** Hard
**Category:** Digit DP, Math

## Problem

Given a long integer `n`, count the number of pairs `(a, b)` with `a + b = n`, `a >= 1`, `b >= 1`, such that neither `a` nor `b` contains the digit `0` in its decimal representation.

### Example

Input: `n = 21`
Output: `4`
Explanation: Valid pairs are `(1,20)` is invalid (20 has a 0), but pairs like `(12,9)`, `(9,12)`, `(13,8)`, `(8,13)` etc. are counted where neither addend contains a zero digit.

## Approach

Digit DP processing digits of `n` from least to most significant, tracking the running carry and whether `a` and/or `b` are still "active" (still contributing a real digit at this position, each digit forced into `1..9`). At each position, try every valid `(da, db)` combination consistent with the carry and target digit, and branch on whether each number ends here or continues, provided more positions remain. Memoize on `(pos, carry, aActive, bActive)`.

## C# Solution

```csharp
public class Solution 
{
    private List<int> digits;
    private Dictionary<(int, int, bool, bool), long> memo;

    public long CountNoZeroPairs(long n) 
    {
        digits = new List<int>();
        long temp = n;
        while (temp > 0) 
        {
            digits.Add((int)(temp % 10));
            temp /= 10;
        }
        memo = new Dictionary<(int, int, bool, bool), long>();
        return Solve(0, 0, true, true);
    }

    private long Solve(int pos, int carry, bool aActive, bool bActive) 
    {
        if (pos == digits.Count) 
        {
            return (carry == 0 && !aActive && !bActive) ? 1L : 0L;
        }
        var key = (pos, carry, aActive, bActive);
        if (memo.TryGetValue(key, out long cached)) return cached;

        int target = digits[pos];
        bool canContinue = pos + 1 < digits.Count;
        long total = 0;

        int aStart = aActive ? 1 : 0;
        int aEnd = aActive ? 9 : 0;
        int bStart = bActive ? 1 : 0;
        int bEnd = bActive ? 9 : 0;

        for (int da = aStart; da <= aEnd; da++) 
        {
            for (int db = bStart; db <= bEnd; db++) 
            {
                int sum = da + db + carry;
                if (sum % 10 != target) continue;
                int nextCarry = sum / 10;

                bool[] nextAOptions = aActive ? (canContinue ? new[] { true, false } : new[] { false }) : new[] { false };
                bool[] nextBOptions = bActive ? (canContinue ? new[] { true, false } : new[] { false }) : new[] { false };

                foreach (bool nextA in nextAOptions) 
                {
                    foreach (bool nextB in nextBOptions) 
                    {
                        total += Solve(pos + 1, nextCarry, nextA, nextB);
                    }
                }
            }
        }

        memo[key] = total;
        return total;
    }
}
```

## Complexity

- **Time:** O(log(n) * constant states)
- **Space:** O(log n)
