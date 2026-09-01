# 3324. Find the Sequence of Strings Appeared on the Screen

**Difficulty:** Medium
**Category:** String, Simulation

## Problem

You are given a string `target`. Alice types it using two keys:
- Key 1 appends `"a"` to the screen.
- Key 2 changes the last character of the screen to its next character in the alphabet cyclically (`'z'` becomes `'a'`).

Starting from an empty string, return the list of all strings that appear on the screen, in order, using the minimum number of key presses to type `target`.

### Example

Input: `target = "abc"`

Output: `["a","aa","ab","aba","abb","abc"]`

## Approach

Process `target` character by character. For each character, press Key 1 once to append `'a'`, recording the new state. Then repeatedly press Key 2 (incrementing the last character, wrapping `'z'` to `'a'`) until it matches the target character, recording the state after every press.

## C# Solution

```csharp
public class Solution 
{
    public IList<string> StringSequence(string target) 
    {
        var result = new List<string>();
        var sb = new System.Text.StringBuilder();

        foreach (char target_c in target)
        {
            sb.Append('a');
            result.Add(sb.ToString());
            while (sb[sb.Length - 1] != target_c)
            {
                char c = sb[sb.Length - 1];
                sb[sb.Length - 1] = c == 'z' ? 'a' : (char)(c + 1);
                result.Add(sb.ToString());
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n^2) in the worst case, since building each of the O(n) recorded strings takes O(n).
- **Space:** O(n^2) for the resulting list of strings.
