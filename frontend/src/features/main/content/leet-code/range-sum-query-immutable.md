# 303. Range Sum Query - Immutable

**Difficulty:** Easy
**Category:** Array, Design, Prefix Sum

## Problem

Given an integer array `nums`, handle multiple queries of the following type: calculate the sum of the elements of `nums` between indices `left` and `right` inclusive. Implement the `NumArray` class with a constructor that takes `nums`, and a `SumRange(left, right)` method.

### Example

```
Input:
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output:
[null, 1, -1, -3]
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^5 <= nums[i] <= 10^5`
- `0 <= left <= right < nums.length`
- At most `10^4` calls will be made to `SumRange`.

## Approach

Precompute a prefix-sum array where `prefixSums[i]` holds the sum of the first `i` elements. Each range sum query is then a constant-time subtraction of two prefix sums.

## C# Solution

```csharp
public class NumArray
{
    private readonly int[] prefixSums;

    public NumArray(int[] nums)
    {
        prefixSums = new int[nums.Length + 1];
        for (int i = 0; i < nums.Length; i++)
            prefixSums[i + 1] = prefixSums[i] + nums[i];
    }

    public int SumRange(int left, int right)
    {
        return prefixSums[right + 1] - prefixSums[left];
    }
}
```

## Complexity

- **Time:** `O(n)` construction, `O(1)` per `SumRange` query.
- **Space:** `O(n)` for the prefix-sum array.
