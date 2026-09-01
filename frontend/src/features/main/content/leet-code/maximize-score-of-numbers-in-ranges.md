# 3281. Maximize Score of Numbers in Ranges

**Difficulty:** Medium
**Category:** Array, Greedy, Binary Search, Sorting

## Problem

You are given an array `start` and an integer `d`. For each index `i`, choose an integer `x_i` in the range `[start[i], start[i] + d]`. The score of the chosen values is the minimum absolute difference between any two of them. Return the maximum possible score.

### Example

```
Input: start = [6,0,3], d = 2
Output: 4
Explanation: Choose x = [8,0,4]. The minimum difference between any pair is |8-4| = 4.
```

## Approach

Binary search on the answer `score` (the minimum pairwise gap we want to guarantee). To check if a given `score` is achievable, sort `start` ascending and greedily assign each chosen value to be at least `score` larger than the previous chosen value, clamped to be no smaller than its own range's lower bound. If at any point the required value would exceed that index's upper bound (`start[i] + d`), the score is not achievable. Binary search over possible scores to find the largest achievable one.

## C# Solution

```csharp
public class Solution 
{
    public int MaxPossibleScore(int[] start, int d) 
    {
        Array.Sort(start);
        int n = start.Length;

        long lo = 0;
        long hi = (long)start[n - 1] + d - start[0];
        long answer = 0;

        while (lo <= hi) 
        {
            long mid = lo + (hi - lo) / 2;
            if (CanAchieve(start, d, mid)) 
            {
                answer = mid;
                lo = mid + 1;
            } 
            else 
            {
                hi = mid - 1;
            }
        }

        return (int)answer;
    }

    private bool CanAchieve(int[] start, int d, long score) 
    {
        long prev = start[0];

        for (int i = 1; i < start.Length; i++) 
        {
            long candidate = prev + score;
            long upper = (long)start[i] + d;

            if (candidate > upper) return false;

            prev = Math.Max(candidate, start[i]);
        }

        return true;
    }
}
```

## Complexity

- **Time:** O(n log(maxRange))
- **Space:** O(1) beyond input sorting
