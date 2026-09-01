# 2232. Minimize Result by Adding Parentheses to Expression

**Difficulty:** Medium
**Category:** String, Enumeration

## Problem

You are given a string `expression` of the form "a+b" where `a` and `b` are positive integers. Add exactly one pair of parentheses to the expression such that after evaluation, the result is minimized. Return the expression with the parentheses added to achieve the minimum result.

### Example

```
Input: expression = "247+38"
Output: "2(47+38)"
Explanation: 2 * (47 + 38) = 2 * 85 = 170
```

## Approach

Try all possible positions for the opening and closing parentheses. For each valid placement, compute the result by multiplying the left part (if any), the sum inside parentheses, and the right part (if any). Track the minimum result and return the corresponding expression.

## C# Solution

```csharp
public class Solution
{
    public string MinimizeResult(string expression)
    {
        int plusIdx = expression.IndexOf('+');
        int minVal = int.MaxValue;
        string result = "";
        
        for (int i = 0; i < plusIdx; i++)
        {
            for (int j = plusIdx + 2; j <= expression.Length; j++)
            {
                int left = i == 0 ? 1 : int.Parse(expression.Substring(0, i));
                int mid1 = int.Parse(expression.Substring(i, plusIdx - i));
                int mid2 = int.Parse(expression.Substring(plusIdx + 1, j - plusIdx - 1));
                int right = j == expression.Length ? 1 : int.Parse(expression.Substring(j));
                
                int val = left * (mid1 + mid2) * right;
                if (val < minVal)
                {
                    minVal = val;
                    result = expression.Substring(0, i) + "(" + 
                             expression.Substring(i, j - i) + ")" + 
                             expression.Substring(j);
                }
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n²) where n is the length of the string
- **Space:** O(1)
