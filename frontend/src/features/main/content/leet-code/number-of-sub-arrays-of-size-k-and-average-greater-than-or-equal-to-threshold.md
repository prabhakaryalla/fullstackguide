# 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem

Given `arr`, `k`, and `threshold`, return the number of contiguous subarrays of size `k` whose average is greater than or equal to `threshold`.

### Example

```
Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
Output: 3
```

## Approach

Maintain a sliding window sum of size `k`: initialize it with the first `k` elements, then slide one element at a time by adding the new element and removing the one leaving the window. Compare each window's sum against `threshold * k` to avoid floating-point division.

## C# Solution

```csharp
public class Solution
{
    public int NumOfSubarrays(int[] arr, int k, int threshold)
    {
        int target = threshold * k;
        long windowSum = 0;

        for (int i = 0; i < k; i++) windowSum += arr[i];

        int count = windowSum >= target ? 1 : 0;

        for (int i = k; i < arr.Length; i++)
        {
            windowSum += arr[i] - arr[i - k];
            if (windowSum >= target) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
