# 2555. Maximize Win From Two Segments

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window

## Problem

There are some prizes on the X-axis. You are given an integer array `prizePositions` that is sorted in non-decreasing order, where `prizePositions[i]` is the position of the `i`th prize. There could be different prizes at the same position on the line. You are also given an integer `k`.

You can select two segments with integer endpoints. The length of each segment is `k`. You will collect all prizes whose position falls within at least one of the two segments.

Return the maximum number of prizes you can collect using the two segments.

### Example

```
Input: prizePositions = [1,1,2,2,3,3,5], k = 2
Output: 7
Explanation: Select segments [1,3] and [3,5]. Collect all 7 prizes.

Input: prizePositions = [1,2,3,4], k = 0
Output: 2
Explanation: Segments are points. Select positions 1 and 2 (or any two).
```

## Approach

For each possible starting position of the second segment, find:
1. The maximum prizes the second segment can collect (using sliding window)
2. The maximum prizes the first segment could collect before the second segment starts (precompute this)

Use two passes:
- First pass: precompute `maxBefore[i]` = maximum prizes collectible by one segment ending at or before position `i`
- Second pass: for each position as the start of the second segment, compute total as `maxBefore[start] + prizes in current segment`

## C# Solution

```csharp
public class Solution
{
    public int MaximizeWin(int[] prizePositions, int k)
    {
        int n = prizePositions.Length;
        int[] maxBefore = new int[n + 1];
        int maxPrizes = 0;
        int left = 0;
        
        for (int right = 0; right < n; right++)
        {
            while (prizePositions[right] - prizePositions[left] > k)
                left++;
            
            int currentCount = right - left + 1;
            maxPrizes = Math.Max(maxPrizes, maxBefore[left] + currentCount);
            maxBefore[right + 1] = Math.Max(maxBefore[right], currentCount);
        }
        
        return maxPrizes;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n) for the maxBefore array
