# 1186. Maximum Subarray Sum with One Deletion

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `arr`, return the maximum possible sum of a non-empty contiguous subarray, allowing at most one element to be deleted from it.

### Example

```
Input: arr = [1,-2,0,3]
Output: 4
```

## Approach

Track two running values while scanning left to right: `noDelete`, the best subarray sum ending at the current position without any deletion, and `oneDelete`, the best subarray sum ending here having already used its one allowed deletion. `noDelete` follows the standard Kadane recurrence; `oneDelete` either extends a previous one-deletion subarray with the current element, or starts a fresh deletion by skipping the current element and inheriting the previous `noDelete` value. The overall answer is the maximum of both values seen at every position.

## C# Solution

```csharp
public class Solution
{
    public int MaximumSum(int[] arr)
    {
        int noDelete = arr[0], oneDelete = 0, result = arr[0];

        for (int i = 1; i < arr.Length; i++)
        {
            oneDelete = Math.Max(oneDelete + arr[i], noDelete);
            noDelete = Math.Max(noDelete + arr[i], arr[i]);
            result = Math.Max(result, Math.Max(noDelete, oneDelete));
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
