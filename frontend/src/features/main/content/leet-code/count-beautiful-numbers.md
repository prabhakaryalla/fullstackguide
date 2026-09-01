# 3490. Count Beautiful Numbers

**Difficulty:** Hard
**Category:** Dynamic Programming

## Problem
You are given two positive integers `l` and `r`. A positive integer is **beautiful** if the product of its digits is divisible by the sum of its digits.

Return the count of beautiful numbers in the range `[l, r]`, inclusive.

### Example
Input: `l = 10`, `r = 20`
Output: `2`
Explanation: `10` has digit sum 1 and digit product 0 (`0 % 1 == 0`), so it is beautiful. `20` similarly has sum 2, product 0. All other numbers in the range (11-19) fail the divisibility check, so the count is 2.

## Approach
Use digit DP to count beautiful numbers in `[1, n]`, then answer with `Count(r) - Count(l - 1)`.

Process the number digit by digit, tracking: the current position, whether the digits chosen so far are still tied to the upper bound (`tight`), whether we are still in a run of leading zeros (`leading`), whether a non-leading zero digit has already appeared (`hasZero`), the running digit sum, and the running digit product. Once a non-leading zero digit appears, the product is permanently 0, which is always divisible by any positive sum — so as soon as `hasZero` becomes true and we're no longer bound by `tight`, every completion of the remaining digits is beautiful, letting us shortcut directly to `10^(remaining digits)` instead of continuing to branch. Otherwise, at the final position, the number is beautiful exactly when `product % sum == 0`. Memoize on the non-tight states to avoid recomputation.

## C# Solution

```csharp
public class Solution {
    private string s;
    private Dictionary<string, long> memo;

    public int BeautifulNumbers(int l, int r) {
        return (int)(Count(r) - Count(l - 1));
    }

    private long Count(int n) {
        if (n <= 0) return 0;
        s = n.ToString();
        memo = new Dictionary<string, long>();
        return Solve(0, true, true, false, 0, 1);
    }

    private long Solve(int pos, bool tight, bool leading, bool hasZero, int sum, int prod) {
        if (pos == s.Length)
            return (!leading && (hasZero || prod % sum == 0)) ? 1 : 0;

        if (!leading && hasZero && !tight)
            return Pow10(s.Length - pos);

        string key = pos + "_" + tight + "_" + leading + "_" + hasZero + "_" + sum + "_" + prod;
        if (memo.TryGetValue(key, out long cached)) return cached;

        int maxDigit = tight ? s[pos] - '0' : 9;
        long result = 0;
        for (int d = 0; d <= maxDigit; d++) {
            bool nextTight = tight && d == maxDigit;
            bool nextLeading = leading && d == 0;
            bool nextHasZero = !nextLeading && d == 0;
            int nextProd = nextLeading ? 1 : prod * d;
            result += Solve(pos + 1, nextTight, nextLeading, nextHasZero, sum + d, nextProd);
        }

        memo[key] = result;
        return result;
    }

    private long Pow10(int exp) {
        long result = 1;
        for (int i = 0; i < exp; i++) result *= 10;
        return result;
    }
}
```

## Complexity

- **Time:** O(log(r) * 9 * 81 * P), where P is the number of distinct reachable digit products (bounded)
- **Space:** O(log(r) * 81 * P)
