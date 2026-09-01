# 2806. Account Balance After Rounded Purchase

**Difficulty:** Easy
**Category:** Math

## Problem

You are given a positive integer `purchaseAmount` representing the amount you will spend on a purchase. Initially, your bank account balance is exactly `100` dollars.

When you make the purchase, the amount is rounded to the nearest multiple of `10`. In other words:

- If the rightmost digit is less than `5`, round down
- Otherwise, round up

Return the balance remaining in your account after the purchase.

### Example

```
Input: purchaseAmount = 9
Output: 90
Explanation: 9 rounds to 10, so balance = 100 - 10 = 90
```

## Approach

Simple rounding logic:
1. Calculate the rounded amount by checking if `purchaseAmount % 10 >= 5`
2. If yes, round up to next multiple of 10
3. If no, round down to previous multiple of 10
4. Subtract from 100 and return

## C# Solution

```csharp
public class Solution
{
    public int AccountBalanceAfterPurchase(int purchaseAmount)
    {
        int remainder = purchaseAmount % 10;
        int roundedAmount;
        
        if (remainder >= 5)
        {
            roundedAmount = purchaseAmount + (10 - remainder);
        }
        else
        {
            roundedAmount = purchaseAmount - remainder;
        }
        
        return 100 - roundedAmount;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
