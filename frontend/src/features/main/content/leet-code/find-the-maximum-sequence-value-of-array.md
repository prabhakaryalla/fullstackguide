# 3287. Find the Maximum Sequence Value of Array

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem
You are given an integer array `nums` (with `0 <= nums[i] < 2^7`) and an integer `k`. The value of a sequence `seq` of even size `2x` is defined as `(seq[0] OR seq[1] OR ... OR seq[x-1]) XOR (seq[x] OR seq[x+1] OR ... OR seq[2x-1])` — the bitwise OR of its first half XORed with the bitwise OR of its second half. Return the maximum value achievable by any subsequence of `nums` of size exactly `2 * k`.

### Example

```
Input: nums = [2,6,7], k = 1
Output: 5
Explanation: Choosing the subsequence [2,7] gives value 2 XOR 7 = 5, which is the best of the three possible length-2 subsequences.
```

## Approach
Because each value is smaller than `2^7 = 128`, the set of possible OR-results using any number of elements is always a subset of `{0, ..., 127}`. Build two DP tables of reachable-OR-value sets:

- `prefix[i][j]`: the set of OR values achievable by choosing exactly `j` elements from `nums[0..i-1]`.
- `suffix[i][j]`: the set of OR values achievable by choosing exactly `j` elements from `nums[i..n-1]`.

Both are computed with a simple "take it or skip it" transition. Then, for every valid split point `i` (so the first half uses `nums[0..i-1]` and the second half uses `nums[i..n-1]`), combine every reachable value in `prefix[i][k]` with every reachable value in `suffix[i][k]` via XOR and track the maximum.

## C# Solution

```csharp
public class Solution 
{
    private const int MaxBit = 128; // nums[i] < 2^7

    public int MaxValue(int[] nums, int k) 
    {
        int n = nums.Length;

        var prefix = BuildSets(nums, n, k, forward: true);
        var suffix = BuildSets(nums, n, k, forward: false);

        int best = 0;
        for (int split = k; split <= n - k; split++) 
        {
            for (int a = 0; a < MaxBit; a++) 
            {
                if (!prefix[split][k][a]) 
                {
                    continue;
                }
                for (int b = 0; b < MaxBit; b++) 
                {
                    if (suffix[split][k][b]) 
                    {
                        best = Math.Max(best, a ^ b);
                    }
                }
            }
        }

        return best;
    }

    private bool[][][] BuildSets(int[] nums, int n, int k, bool forward) 
    {
        var sets = new bool[n + 1][][];
        for (int i = 0; i <= n; i++) 
        {
            sets[i] = new bool[k + 1][];
            for (int j = 0; j <= k; j++) 
            {
                sets[i][j] = new bool[MaxBit];
            }
        }

        int baseIndex = forward ? 0 : n;
        sets[baseIndex][0][0] = true;

        if (forward) 
        {
            for (int i = 1; i <= n; i++) 
            {
                int value = nums[i - 1];
                for (int j = 0; j <= k; j++) 
                {
                    for (int v = 0; v < MaxBit; v++) 
                    {
                        if (sets[i - 1][j][v]) sets[i][j][v] = true;
                    }
                    if (j > 0) 
                    {
                        for (int v = 0; v < MaxBit; v++) 
                        {
                            if (sets[i - 1][j - 1][v]) sets[i][j][v | value] = true;
                        }
                    }
                }
            }
        } 
        else 
        {
            for (int i = n - 1; i >= 0; i--) 
            {
                int value = nums[i];
                for (int j = 0; j <= k; j++) 
                {
                    for (int v = 0; v < MaxBit; v++) 
                    {
                        if (sets[i + 1][j][v]) sets[i][j][v] = true;
                    }
                    if (j > 0) 
                    {
                        for (int v = 0; v < MaxBit; v++) 
                        {
                            if (sets[i + 1][j - 1][v]) sets[i][j][v | value] = true;
                        }
                    }
                }
            }
        }

        return sets;
    }
}
```

## Complexity

- **Time:** O(n * k * 128) to build each DP table, plus O(n * 128^2) to evaluate all split points.
- **Space:** O(n * k * 128) for the two DP tables.
