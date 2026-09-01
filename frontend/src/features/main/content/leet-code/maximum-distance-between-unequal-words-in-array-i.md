# 3696. Maximum Distance Between Unequal Words in Array I

**Difficulty:** Easy
**Category:** Array, String, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of strings `words`, return the maximum value of `|i - j|` such that `words[i] != words[j]`. If no such pair exists, return `0`.

### Example

Input: `words = ["a","b","a","a"]`
Output: `2`
Explanation: `words[1] = "b"` differs from `words[3] = "a"`, giving distance `2`.

## Approach

The optimal pair must involve index `0` or index `n-1`. Find the first index (scanning forward) whose word differs from `words[0]`, and the last index (scanning backward) whose word differs from `words[n-1]`. The answer is the maximum of pairing each with the opposite end.

## C# Solution

```csharp
public class Solution 
{
    public int MaxDistance(string[] words) 
    {
        int n = words.Length;
        int first = -1, last = -1;
        for (int i = 1; i < n; i++) 
        {
            if (words[i] != words[0]) 
            {
                first = i;
                break;
            }
        }
        for (int j = n - 2; j >= 0; j--) 
        {
            if (words[j] != words[n - 1]) 
            {
                last = j;
                break;
            }
        }
        int ans = 0;
        if (first != -1) ans = Math.Max(ans, n - 1 - first);
        if (last != -1) ans = Math.Max(ans, last - 0);
        return ans;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
