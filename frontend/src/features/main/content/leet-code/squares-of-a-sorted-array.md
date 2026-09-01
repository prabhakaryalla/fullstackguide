# 977. Squares of a Sorted Array

**Difficulty:** Easy
**Category:** Array, Two Pointers, Sorting

## Problem

Given a sorted (ascending) integer array `nums`, return an array of the squares of each number, also sorted in ascending order.

### Example

```
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
```

## Approach

The largest squared value always comes from one of the two ends of the sorted array (most negative or most positive). Fill the result array from the back, comparing the squares at the `left` and `right` pointers and taking the larger each time.

## C# Solution

```csharp
public class Solution
{
    public int[] SortedSquares(int[] nums)
    {
        int n = nums.Length;
        var result = new int[n];
        int left = 0, right = n - 1;

        for (int i = n - 1; i >= 0; i--)
        {
            int leftSq = nums[left] * nums[left];
            int rightSq = nums[right] * nums[right];

            if (leftSq > rightSq) { result[i] = leftSq; left++; }
            else { result[i] = rightSq; right--; }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
