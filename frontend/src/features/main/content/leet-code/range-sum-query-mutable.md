# 307. Range Sum Query - Mutable

**Difficulty:** Medium
**Category:** Array, Design, Binary Indexed Tree, Segment Tree

## Problem

Given an integer array `nums`, handle multiple queries of two types: update the value of an element at a given index, and calculate the sum of elements between indices `left` and `right` inclusive. Implement the `NumArray` class with `Update(index, val)` and `SumRange(left, right)` methods.

### Example

```
Input:
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output:
[null, 9, null, 8]
```

### Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- At most `3 * 10^4` calls will be made to `Update` and `SumRange`.

## Approach

Use a Binary Indexed Tree (Fenwick Tree) to support point updates and prefix-sum queries in logarithmic time. `Update` applies the delta between the new and old value to the tree, and `SumRange` is computed as the difference of two prefix sums.

## C# Solution

```csharp
public class NumArray
{
    private readonly int[] tree;
    private readonly int[] nums;
    private readonly int n;

    public NumArray(int[] nums)
    {
        n = nums.Length;
        this.nums = new int[n];
        tree = new int[n + 1];

        for (int i = 0; i < n; i++)
            Update(i, nums[i]);
    }

    public void Update(int index, int val)
    {
        int delta = val - nums[index];
        nums[index] = val;

        for (int i = index + 1; i <= n; i += i & (-i))
            tree[i] += delta;
    }

    public int SumRange(int left, int right)
    {
        return PrefixSum(right + 1) - PrefixSum(left);
    }

    private int PrefixSum(int i)
    {
        int sum = 0;
        for (; i > 0; i -= i & (-i))
            sum += tree[i];

        return sum;
    }
}
```

## Complexity

- **Time:** `O(log n)` per `Update` or `SumRange` call, `O(n log n)` construction.
- **Space:** `O(n)` for the Fenwick tree.
