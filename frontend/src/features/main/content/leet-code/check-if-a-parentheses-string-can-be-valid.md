# 2116. Check if a Parentheses String Can Be Valid

**Difficulty:** Medium
**Category:** String, Stack, Greedy

## Problem

Given a string `s` of parentheses and a binary string `locked`, you can change unlocked characters (where `locked[i] = '0'`) to either '(' or ')'. Determine if it's possible to make `s` a valid parentheses string.

### Example

```
Input: s = "))()))", locked = "010100"
Output: true
Explanation: Change s[1] and s[3] to '(' to get "(()())"
```

## Approach

First check if length is odd (impossible). Use two passes: left-to-right tracking balance (treating unlocked as flexible), and right-to-left. Both must remain non-negative throughout to ensure a valid arrangement exists.

## C# Solution

```csharp
public class Solution
{
    public bool CanBeValid(string s, string locked)
    {
        int n = s.Length;
        if (n % 2 == 1) return false;
        
        int balance = 0, unlocked = 0;
        for (int i = 0; i < n; i++)
        {
            if (locked[i] == '0')
                unlocked++;
            else if (s[i] == '(')
                balance++;
            else
                balance--;
            
            if (balance + unlocked < 0)
                return false;
        }
        
        balance = 0;
        unlocked = 0;
        for (int i = n - 1; i >= 0; i--)
        {
            if (locked[i] == '0')
                unlocked++;
            else if (s[i] == ')')
                balance++;
            else
                balance--;
            
            if (balance + unlocked < 0)
                return false;
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
