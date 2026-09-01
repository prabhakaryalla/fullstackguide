# 1947. Maximum Compatibility Score Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking, Bitmask

## Problem

Given `students` and `mentors`, each an `m x n` binary matrix of answers to `n` questions, assign each student to a distinct mentor (a perfect matching, `m <= number of mentors`) to maximize the total compatibility score, where the score for a student-mentor pair is the number of matching answers. Return the maximum possible total score.

### Example

```
Input: students = [[1,1,0],[1,0,1],[0,0,1]], mentors = [[1,0,0],[0,0,1],[1,1,0]]
Output: 8
Explanation: Assign student 0 to mentor 1 (score 3), student 1 to mentor 0 (score 2), student 2 to mentor 2 (score... ) totaling 8 with the optimal assignment.
```

### Constraints

- `m == students.length == mentors.length`
- `n == students[i].length == mentors[j].length`
- `1 <= m, n <= 8`
- `students[i][j]` and `mentors[i][j]` are either `0` or `1`.

## Approach

Precompute the compatibility score between every student-mentor pair (`O(m^2 * n)`). Then use bitmask DP over "which mentors have been assigned so far": `dp[mask]` = maximum total score achievable after assigning mentors in `mask` to the first `popcount(mask)` students, transitioning by trying every unused mentor for the next student. Iterate `mask` from `0` to `2^m - 1`.

## C# Solution

```csharp
public class Solution
{
    public int MaxCompatibilitySum(int[][] students, int[][] mentors)
    {
        int m = students.Length, n = students[0].Length;
        int[][] score = new int[m][];
        for (int i = 0; i < m; i++)
        {
            score[i] = new int[m];
            for (int j = 0; j < m; j++)
            {
                int s = 0;
                for (int k = 0; k < n; k++)
                {
                    if (students[i][k] == mentors[j][k]) s++;
                }
                score[i][j] = s;
            }
        }

        int fullMask = 1 << m;
        int[] dp = new int[fullMask];
        Array.Fill(dp, -1);
        dp[0] = 0;

        for (int mask = 0; mask < fullMask; mask++)
        {
            if (dp[mask] < 0) continue;
            int studentIdx = CountBits(mask);
            if (studentIdx >= m) continue;

            for (int mentorIdx = 0; mentorIdx < m; mentorIdx++)
            {
                if ((mask & (1 << mentorIdx)) != 0) continue;
                int newMask = mask | (1 << mentorIdx);
                int candidate = dp[mask] + score[studentIdx][mentorIdx];
                if (candidate > dp[newMask]) dp[newMask] = candidate;
            }
        }

        return dp[fullMask - 1];
    }

    private int CountBits(int mask)
    {
        int count = 0;
        while (mask != 0)
        {
            mask &= mask - 1;
            count++;
        }
        return count;
    }
}
```

## Complexity

- **Time:** `O(2^m * m + m^2 * n)` — bitmask DP transitions plus the initial score matrix computation.
- **Space:** `O(2^m + m^2)` for the dp array and score matrix.
