# 2591. Distribute Money to Maximum Children

**Difficulty:** Easy
**Category:** Math, Greedy

## Problem

You are given an integer `money` denoting the amount of dollars you have and an integer `children` denoting the number of children. You have to distribute the money such that each child gets exactly 8 dollars or 4 dollars, and you want to maximize the number of children who get exactly 8 dollars.

Return the maximum number of children who can get exactly 8 dollars if you can distribute the money according to the rules, or -1 if it's impossible.

### Example

```
Input: money = 20, children = 3
Output: 1
Explanation: 
Give 8 to one child, 8 to another, and 4 to the last
Maximum who get 8 dollars is 1
```

## Approach

Each child must receive at least 4 dollars. First check if we have at least `4 * children` dollars - if not, return -1. Then calculate how many children can receive 8 dollars by checking if we have enough extra money (4 more per child). Handle edge cases where we can't give exactly 4 or 8 to all children.

## C# Solution

```csharp
public class Solution
{
    public int DistMoney(int money, int children)
    {
        if (money < 4 * children) return -1;
        
        if (money < 8 * children)
        {
            int canGet8 = (money - 4 * children) / 4;
            int remaining = money - 8 * canGet8;
            int remainingChildren = children - canGet8;
            
            if (remaining == 4 * remainingChildren)
            {
                return canGet8;
            }
            else if (remainingChildren == 1 && remaining == 4)
            {
                return Math.Max(0, canGet8 - 1);
            }
            else
            {
                return canGet8;
            }
        }
        else if (money == 8 * children)
        {
            return children;
        }
        else
        {
            return children - 1;
        }
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
