# 2896. Apply Operations to Make Two Strings Equal

**Difficulty:** Medium
**Category:** String, Dynamic Programming

## Problem

You are given two 0-indexed binary strings `s1` and `s2` of the same length `n`, and a positive integer `x`. You can perform the following operations any number of times:
1. Choose two indices `i` and `j` where `i != j`, and flip both `s1[i]` and `s1[j]` (0 becomes 1, 1 becomes 0). The cost of this operation is `x`.
2. Choose an index `i` such that `i < n - 1`, and flip both `s1[i]` and `s1[i+1]`. The cost of this operation is 1.

Return the minimum cost needed to make `s1` equal to `s2`, or -1 if it is impossible.

### Example

```
Input: s1 = "1100011000", s2 = "0101001010", x = 2
Output: 4
Explanation:
Positions where s1 != s2: [0, 2, 3, 5, 6, 8]
Use operation 2 to flip adjacent pairs at cost 1 each.
Optimal cost: 4
```

## Approach

Find all positions where `s1[i] != s2[i]`. If the count is odd, return -1 (impossible to match with pair operations).

Use dynamic programming to find the minimum cost to fix all differing positions. For each pair of adjacent differing positions, decide whether to use operation 2 (cost 1) or operation 1 (cost x).

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(string s1, string s2, int x)
    {
        var diff = new List<int>();
        for (int i = 0; i < s1.Length; i++)
        {
            if (s1[i] != s2[i])
                diff.Add(i);
        }
        
        int n = diff.Count;
        if (n == 0) return 0;
        if (n % 2 == 1) return -1;
        
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++)
            dp[i] = int.MaxValue / 2;
        
        dp[0] = 0;
        
        for (int i = 1; i < n; i++)
        {
            dp[i + 1] = Math.Min(dp[i + 1], dp[i - 1] + (diff[i] - diff[i - 1]));
            dp[i + 1] = Math.Min(dp[i + 1], dp[i - 1] + x);
        }
        
        return dp[n];
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the length of the strings.
- **Space:** `O(n)` for the DP array.
