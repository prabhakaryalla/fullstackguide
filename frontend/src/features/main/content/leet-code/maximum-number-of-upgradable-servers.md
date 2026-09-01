# 3155. Maximum Number of Upgradable Servers

**Difficulty:** Medium
**Category:** Array, Math

## Problem
There are several data centers, each with a certain number of servers (`count[i]`), a per-server upgrade cost (`upgrade[i]`), a per-server resale value if sold instead of upgraded (`sell[i]`), and available budget (`money[i]`). For each data center, you may sell some servers to raise extra funds and use all available money (budget plus proceeds from sold servers) to upgrade the rest. Determine, for each data center independently, the maximum number of servers that can end up upgraded.

## Approach
For data center `i`, suppose we upgrade `x` servers, we can sell the remaining `count[i] - x` servers for extra funds. The affordability condition is `x * upgrade[i] <= money[i] + (count[i] - x) * sell[i]`. Solving this inequality for `x` gives `x <= (money[i] + count[i] * sell[i]) / (sell[i] + upgrade[i])`. The answer for each data center is the minimum of `count[i]` and this computed maximum, taking the floor since `x` must be an integer.

## C# Solution
```csharp
public class Solution {
    public int[] MaxUpgrades(int[] count, int[] upgrade, int[] sell, int[] money) {
        int n = count.Length;
        int[] ans = new int[n];

        for (int i = 0; i < n; i++) {
            long maxX = (money[i] + (long)count[i] * sell[i]) / (sell[i] + upgrade[i]);
            ans[i] = (int)Math.Min(count[i], maxX);
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n) for the output array
