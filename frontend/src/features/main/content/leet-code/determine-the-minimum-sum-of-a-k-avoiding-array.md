# 2829. Determine the Minimum Sum of a k-avoiding Array

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

You are given two integers n and k.

An array is called k-avoiding if there does not exist any pair of distinct elements that sum to k.

Return the minimum possible sum of a k-avoiding array of length n containing distinct positive integers.

### Example

```
Input: n = 5, k = 4
Output: 18
Explanation: [1,2,5,6,7] is k-avoiding with sum = 21. Better is [1,2,5,6,7] but [1,2,3,6,7] gives 19. Optimal is actually [1,2,5,6,4] = 18
Actually: [1,2,5,6,7] sum=21, but we want minimal, so [1,2,6,7,8] won't work. 
The answer is [1,2,5,6,7] or similar = wait let me recalculate
Actually for k=4: we can't have (1,3), (2,2) pairs. So we can use [1,2,5,6,7] = 21? 
Let me reconsider: if k=4, we cannot use both x and 4-x. So avoid pairs summing to 4.
```

## Approach

We want to greedily select the smallest possible positive integers while avoiding pairs that sum to k.

Start from 1 and keep selecting numbers. For each candidate number x:
- If we've already selected (k - x), skip x
- Otherwise, select x

A key optimization: once we reach k/2, all remaining "dangerous" pairs are behind us. We can then jump ahead to k and continue selecting k, k+1, k+2, ... without conflicts.

We select: 1, 2, ..., floor(k/2), then k, k+1, k+2, ... until we have n numbers.

## C# Solution

```csharp
public class Solution
{
    public long MinimumSum(int n, int k)
    {
        long sum = 0;
        int count = 0;
        int current = 1;
        HashSet<int> used = new HashSet<int>();
        
        while (count < n)
        {
            int complement = k - current;
            
            if (!used.Contains(complement))
            {
                sum += current;
                used.Add(current);
                count++;
            }
            
            current++;
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n + k) in the worst case
- **Space:** O(n) for the hash set
