# 3711. Maximum Transactions Without Negative Balance

**Difficulty:** Hard
**Category:** Array, Greedy, Heap (Priority Queue)
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer `startBalance` and an integer array `transactions`, where `transactions[i]` is applied to the balance in order (a positive value is a deposit, a negative value is a withdrawal).

You may skip any subset of the transactions. Return the maximum number of transactions you can keep (in their original relative order) such that the running balance never becomes negative at any point.

### Example

```
Input: startBalance = 10, transactions = [-5,-8,3,-2]
Output: 3
Explanation: Skipping the -8 transaction and keeping [-5, 3, -2] gives balances 5, 8, 6 — always non-negative. Keeping all 4 would drop the balance to -3 after the second transaction.
```

### Constraints

- `0 <= startBalance <= 10^9`
- `1 <= transactions.length <= 10^5`
- `-10^9 <= transactions[i] <= 10^9`

## Approach

Process transactions in order, tentatively applying every one of them to the running balance and counting it as kept. Maintain a min-heap of the negative transactions currently kept. Whenever the running balance goes negative, it means the current set of kept transactions is not feasible; greedily undo the most negative transaction seen so far (popping it from the min-heap and adding its value back to the balance), which is the cheapest way to restore a non-negative balance while keeping as many transactions as possible. This exchange-argument greedy (the same pattern used for scheduling problems with an undo-heap) maximizes the final count of kept transactions.

## C# Solution

```csharp
public class Solution
{
    public int MaxTransactions(int startBalance, int[] transactions)
    {
        PriorityQueue<int, int> keptNegatives = new PriorityQueue<int, int>();
        long balance = startBalance;
        int kept = 0;

        foreach (int amount in transactions)
        {
            balance += amount;
            kept++;

            if (amount < 0)
            {
                keptNegatives.Enqueue(amount, amount);
            }

            if (balance < 0)
            {
                int worst = keptNegatives.Dequeue();
                balance -= worst;
                kept--;
            }
        }

        return kept;
    }
}
```

## Complexity

- **Time:** `O(n log n)`, where `n` is the number of transactions.
- **Space:** `O(n)` for the heap.
