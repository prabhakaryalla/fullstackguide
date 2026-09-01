# 2712. Minimum Cost to Make All Characters Equal

**Difficulty:** Medium
**Category:** String, Dynamic Programming, Greedy

## Problem

You are given a binary string `s` of length `n`. You can perform the following operation any number of times:
- Choose an index `i` (0 ≤ i < n). The cost of this operation is `i + 1`.
- Flip all characters from index `0` to index `i` (inclusive).

OR
- Choose an index `i` (0 ≤ i < n). The cost of this operation is `n - i`.
- Flip all characters from index `i` to index `n - 1` (inclusive).

Return the minimum cost to make all characters in the string equal.

### Example

```
Input: s = "0011"
Output: 2
Explanation: Apply operation on index 2 (cost = 2) to flip indices 2 and 3: "0011" -> "0000".

Input: s = "010101"
Output: 9
Explanation: Multiple operations needed to make all characters equal.
```

## Approach

The key observation is that we only need to flip when we encounter a change from '0' to '1' or '1' to '0'. At each transition, we can choose to flip from the left or from the right. We pick the cheaper option.

For each position `i` where `s[i] != s[i+1]`, we have two choices:
- Flip from left (indices 0 to i): cost = i + 1
- Flip from right (indices i+1 to n-1): cost = n - (i + 1) = n - i - 1

We greedily choose the minimum cost at each transition.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumCost(string s) 
    {
        int n = s.Length;
        long totalCost = 0;
        
        for (int i = 0; i < n - 1; i++)
        {
            if (s[i] != s[i + 1])
            {
                int leftCost = i + 1;
                int rightCost = n - i - 1;
                totalCost += Math.Min(leftCost, rightCost);
            }
        }
        
        return totalCost;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of s
- **Space:** O(1)
