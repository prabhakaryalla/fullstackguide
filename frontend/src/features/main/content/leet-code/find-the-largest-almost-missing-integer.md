# 3471. Find the Largest Almost Missing Integer

**Difficulty:** Easy
**Category:** Array, Sliding Window, Hash Table

## Problem
You are given an integer array `nums` and an integer `k`. An integer `x` is called **almost missing** if it appears in **at most one** contiguous subarray of `nums` of size `k`. Return the largest almost missing integer in `nums`, or `-1` if no such integer exists.

## Approach
If `k > nums.Length`, there are no subarrays of size `k` at all, so every value trivially satisfies the condition — the answer is simply the maximum of `nums`.

Otherwise, group the indices where each distinct value occurs. For a value occurring at index `i`, the size-`k` windows that contain it are exactly the windows with start index in `[max(0, i - k + 1), min(n - k, i)]`. For a value with multiple occurrences, merge these index ranges (they may overlap) to get the total number of distinct windows containing that value. If this count is at most 1, the value is a candidate; track the largest candidate.

## C# Solution

```csharp
public class Solution 
{
    public int FindLargestAlmostMissing(int[] nums, int k)
    {
        int n = nums.Length;
        if (k > n)
        {
            int mx = int.MinValue;
            foreach (var x in nums) mx = Math.Max(mx, x);
            return mx;
        }

        var occurrences = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++)
        {
            if (!occurrences.TryGetValue(nums[i], out var list))
            {
                list = new List<int>();
                occurrences[nums[i]] = list;
            }
            list.Add(i);
        }

        int answer = -1;
        foreach (var kvp in occurrences)
        {
            int value = kvp.Key;
            var idxList = kvp.Value;

            var ranges = new List<(int start, int end)>();
            foreach (var i in idxList)
            {
                int start = Math.Max(0, i - k + 1);
                int end = Math.Min(n - k, i);
                ranges.Add((start, end));
            }
            ranges.Sort();

            long covered = 0;
            int curStart = ranges[0].start, curEnd = ranges[0].end;
            for (int r = 1; r < ranges.Count; r++)
            {
                if (ranges[r].start <= curEnd + 1)
                {
                    curEnd = Math.Max(curEnd, ranges[r].end);
                }
                else
                {
                    covered += curEnd - curStart + 1;
                    curStart = ranges[r].start;
                    curEnd = ranges[r].end;
                }
            }
            covered += curEnd - curStart + 1;

            if (covered <= 1)
            {
                answer = Math.Max(answer, value);
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n log n) due to sorting occurrence ranges per distinct value.
- **Space:** O(n) for the occurrence map.
