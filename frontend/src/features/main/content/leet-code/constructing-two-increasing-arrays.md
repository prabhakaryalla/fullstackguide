# 3269. Constructing Two Increasing Arrays

**Difficulty:** Hard
**Category:** Array, Greedy

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given two integer arrays `nums1` and `nums2`, each of length `n`, where `nums1[i]` and `nums2[i]` represent the **minimum** allowed value at index `i` for two arrays you must construct. Construct two integer arrays `arr1` and `arr2`, each of length `n`, such that:

- `arr1` is strictly increasing and `arr1[i] >= nums1[i]` for every index `i`.
- `arr2` is strictly increasing and `arr2[i] >= nums2[i]` for every index `i`.
- `arr1[i] != arr2[i]` for every index `i`.

Return the two arrays as `[arr1, arr2]`. It can be shown a valid construction always exists.

### Example

```
Input: nums1 = [1,2,1], nums2 = [1,1,3]
Output: [[1,2,3],[2,3,4]]
Explanation: arr1 = [1,2,3] is strictly increasing and >= nums1 everywhere; arr2 = [2,3,4] is strictly increasing and >= nums2 everywhere; and arr1[i] != arr2[i] at every index.
```

## Approach
Process indices left to right with a greedy scan, tracking the previous value placed into each array. At each index `i`:

1. Set `arr1[i]` to the larger of `nums1[i]` and `previous arr1 value + 1` (this is the smallest value that keeps `arr1` strictly increasing while respecting the minimum).
2. Do the same for `arr2[i]`.
3. If the two chosen values collide (`arr1[i] == arr2[i]`), bump `arr2[i]` up by one more — this is always safe because it still keeps `arr2` strictly increasing relative to its own previous value.

This greedy choice never creates a problem later, since making each value as small as possible at every step only relaxes the constraints for future indices.

## C# Solution

```csharp
public class Solution 
{
    public int[][] ConstructArrays(int[] nums1, int[] nums2) 
    {
        int n = nums1.Length;
        int[] arr1 = new int[n];
        int[] arr2 = new int[n];
        int prev1 = int.MinValue;
        int prev2 = int.MinValue;

        for (int i = 0; i < n; i++) 
        {
            arr1[i] = Math.Max(nums1[i], prev1 + 1);
            arr2[i] = Math.Max(nums2[i], prev2 + 1);

            if (arr1[i] == arr2[i]) 
            {
                arr2[i]++;
            }

            prev1 = arr1[i];
            prev2 = arr2[i];
        }

        return new int[][] { arr1, arr2 };
    }
}
```

## Complexity

- **Time:** O(n), a single left-to-right pass.
- **Space:** O(n) for the two output arrays (excluding the output itself, O(1) auxiliary space is used).
