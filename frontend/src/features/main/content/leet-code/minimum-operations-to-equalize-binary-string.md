# 3666. Minimum Operations to Equalize Binary String

**Difficulty:** Easy
**Category:** String, Greedy

## Problem
You are given a binary string `s`. In one operation you may choose any index `i` and flip every character from index `i` to the end of the string (each `0` becomes `1` and each `1` becomes `0`).

Return the minimum number of operations required to make every character in `s` equal (all `0`s or all `1`s).

## Approach
Each suffix-flip operation is only useful at a point where the string changes value, since flipping a suffix that starts in the middle of a run of identical characters just splits that run without helping. In fact, the minimum number of operations needed to make the whole string uniform equals the number of maximal blocks of consecutive equal characters minus one — equivalently, the number of adjacent positions where `s[i] != s[i-1]`.

This is because each operation can remove exactly one "boundary" between differing blocks by flipping everything from that boundary onward, merging it with the following block.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(string s)
    {
        int operations = 0;
        for (int i = 1; i < s.Length; i++)
        {
            if (s[i] != s[i - 1])
            {
                operations++;
            }
        }
        return operations;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
