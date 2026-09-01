# 3450. Maximum Students on a Single Bench

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a list of `(student_id, bench_id)` pairs describing which bench each student sat on, return the maximum number of distinct students that sat on the same bench at any point.

## Approach
Group the pairs by `bench_id` and count the number of distinct `student_id` values for each bench using a dictionary of sets (to avoid double counting a student who sat on the same bench multiple times). Track the maximum count across all benches.

## C# Solution

```csharp
public class Solution 
{
    public int MaxStudentsOnBench(int[][] students) 
    {
        var benchToStudents = new System.Collections.Generic.Dictionary<int, System.Collections.Generic.HashSet<int>>();

        foreach (var pair in students)
        {
            int studentId = pair[0];
            int benchId = pair[1];

            if (!benchToStudents.TryGetValue(benchId, out var set))
            {
                set = new System.Collections.Generic.HashSet<int>();
                benchToStudents[benchId] = set;
            }

            set.Add(studentId);
        }

        int max = 0;
        foreach (var set in benchToStudents.Values)
        {
            if (set.Count > max) max = set.Count;
        }

        return max;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of student-bench pairs
- **Space:** O(n) for the dictionary of sets
