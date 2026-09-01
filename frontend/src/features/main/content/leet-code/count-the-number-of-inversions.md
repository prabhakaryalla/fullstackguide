# 3193. Count the Number of Inversions

**Difficulty:** Hard
**Category:** Array, Dynamic Programming

## Problem
Given an integer `n` and a list of requirements, where each requirement `[end, cnt]` specifies that the permutation of numbers `0` to `n-1`, when considering only its first `end + 1` elements, must contain exactly `cnt` inversions (pairs `i < j` with `perm[i] > perm[j]`), count the number of permutations of length `n` satisfying all the given requirements, modulo `10^9 + 7`.

## Approach
Use dynamic programming where `dp[i][j]` represents the number of ways to arrange the first `i` numbers of a permutation such that there are exactly `j` inversions among them. Inversions are bounded (since the requirement counts are constrained to a small maximum, typically at most 400 given problem constraints). Transition from `dp[i-1][j]` to `dp[i][j + newInversions]` by inserting the `i`-th number at one of `i` possible positions relative to the first `i-1` numbers, where inserting it creates `newInversions` new inversions ranging from 0 to `i-1` depending on chosen position. Whenever a requirement specifies an exact inversion count for a given prefix length, only keep transitions that match that exact count at that step, effectively pruning invalid states. The final answer is `dp[n][requiredCountForN]`.

## C# Solution
```csharp
public class Solution {
    public int NumberOfPermutations(int n, int[][] requirements) {
        const int kMod = 1_000_000_007;
        const int kMaxInversions = 400;

        int[,] dp = new int[n + 1, kMaxInversions + 1];
        int[] endToCnt = new int[n + 1];
        Array.Fill(endToCnt, -1);

        foreach (int[] requirement in requirements) {
            int end = requirement[0];
            int cnt = requirement[1];
            endToCnt[end + 1] = cnt;
        }

        dp[1, 0] = 1;

        for (int i = 2; i <= n; i++) {
            for (int newInversions = 0; newInversions < i; newInversions++) {
                for (int j = 0; j + newInversions <= kMaxInversions; j++) {
                    int inversionsAfterInsertion = j + newInversions;
                    if (endToCnt[i] != -1 && inversionsAfterInsertion != endToCnt[i])
                        continue;
                    dp[i, inversionsAfterInsertion] = (int)((dp[i, inversionsAfterInsertion] + (long)dp[i - 1, j]) % kMod);
                }
            }
        }

        int target = endToCnt[n];
        if (target < 0 || target > kMaxInversions)
            return 0;

        return dp[n, target];
    }
}
```

## Complexity
- Time: O(n^2 * maxInversions)
- Space: O(n * maxInversions)
