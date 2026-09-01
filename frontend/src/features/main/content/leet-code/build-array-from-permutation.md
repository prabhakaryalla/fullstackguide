# 1920. Build Array from Permutation

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given a zero-indexed permutation `nums`, build and return an array `ans` of the same length where `ans[i] = nums[nums[i]]`.

### Example

```
Input: nums = [0,2,1,5,3,4]
Output: [0,1,2,4,5,3]
Explanation: ans[0]=nums[nums[0]]=nums[0]=0, ans[1]=nums[nums[1]]=nums[2]=1, and so on.
```

### Constraints

- `0 <= nums.length <= 1000`
- `0 <= nums[i] < nums.length`
- `nums` is a permutation of `0` to `nums.length - 1`.

## Approach

Directly build a new array where each element `ans[i]` is computed as `nums[nums[i]]`, using the original (unmodified) array for both the outer and inner index lookups.

## C# Solution

```csharp
public class Solution
{
    public int[] BuildArray(int[] nums)
    {
        int n = nums.Length;
        int[] ans = new int[n];

        for (int i = 0; i < n; i++)
        {
            ans[i] = nums[nums[i]];
        }

        return ans;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass to build the result.
- **Space:** `O(n)` for the output array (`O(1)` extra beyond it).
