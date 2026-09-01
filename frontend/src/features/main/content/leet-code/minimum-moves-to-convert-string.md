# 2027. Minimum Moves to Convert String

**Difficulty:** Easy
**Category:** String, Greedy

## Problem

You are given a string `s` consisting only of `'X'` and `'O'` characters. In one move, you can select any three consecutive characters and convert all `'X'` characters among them into `'O'`. Return *the minimum number of moves required so that no `'X'` characters remain*.

## Approach

Greedily scan the string left to right. Whenever an `'X'` is found, apply a move that covers it and the next two characters, then skip ahead three positions (since that whole window is now converted). If the current character is `'O'`, just move one position forward. This greedy is optimal because covering the leftmost unhandled `'X'` with the widest possible window never hurts later moves.

## C# Solution

```csharp
public class Solution
{
    public int MinimumMoves(string s)
    {
        int moves = 0;
        int i = 0;

        while (i < s.Length)
        {
            if (s[i] == 'X')
            {
                moves++;
                i += 3;
            }
            else
            {
                i++;
            }
        }

        return moves;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
