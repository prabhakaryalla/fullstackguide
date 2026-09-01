# 3174. Clear Digits

**Difficulty:** Easy
**Category:** Stack, String, Simulation

## Problem
Given a string `s` consisting of lowercase letters and digits, repeatedly remove the first digit found along with the closest non-digit character to its left, until no digits remain. Return the resulting string.

## Approach
Use the result string itself as an implicit stack. Iterate through the input character by character: if the current character is a digit, remove (pop) the last character from the result (which represents "deleting the closest non-digit character to its left"); otherwise, append the character to the result. Since the result only ever contains non-digit characters at any point, popping its last character always correctly removes the nearest preceding non-digit letter.

## C# Solution
```csharp
public class Solution {
    public string ClearDigits(string s) {
        var ans = new System.Text.StringBuilder();

        foreach (char c in s) {
            if (char.IsDigit(c))
                ans.Length--;
            else
                ans.Append(c);
        }

        return ans.ToString();
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n) for the result buffer
