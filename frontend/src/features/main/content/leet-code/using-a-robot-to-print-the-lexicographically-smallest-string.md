# 2434. Using a Robot to Print the Lexicographically Smallest String

**Difficulty:** Medium
**Category:** Hash Table, String, Stack, Greedy

## Problem

You are given a string `s` and a robot that can pick letters from `s` and place them into a target string `t`. Initially, `s` is on a tape, `t` is empty, and the robot has a stack. The robot can perform three operations:

1. Pick the leftmost letter from `s` and push it onto the stack
2. Pop the top of the stack and append it to `t`
3. Do nothing

The goal is to form the lexicographically smallest possible string `t` using these operations.

### Example

```
Input: s = "zza"
Output: "azz"
Explanation: The robot can first push 'z' and 'z' onto the stack, then pick 'a', append it to t, then pop both 'z' characters.
```

## Approach

Use a greedy strategy with a frequency array. For each position, determine the smallest character that still exists to the right. If the stack's top is less than or equal to this minimum remaining character, pop it to `t`. Otherwise, push the current character from `s` onto the stack. This ensures we output smaller characters as early as possible while maintaining correct order.

## C# Solution

```csharp
public class Solution
{
    public string RobotWithString(string s)
    {
        int n = s.Length;
        char[] minSuffix = new char[n];
        minSuffix[n - 1] = s[n - 1];
        for (int i = n - 2; i >= 0; i--)
        {
            minSuffix[i] = s[i] < minSuffix[i + 1] ? s[i] : minSuffix[i + 1];
        }

        var stack = new Stack<char>();
        var result = new StringBuilder();
        
        for (int i = 0; i < n; i++)
        {
            stack.Push(s[i]);
            char minRemaining = i + 1 < n ? minSuffix[i + 1] : 'z' + 1;
            
            while (stack.Count > 0 && stack.Peek() <= minRemaining)
            {
                result.Append(stack.Pop());
            }
        }
        
        while (stack.Count > 0)
        {
            result.Append(stack.Pop());
        }
        
        return result.ToString();
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of s
- **Space:** O(n) for the stack and suffix array
