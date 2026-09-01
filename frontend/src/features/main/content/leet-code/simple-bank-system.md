# 2043. Simple Bank System

**Difficulty:** Medium
**Category:** Array, Hash Table, Design, Simulation

## Problem

You are given `n` accounts numbered `1` to `n`, each starting with a balance given in the array `balance`. Implement the `Bank` class:

- `Transfer(int account1, int account2, long money)` — transfers `money` from `account1` to `account2` if both accounts are valid and `account1` has sufficient balance; returns whether it succeeded.
- `Deposit(int account, long money)` — deposits `money` into `account` if it's valid; returns whether it succeeded.
- `Withdraw(int account, long money)` — withdraws `money` from `account` if it's valid and has sufficient balance; returns whether it succeeded.

An account number is valid if it's between `1` and `n`.

## Approach

Store balances in an array (0-indexed internally, offset by `-1` from the 1-indexed account numbers). Each operation first validates the account number(s) are in range, then checks sufficient funds where relevant, before mutating the balances.

## C# Solution

```csharp
public class Bank
{
    private readonly long[] balances;

    public Bank(long[] balance)
    {
        balances = balance;
    }

    public bool Transfer(int account1, int account2, long money)
    {
        if (!IsValid(account1) || !IsValid(account2)) return false;
        if (balances[account1 - 1] < money) return false;

        balances[account1 - 1] -= money;
        balances[account2 - 1] += money;
        return true;
    }

    public bool Deposit(int account, long money)
    {
        if (!IsValid(account)) return false;

        balances[account - 1] += money;
        return true;
    }

    public bool Withdraw(int account, long money)
    {
        if (!IsValid(account)) return false;
        if (balances[account - 1] < money) return false;

        balances[account - 1] -= money;
        return true;
    }

    private bool IsValid(int account) => account >= 1 && account <= balances.Length;
}
```

## Complexity

- **Time:** `O(1)` per operation.
- **Space:** `O(n)` for the balances array.
