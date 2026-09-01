# 3709. Design Exam Scores Tracker

**Difficulty:** Medium
**Category:** Design, Binary Search, Prefix Sum

## Problem

Design a data structure `ExamScoresTracker` that records exam scores over time and can quickly report the total score recorded since a given time.
- `AddScore(int time, int score)`: records a score at a strictly increasing `time`.
- `GetScore(int startTime)`: returns the sum of all scores recorded at times `>= startTime`.

### Example

AddScore(1,50) → AddScore(3,80) → AddScore(5,60) → GetScore(3) returns 140 (80+60).

## Approach

Since `AddScore` calls arrive with strictly increasing times, store times in a list and maintain a running prefix-sum array. For `GetScore`, binary search the times list for the first time `>= startTime` and return the suffix sum using the prefix-sum array.

## C# Solution

```csharp
public class ExamScoresTracker 
{
    private readonly List<int> times = new List<int>();
    private readonly List<long> prefix = new List<long> { 0 };

    public void AddScore(int time, int score) 
    {
        times.Add(time);
        prefix.Add(prefix[prefix.Count - 1] + score);
    }

    public long GetScore(int startTime) 
    {
        int lo = 0, hi = times.Count;
        while (lo < hi) 
        {
            int mid = (lo + hi) / 2;
            if (times[mid] >= startTime) hi = mid;
            else lo = mid + 1;
        }
        return prefix[prefix.Count - 1] - prefix[lo];
    }
}
```

## Complexity

- **Time:** O(1) amortized for AddScore, O(log n) for GetScore
- **Space:** O(n)
