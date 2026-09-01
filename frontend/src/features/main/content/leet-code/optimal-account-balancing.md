# 465. Optimal Account Balancing

**Difficulty:** Hard
**Category:** Array, Backtracking
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of `transactions` where `transactions[i] = [from, to, amount]` represents a debt, return the minimum number of transactions required to settle all debts among the group.

### Example

```
Input: transactions = [[0,1,10],[2,0,5]]
Output: 2
```

### Constraints

- `1 <= transactions.length <= 8`
- `2 <= transactions[i].length == 3`

## Approach

Collapse all transactions into a single net balance per person (positive means owed money, negative means owing money); people with a net balance of zero can be ignored entirely. Use backtracking: take the first person with a nonzero balance, and try settling their balance against every other nonzero person one at a time (adding one settlement transaction), recursing on the remaining balances; the minimum transaction count across all these choices is the answer.

## C# Solution

```csharp
public class Solution
{
    public int MinTransfers(int[][] transactions)
    {
        var balances = new Dictionary<int, long>();

        foreach (var transaction in transactions)
        {
            balances[transaction[0]] = balances.GetValueOrDefault(transaction[0]) - transaction[2];
            balances[transaction[1]] = balances.GetValueOrDefault(transaction[1]) + transaction[2];
        }

        var nonZeroBalances = balances.Values.Where(v => v != 0).ToArray();
        return Backtrack(nonZeroBalances, 0);
    }

    private int Backtrack(long[] balances, int start)
    {
        while (start < balances.Length && balances[start] == 0)
            start++;

        if (start == balances.Length) return 0;

        int minTransactions = int.MaxValue;

        for (int i = start + 1; i < balances.Length; i++)
        {
            if ((balances[start] > 0) == (balances[i] > 0)) continue;

            balances[i] += balances[start];
            minTransactions = Math.Min(minTransactions, 1 + Backtrack(balances, start + 1));
            balances[i] -= balances[start];
        }

        return minTransactions == int.MaxValue ? 0 : minTransactions;
    }
}
```

## Complexity

- **Time:** Exponential in the number of distinct people, bounded in practice by the small input size (`transactions.Length <= 8`).
- **Space:** `O(n)` for the balances array and recursion stack.
