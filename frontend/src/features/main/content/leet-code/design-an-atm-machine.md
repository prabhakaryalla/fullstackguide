# 2241. Design an ATM Machine

**Difficulty:** Medium
**Category:** Array, Greedy, Design

## Problem

Design an ATM machine that supports depositing and withdrawing banknotes of denominations 20, 50, 100, 200, and 500. Implement the ATM class with `deposit` and `withdraw` methods.

### Example

```
ATM atm = new ATM();
atm.deposit([0,0,1,2,1]); // Deposit 1x100, 2x200, 1x500
atm.withdraw(600);        // Returns [0,0,1,0,1], withdrew 1x100 + 1x500
```

## Approach

Store the count of each denomination. For deposit, add counts. For withdrawal, greedily use the largest denominations first, checking if exact change is possible before committing.

## C# Solution

```csharp
public class ATM
{
    private long[] counts;
    private int[] denoms = { 20, 50, 100, 200, 500 };
    
    public ATM()
    {
        counts = new long[5];
    }
    
    public void Deposit(int[] banknotesCount)
    {
        for (int i = 0; i < 5; i++)
        {
            counts[i] += banknotesCount[i];
        }
    }
    
    public int[] Withdraw(int amount)
    {
        var result = new long[5];
        for (int i = 4; i >= 0; i--)
        {
            result[i] = Math.Min(counts[i], amount / denoms[i]);
            amount -= (int)(result[i] * denoms[i]);
        }
        
        if (amount > 0)
        {
            return new int[] { -1 };
        }
        
        for (int i = 0; i < 5; i++)
        {
            counts[i] -= result[i];
        }
        
        return result.Select(x => (int)x).ToArray();
    }
}
```

## Complexity

- **Time:** O(1) per operation
- **Space:** O(1)
