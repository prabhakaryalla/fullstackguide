# 3502. Minimum Cost to Reach Every Position

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

You are given a 0-indexed integer array `cost` of size `n`, where `cost[i]` is the cost of reaching position `i` directly. You may also reach position `i` indirectly through any earlier position `j <= i`, in which case the cost to be at position `i` is simply `cost[j]` (there is no additional charge for "passing through"). Return an array `answer` of size `n`, where `answer[i]` is the minimum cost to reach position `i` using any position from `0` to `i`.

### Example

```
Input: cost = [5,3,4,1,3]
Output: [5,3,3,1,1]
Explanation:
- answer[0] = cost[0] = 5
- answer[1] = min(5,3) = 3
- answer[2] = min(5,3,4) = 3
- answer[3] = min(5,3,4,1) = 1
- answer[4] = min(5,3,4,1,3) = 1
```

## Approach

This is a direct prefix-minimum computation: scan `cost` from left to right, keeping track of the smallest value seen so far, and record it as the answer for the current index.

## C# Solution

```csharp
public class Solution 
{
    public int[] MinCosts(int[] cost) 
    {
        int n = cost.Length;
        int[] answer = new int[n];
        int minSoFar = int.MaxValue;
        for (int i = 0; i < n; i++)
        {
            minSoFar = Math.Min(minSoFar, cost[i]);
            answer[i] = minSoFar;
        }
        return answer;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `cost`.
- **Space:** O(n) for the output array.
