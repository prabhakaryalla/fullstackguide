# 860. Lemonade Change

**Difficulty:** Easy
**Category:** Array, Greedy

## Problem

Each lemonade costs $5. Customers pay with a $5, $10, or $20 bill, in the order given by `bills`, and you must give correct change starting with no money. Return `true` if you can provide correct change to every customer.

### Example

```
Input: bills = [5,5,5,10,20]
Output: true
```

## Approach

Track only the count of $5 and $10 bills on hand (since $20 bills are never useful for making change). For a $5 bill, just add to the count. For a $10 bill, require a $5 bill for change. For a $20 bill, prefer giving one $10 and one $5 as change (to conserve $5 bills, which are more versatile); if unavailable, fall back to three $5 bills; if neither works, correct change can't be given.

## C# Solution

```csharp
public class Solution
{
    public bool LemonadeChange(int[] bills)
    {
        int fives = 0, tens = 0;

        foreach (var bill in bills)
        {
            if (bill == 5)
            {
                fives++;
            }
            else if (bill == 10)
            {
                if (fives == 0) return false;
                fives--;
                tens++;
            }
            else
            {
                if (tens > 0 && fives > 0)
                {
                    tens--;
                    fives--;
                }
                else if (fives >= 3)
                {
                    fives -= 3;
                }
                else
                {
                    return false;
                }
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
