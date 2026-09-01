# 2810. Faulty Keyboard

**Difficulty:** Easy
**Category:** String, Simulation

## Problem

Your laptop keyboard is faulty, and whenever you type the character `'i'`, instead of typing that character, it reverses the string you have written so far.

Given a string `s` that you intended to type, return the string that actually appears on the screen.

### Example

```
Input: s = "string"
Output: "rtsng"
Explanation:
- Type 's': screen = "s"
- Type 't': screen = "st"
- Type 'r': screen = "str"
- Type 'i': reverse to "rts"
- Type 'n': screen = "rtsn"
- Type 'g': screen = "rtsng"
```

## Approach

Simulate the typing process character by character:
1. Iterate through each character in the input string
2. If character is 'i', reverse the current result string
3. Otherwise, append the character to the result
4. Return the final result

We can optimize by using a StringBuilder and tracking whether we should append or prepend based on the number of 'i's seen.

## C# Solution

```csharp
public class Solution
{
    public string FinalString(string s)
    {
        var result = new StringBuilder();
        
        foreach (char c in s)
        {
            if (c == 'i')
            {
                var temp = result.ToString();
                result.Clear();
                for (int i = temp.Length - 1; i >= 0; i--)
                {
                    result.Append(temp[i]);
                }
            }
            else
            {
                result.Append(c);
            }
        }
        
        return result.ToString();
    }
}
```

## Complexity

- **Time:** O(n²) in worst case where n is the length of the string (due to reversals)
- **Space:** O(n) for storing the result
