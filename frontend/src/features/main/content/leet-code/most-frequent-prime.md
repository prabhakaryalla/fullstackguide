# 3044. Most Frequent Prime

**Difficulty:** Medium
**Category:** Array, Math, Hash Table, Enumeration, Number Theory, Matrix

## Problem

You are given an `m x n` grid `mat` of single digits (`0`-`9`). From every cell, in every one of the 8 directions (horizontal, vertical, diagonal), read out consecutive digits going as far as the grid allows, concatenating them into a number (the first digit read is the most significant). Whenever this constructed number is a prime greater than `10`, count that occurrence. Return the prime number with the highest total occurrence count across the whole grid and all directions/starting cells; if there's a tie, return the largest such prime. Return `-1` if no qualifying prime exists.

## Approach

Brute-force every starting cell and every one of the 8 directions, extending outward one step at a time while building up the number digit by digit (`num = num * 10 + digit`). Whenever the running number exceeds `10` and is prime, increment its count in a hash map. After scanning everything, find the entry with the highest count (breaking ties by the larger prime value).

## C# Solution

```csharp
public class Solution {
    private static readonly int[][] Dirs = new int[][] {
        new[] {1, 0}, new[] {1, -1}, new[] {0, -1}, new[] {-1, -1},
        new[] {-1, 0}, new[] {-1, 1}, new[] {0, 1}, new[] {1, 1}
    };

    public int MostFrequentPrime(int[][] mat) {
        int m = mat.Length, n = mat[0].Length;
        int ans = -1, maxFreq = 0;
        var count = new Dictionary<int, int>();

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                foreach (var dir in Dirs) {
                    int dx = dir[0], dy = dir[1];
                    long num = 0;
                    int x = i, y = j;
                    while (x >= 0 && x < m && y >= 0 && y < n) {
                        num = num * 10 + mat[x][y];
                        if (num > 10 && IsPrime(num))
                            count[(int)num] = count.GetValueOrDefault((int)num) + 1;
                        x += dx;
                        y += dy;
                    }
                }
            }
        }

        foreach (var kvp in count) {
            if (kvp.Value > maxFreq) {
                ans = kvp.Key;
                maxFreq = kvp.Value;
            } else if (kvp.Value == maxFreq) {
                ans = Math.Max(ans, kvp.Key);
            }
        }

        return ans;
    }

    private bool IsPrime(long num) {
        for (long i = 2; i * i <= num; i++)
            if (num % i == 0)
                return false;
        return true;
    }
}
```

## Complexity

- Time: O(m * n * max(m, n)) — 8 directions per cell, each extending up to the grid's longest dimension.
- Space: O(1) auxiliary beyond the counts map, whose size is bounded by the number of distinct primes found.
