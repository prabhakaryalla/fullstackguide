# 3616. Number of Student Replacements

**Difficulty:** Medium
**Category:** Array, Simulation
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `ranks` representing the ranks of students in the order they joined a class (a smaller number is a better rank).

The class monitor starts as the first student who joined. Whenever a new student joins with a rank strictly better (smaller) than the current monitor's rank, that student replaces the current monitor.

Return the total number of monitor replacements that occur.

### Example
Input: `ranks = [5,3,4,1,2]`
Output: `2`
Explanation: Student with rank 5 becomes the initial monitor. Student with rank 3 replaces them (rank 3). No replacement for rank 4 (worse than 3). Student with rank 1 replaces the monitor (rank 1). No replacement for rank 2 (worse than 1). Total replacements: 2.

## Approach
Track the best (smallest) rank seen so far. The first student always becomes the initial monitor without counting as a replacement. Every subsequent student whose rank is strictly smaller than the current best triggers a replacement and updates the best rank.

## C# Solution

```csharp
public class Solution {
    public int TotalReplacements(int[] ranks) {
        int result = -1;
        int best = int.MaxValue;

        foreach (int x in ranks) {
            if (x >= best) {
                continue;
            }
            best = x;
            result++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of ranks.
- **Space:** O(1)
