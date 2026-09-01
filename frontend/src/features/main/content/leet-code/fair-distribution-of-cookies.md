# 2305. Fair Distribution of Cookies

**Difficulty:** Medium
**Category:** Array, Backtracking, Dynamic Programming

## Problem

You are given an integer array `cookies` where `cookies[i]` denotes the number of cookies in the `i-th` bag. You are also given an integer `k` that denotes the number of children to distribute all the bags of cookies to. All the cookies in the same bag must go to the same child and cannot be split up.

The unfairness of a distribution is defined as the maximum total cookies obtained by a single child in the distribution.

Return the minimum unfairness of all distributions.

### Example

```
Input: cookies = [8,15,10,20,8], k = 2
Output: 31
Explanation: One optimal distribution is [8,15,8] and [10,20].
The unfairness is max(31, 30) = 31.
```

## Approach

Use backtracking to try all possible distributions. For each bag, try assigning it to each child and recursively distribute the remaining bags. Track the minimum unfairness across all distributions. Prune branches where current unfairness exceeds the best found so far.

## C# Solution

```csharp
public class Solution
{
    private int minUnfairness = int.MaxValue;
    
    public int DistributeCookies(int[] cookies, int k)
    {
        int[] children = new int[k];
        Backtrack(cookies, 0, children);
        return minUnfairness;
    }
    
    private void Backtrack(int[] cookies, int idx, int[] children)
    {
        if (idx == cookies.Length)
        {
            int unfairness = children.Max();
            minUnfairness = Math.Min(minUnfairness, unfairness);
            return;
        }
        
        for (int i = 0; i < children.Length; i++)
        {
            children[i] += cookies[idx];
            if (children[i] < minUnfairness)
            {
                Backtrack(cookies, idx + 1, children);
            }
            children[i] -= cookies[idx];
            
            if (children[i] == 0) break;
        }
    }
}
```

## Complexity

- **Time:** O(k^n) where n is the number of cookies
- **Space:** O(k + n) for recursion stack
