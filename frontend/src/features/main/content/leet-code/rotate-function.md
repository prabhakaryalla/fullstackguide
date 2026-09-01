# 396. Rotate Function

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given an integer array `nums` of length `n`, define `F(k) = 0 * BkArr[0] + 1 * BkArr[1] + ... + (n-1) * BkArr[n-1]`, where `BkArr` is the array obtained by rotating `nums` clockwise by `k` positions. Return the maximum value of `F(k)` over all `k` from `0` to `n - 1`.

### Example

```
Input: nums = [4,3,2,6]
Output: 26
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^5`
- `-100 <= nums[i] <= 100`

## Approach

Compute `F(0)` directly, and the total sum of the array. Then derive each subsequent `F(k)` from `F(k-1)` in constant time using the relation `F(k) = F(k-1) + sum - n * nums[n-k]` (rotating shifts every weight up by one, except the wrapped-around element which effectively loses `n` times its value). Track the maximum across all `k`.

## C# Solution

```csharp
public class Solution
{
    public int MaxRotateFunction(int[] nums)
    {
        int n = nums.Length;
        long sum = 0, f = 0;

        for (int i = 0; i < n; i++)
        {
            sum += nums[i];
            f += (long)i * nums[i];
        }

        long max = f;
        for (int i = n - 1; i > 0; i--)
        {
            f += sum - (long)n * nums[i];
            max = Math.Max(max, f);
        }

        return (int)max;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
