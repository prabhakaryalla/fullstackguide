# 3295. Report Spam Message

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

You are given an array of strings `message` and an array of strings `bannedWords`. A message is considered spam if it contains at least two words (exact, case-sensitive matches) that appear in `bannedWords`. Return `true` if the message array is spam, otherwise `false`.

### Example

```
Input: message = ["hello","world","hello"], bannedWords = ["world","hello"]
Output: true
```

## Approach

Put all banned words into a hash set for O(1) lookups. Iterate through `message`, counting how many words are found in the banned set. As soon as the count reaches `2`, return `true`. If the entire array is scanned without reaching `2`, return `false`.

## C# Solution

```csharp
public class Solution 
{
    public bool ReportSpam(string[] message, string[] bannedWords) 
    {
        var banned = new HashSet<string>(bannedWords);
        int count = 0;

        foreach (string word in message) 
        {
            if (banned.Contains(word)) 
            {
                count++;
                if (count >= 2) return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(n + m) where n is the message length and m is the banned words length
- **Space:** O(m)
