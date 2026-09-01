# 2327. Number of People Aware of a Secret

**Difficulty:** Medium
**Category:** Dynamic Programming, Queue, Simulation

## Problem

On day 1, one person discovers a secret. You are given an integer `delay`, which means each person will share the secret with a new person every day, starting from `delay` days after discovering it. You are also given an integer `forget`, meaning each person will forget the secret `forget` days after discovering it. Return the number of people who know the secret at the end of day `n`. Return the answer modulo `10^9 + 7`.

### Example

```
Input: n = 6, delay = 2, forget = 4
Output: 5
Explanation:
Day 1: 1 person knows (person 1)
Day 3: Person 1 starts sharing
Day 4: Person 1 shares (2 people know)
Day 5: Person 1 forgets; person 2 shares (2 people know)
Day 6: Person 2 shares (3 people know); + earlier shares = 5
```

## Approach

Use dynamic programming where `dp[i]` represents the number of people who discovered the secret on day `i`. For each day `i`, people who discovered the secret between days `i - forget + 1` and `i - delay` can share. The number of new discoveries on day `i` is the sum of people who can share on that day. At the end, sum up people who haven't forgotten (discovered in the last `forget` days).

## C# Solution

```csharp
public class Solution
{
    public int PeopleAwareOfSecret(int n, int delay, int forget)
    {
        const int MOD = 1000000007;
        long[] dp = new long[n + 1];
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++)
        {
            for (int j = Math.Max(1, i - forget + 1); j <= i - delay; j++)
            {
                dp[i] = (dp[i] + dp[j]) % MOD;
            }
        }
        
        long result = 0;
        for (int i = Math.Max(1, n - forget + 1); i <= n; i++)
        {
            result = (result + dp[i]) % MOD;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n * forget)
- **Space:** O(n)
