# 3784. Minimum Deletion Cost to Make All Characters Equal

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Enumeration

## Problem

Given a string `s` of length `n` and an array `cost` where `cost[i]` is the cost of deleting `s[i]`, delete any number of characters (leaving a non-empty result) so all remaining characters are equal. Return the minimum total deletion cost.

### Example

Input: `s = "aabaac", cost = [1,2,3,4,1,10]`
Output: `11`

## Approach

The optimal result keeps all occurrences of exactly one letter (the one whose kept cost is highest) and deletes everything else. For each letter, compute the sum of `cost[i]` where `s[i]` equals that letter; the answer is the total cost minus the maximum such sum.

## C# Solution

```csharp
public class Solution 
{
    public long MinCost(string s, int[] cost) 
    {
        var keepSum = new long[26];
        long total = 0;
        for (int i = 0; i < s.Length; i++)
        {
            keepSum[s[i] - 'a'] += cost[i];
            total += cost[i];
        }
        long maxKeep = keepSum.Max();
        return total - maxKeep;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
