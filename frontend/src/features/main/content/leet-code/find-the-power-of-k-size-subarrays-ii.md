# 3255. Find the Power of K-Size Subarrays II

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem
This is the larger-constraints version of "Find the Power of K-Size Subarrays I": for every contiguous subarray of length exactly `k`, determine its power (the max value if the subarray forms a consecutive increasing run, else -1), now for a much larger input size.

## Approach
The same linear-time technique from the smaller version applies directly, since it already scales to large inputs: track the start of the current maximal consecutive-increasing run while scanning left to right, and for every window of size `k`, check whether the run length covering that window meets or exceeds `k`, reporting `nums[i]` if so, or -1 otherwise.

## C# Solution
```csharp
public class Solution {
    public int[] ResultsArray(int[] nums, int k) {
        List<int> ans = new List<int>();
        int start = 0;

        for (int i = 0; i < nums.Length; i++) {
            if (i > 0 && nums[i] != nums[i - 1] + 1)
                start = i;
            if (i >= k - 1)
                ans.Add(i - start + 1 >= k ? nums[i] : -1);
        }

        return ans.ToArray();
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1) extra (excluding output)
