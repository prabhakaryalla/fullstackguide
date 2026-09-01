# 2390. Removing Stars From a String

**Difficulty:** Medium
**Category:** String, Stack

## Problem

You are given a string `s`, which contains stars `*`.

In one operation, you can:
- Choose a star in `s`
- Remove the closest non-star character to its left, as well as remove the star itself

Return the string after all stars have been removed.

### Example

```
Input: s = "leet**cod*e"
Output: "lecoe"
Explanation:
- Remove 't' and first '*': "lee*cod*e"
- Remove 'e' and second '*': "lecod*e"
- Remove 'd' and third '*': "lecoe"
```

## Approach

Use a stack to process characters left to right. For each character, if it's a star, pop from the stack (removing the previous non-star character). Otherwise, push the character onto the stack. Finally, convert the stack to a string.

## C# Solution

```csharp
public class Solution
{
    public string RemoveStars(string s)
    {
        Stack<char> stack = new Stack<char>();
        
        foreach (char c in s)
        {
            if (c == '*')
            {
                if (stack.Count > 0)
                {
                    stack.Pop();
                }
            }
            else
            {
                stack.Push(c);
            }
        }
        
        char[] result = new char[stack.Count];
        for (int i = stack.Count - 1; i >= 0; i--)
        {
            result[i] = stack.Pop();
        }
        
        return new string(result);
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the stack
