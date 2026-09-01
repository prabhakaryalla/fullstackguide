# 2604. Minimum Time to Eat All Grains

**Difficulty:** Hard
**Category:** Array, Two Pointers, Binary Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given two integer arrays `hens` and `grains` representing the positions of hens and grains on an infinite line. Each hen can move left or right and eat grains at various positions. Find the minimum time such that every grain is eaten by some hen, where time is the maximum distance traveled by any hen.

A hen can change direction while moving and can eat grains at positions it passes through.

### Example

```
Input: hens = [3,6,7], grains = [2,4,7,9]
Output: 2
Explanation: Hen at 6 can move to 4 and 7. Hen at 7 can eat grain at 7 and move to 9. Maximum distance is 2.
```

## Approach

Use binary search on the answer (minimum time). For a given time limit, check if it's possible for the hens to eat all grains using a greedy two-pointer approach.

For each hen in order, determine the maximum extent it can cover given the time limit and assign grains to it greedily. If a hen is at position `h` with time `t`, it can cover range `[h-t, h+t]` going one direction, or optimize by going left first then right (or vice versa) to cover more area.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTime(int[] hens, int[] grains)
    {
        Array.Sort(hens);
        Array.Sort(grains);
        
        int left = 0, right = Math.Abs(hens[0] - grains[0]) + Math.Abs(grains[^1] - grains[0]);
        int result = right;
        
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            
            if (CanEatAll(hens, grains, mid))
            {
                result = mid;
                right = mid - 1;
            }
            else
            {
                left = mid + 1;
            }
        }
        
        return result;
    }
    
    private bool CanEatAll(int[] hens, int[] grains, int time)
    {
        int j = 0;
        
        foreach (int hen in hens)
        {
            if (j >= grains.Length) return true;
            if (grains[j] > hen + time) return false;
            
            if (grains[j] >= hen - time)
            {
                int leftMost = Math.Max(grains[j], hen - time);
                int rightReach = hen + time;
                int rightReachWithLeftFirst = hen + (time - 2 * (hen - leftMost));
                int maxRight = Math.Max(rightReach, rightReachWithLeftFirst);
                
                while (j < grains.Length && grains[j] <= maxRight)
                    j++;
            }
        }
        
        return j >= grains.Length;
    }
}
```

## Complexity

- **Time:** O((n + m) log(max_distance)) where n and m are lengths of hens and grains arrays
- **Space:** O(1)
