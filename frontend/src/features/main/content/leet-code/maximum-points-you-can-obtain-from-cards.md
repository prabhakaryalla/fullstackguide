# 1423. Maximum Points You Can Obtain from Cards

**Difficulty:** Medium
**Category:** Array, Prefix Sum, Sliding Window

## Problem

Given `cardPoints` and an integer `k`, you may take exactly `k` cards from either the beginning or the end of the array (in any combination). Return the maximum total points obtainable.

### Example

```
Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
```

## Approach

Taking `k` cards from the two ends is equivalent to leaving behind a contiguous window of `n - k` cards in the middle. Minimizing the sum of that leftover window maximizes the taken points. Use a fixed-size sliding window over the array to find the minimum-sum window of length `n - k`, then subtract it from the total sum.

## C# Solution

```csharp
public class Solution
{
    public int MaxScore(int[] cardPoints, int k)
    {
        int n = cardPoints.Length;
        int total = 0;
        foreach (var p in cardPoints) total += p;

        int windowSize = n - k;
        if (windowSize == 0) return total;

        int windowSum = 0;
        for (int i = 0; i < windowSize; i++) windowSum += cardPoints[i];

        int minWindow = windowSum;
        for (int i = windowSize; i < n; i++)
        {
            windowSum += cardPoints[i] - cardPoints[i - windowSize];
            minWindow = Math.Min(minWindow, windowSum);
        }

        return total - minWindow;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
