# 3746. Minimum String Length After Balanced Removals

**Difficulty:** Medium
**Category:** Stack, String, Greedy

## Problem
You are given a string `s` consisting of lowercase letters. In one operation, you may remove two adjacent equal characters from the string (they "balance out" and cancel each other), and the remaining parts join together. Repeat this operation as many times as possible. Return the length of the string after no more such removals can be performed.

## Approach
Use a stack. Iterate through each character of the string: if the stack is non-empty and its top element equals the current character, pop the stack (the pair cancels); otherwise, push the current character onto the stack. After processing the entire string, the remaining size of the stack is the minimum possible length, since this greedy stack-based cancellation always produces the same final irreducible string regardless of removal order (a well-known invariant for adjacent-pair-cancellation problems).

## C# Solution

```csharp
public class Solution 
{
    public int MinLength(string s)
    {
        var stack = new Stack<char>();
        foreach (char c in s)
        {
            if (stack.Count > 0 && stack.Peek() == c)
            {
                stack.Pop();
            }
            else
            {
                stack.Push(c);
            }
        }
        return stack.Count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
