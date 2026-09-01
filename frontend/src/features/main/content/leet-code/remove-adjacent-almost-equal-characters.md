# 2957. Remove Adjacent Almost-Equal Characters

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

You are given a 0-indexed string `word`. Two characters are "almost-equal" if they are the same or adjacent in the alphabet. In one operation you can change any character of `word` to any lowercase letter. Return the minimum number of operations needed so that no two adjacent characters in `word` are almost-equal.

### Example

`word = "abddez"` → answer `2`.

## Approach

Scan left to right. Whenever `word[i]` and `word[i-1]` are almost-equal, we must spend one operation to change one of them. Greedily "fix" `word[i]` (conceptually changing it to some letter far from both its neighbors) and then skip ahead by two positions, since the fixed character can no longer conflict with `word[i+1]` either. If they aren't almost-equal, just move forward by one. This greedy is optimal because delaying a needed fix never helps and skipping two positions after a fix never misses a necessary future fix.

## C# Solution

```csharp
public class Solution 
{
    public int RemoveAlmostEqualCharacters(string word) 
    {
        int n = word.Length;
        int operations = 0;
        int i = 1;
        while (i < n)
        {
            if (Math.Abs(word[i] - word[i - 1]) <= 1)
            {
                operations++;
                i += 2;
            }
            else
            {
                i++;
            }
        }
        return operations;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
