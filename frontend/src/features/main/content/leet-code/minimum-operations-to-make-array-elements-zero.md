# 3495. Minimum Operations to Make Array Elements Zero

**Difficulty:** Hard
**Category:** Array, Math, Bit Manipulation

## Problem
You are given a 2D array `queries`, where `queries[i] = [l, r]` defines an array consisting of every integer from `l` to `r` inclusive.

In one operation you may select two integers from the array and replace both with `floor(a / 4)` and `floor(b / 4)` respectively. For each query, find the minimum number of operations needed to reduce all elements of its array to 0. Return the sum of the results over all queries.

### Example
Input: `queries = [[1, 2], [2, 4]]`
Output: `3`
Explanation: For `[1, 2]`, one operation reduces both to 0 (cost 1). For `[2, 3, 4]`, two operations suffice: first reduce indices for 2 and 4, then the remaining two elements. Total: `1 + 2 = 3`.

## Approach
Any integer `x` needs exactly `floor(log4(x)) + 1` repeated `/4` divisions to reach 0: numbers in `[1, 3]` need 1 step, numbers in `[4, 15]` need 2 steps, numbers in `[16, 63]` need 3 steps, and so on (each bucket is 4 times the size of the previous power-of-4 range).

For a query `[l, r]`, sum the number of individual `/4` steps required across all integers in the range by intersecting `[l, r]` with each power-of-4 bucket. Since one operation processes two numbers simultaneously, the minimum number of operations for that query is the ceiling of half that total step count (you can always "waste" a slot by pairing with an already-zero element if the count is odd).

## C# Solution

```csharp
public class Solution {
    public long MinOperations(int[][] queries) {
        long ans = 0;
        foreach (var query in queries) {
            int l = query[0], r = query[1];
            ans += (GetOperations(r) - GetOperations(l - 1) + 1) / 2;
        }
        return ans;
    }

    // Total number of individual "/4" steps needed to reduce every integer in [1, n] to 0.
    private long GetOperations(int n) {
        long result = 0;
        int steps = 0;
        for (long powerOfFour = 1; powerOfFour <= n; powerOfFour *= 4) {
            long low = powerOfFour;
            long high = Math.Min(n, powerOfFour * 4 - 1);
            steps++;
            result += (high - low + 1) * steps;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(q * log(max(r)))
- **Space:** O(1) beyond the output
