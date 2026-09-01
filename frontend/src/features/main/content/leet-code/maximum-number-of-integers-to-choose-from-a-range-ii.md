# 2557. Maximum Number of Integers to Choose From a Range II

**Difficulty:** Medium
**Category:** Array, Binary Search, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Similar to problem 2554 but with larger constraints. You are given an integer array `banned`, two integers `n` and `maxSum`. You must choose integers following the rules:

- Chosen integers are in range `[1, n]`
- Each integer chosen at most once
- Chosen integers not in `banned`
- Sum of chosen integers ≤ `maxSum`

Return the maximum number of integers you can choose.

### Example

```
Input: banned = [1,4,6], n = 6, maxSum = 4
Output: 1
Explanation: Choose 2. Can't choose more without exceeding maxSum.

Input: banned = [11], n = 7, maxSum = 50
Output: 7
Explanation: Choose all from 1 to 7.
```

## Approach

With larger constraints, optimize using:
1. Sort the banned array and merge overlapping/adjacent ranges
2. Iterate through valid ranges (gaps between banned numbers)
3. Greedily pick smallest available numbers until sum exceeds `maxSum`

Use binary search or greedy selection within each valid range.

## C# Solution

```csharp
public class Solution
{
    public int MaxCount(int[] banned, int n, long maxSum)
    {
        var bannedSet = new HashSet<int>(banned);
        int count = 0;
        long sum = 0;
        
        for (int i = 1; i <= n; i++)
        {
            if (bannedSet.Contains(i))
                continue;
            
            if (sum + i > maxSum)
                break;
            
            sum += i;
            count++;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n + b) where b is the banned array length
- **Space:** O(b) for the hash set
