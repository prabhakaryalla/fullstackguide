# 3376. Minimum Time to Break Locks I

**Difficulty:** Medium
**Category:** Array, Backtracking, Bit Manipulation, Bitmask Dynamic Programming

## Problem

You start with energy 0 and a factor `X = 1`. Each minute, energy increases by `X`. To break lock `i`, energy must reach at least `strength[i]`; after breaking a lock, energy resets to 0 and `X` increases by 1. Choose the order to break all locks to minimize total time.

### Example

Input: `strength = [3,4,1]`
Output: minimum time trying all orders of breaking the 3 locks with increasing factor `X`.

## Approach

Since the number of locks is small, try every permutation of the lock-breaking order (or use bitmask DP over subsets). For a given order, simulate: with current factor `X`, time to reach `strength[i]` is `ceil(strength[i] / X)`; accumulate time, increment `X`, and move to the next lock. Track the minimum total time over all orders.

## C# Solution

```csharp
public class Solution 
{
    private int best;

    public int FindMinimumTime(IList<int> strength) 
    {
        int n = strength.Count;
        int[] arr = strength.ToArray();
        best = int.MaxValue;
        bool[] used = new bool[n];
        Backtrack(arr, used, 0, 1, 0);
        return best;
    }

    private void Backtrack(int[] strength, bool[] used, int brokenCount, int x, int timeSoFar) 
    {
        if (timeSoFar >= best) return;
        if (brokenCount == strength.Length) 
        {
            best = Math.Min(best, timeSoFar);
            return;
        }
        for (int i = 0; i < strength.Length; i++) 
        {
            if (used[i]) continue;
            used[i] = true;
            int t = (strength[i] + x - 1) / x;
            Backtrack(strength, used, brokenCount + 1, x + 1, timeSoFar + t);
            used[i] = false;
        }
    }
}
```

## Complexity

- **Time:** O(n!) worst case (small n)
- **Space:** O(n)
