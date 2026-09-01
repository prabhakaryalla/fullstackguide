# 2375. Construct Smallest Number From DI String

**Difficulty:** Medium
**Category:** String, Backtracking, Stack, Greedy

## Problem

You are given a 0-indexed string `pattern` of length `n` consisting of the characters `'I'` meaning increasing and `'D'` meaning decreasing.

A 0-indexed string `num` of length `n + 1` is created using the following conditions:

- `num` consists of the digits `'1'` to `'9'`, where each digit is used at most once.
- If `pattern[i] == 'I'`, then `num[i] < num[i + 1]`.
- If `pattern[i] == 'D'`, then `num[i] > num[i + 1]`.

Return the lexicographically smallest possible string `num` that meets the conditions.

### Example

```
Input: pattern = "IIIDIDDD"
Output: "123549876"
```

## Approach

Use a greedy approach with a stack. Place digits 1 through n+1 in order, but when encountering 'D', delay placement by pushing to a stack. When encountering 'I' or reaching the end, pop all stacked values.

## C# Solution

```csharp
public class Solution
{
    public string SmallestNumber(string pattern)
    {
        int n = pattern.Length;
        var result = new StringBuilder();
        var stack = new Stack<int>();
        
        for (int i = 0; i <= n; i++)
        {
            stack.Push(i + 1);
            
            if (i == n || pattern[i] == 'I')
            {
                while (stack.Count > 0)
                {
                    result.Append(stack.Pop());
                }
            }
        }
        
        return result.ToString();
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
