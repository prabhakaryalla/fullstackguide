# 238. Product of Array Except Self

**Difficulty:** Medium
**Category:** Array, Prefix Sum

## Problem

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`, without using the division operation, in `O(n)` time.

### Example 1

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

### Example 2

```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

### Constraints

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- The product of any prefix or suffix fits in a 32-bit integer.

## Approach

Build the answer in two passes without division: first fill `answer[i]` with the product of all elements to the left of `i` (a running prefix product). Then walk from right to left, multiplying `answer[i]` by a running suffix product accumulated so far.

## C# Solution

```csharp
public class Solution
{
    public int[] ProductExceptSelf(int[] nums)
    {
        int n = nums.Length;
        var answer = new int[n];

        answer[0] = 1;
        for (int i = 1; i < n; i++)
            answer[i] = answer[i - 1] * nums[i - 1];

        int suffix = 1;
        for (int i = n - 1; i >= 0; i--)
        {
            answer[i] *= suffix;
            suffix *= nums[i];
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes.
- **Space:** `O(1)` extra space, excluding the output array.
