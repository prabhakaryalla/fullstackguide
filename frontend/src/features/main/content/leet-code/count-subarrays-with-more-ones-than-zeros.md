# 2031. Count Subarrays With More Ones Than Zeros

**Difficulty:** Medium
**Category:** Array, Binary Indexed Tree, Prefix Sum, Divide and Conquer
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a binary array `nums`, return the number of subarrays that contain more `1`s than `0`s, modulo `1e9 + 7`.

### Example

`nums = [0,1,1,0,1]` → subarrays such as `[1]`, `[1,1]`, `[0,1,1]`, `[1,0,1]`, `[0,1]`, `[1]`, `[0,1,1,0,1]` etc. that have strictly more ones than zeros are counted; the answer is 9.

## Approach

Map `0 -> -1` and `1 -> +1`, and build a prefix-sum array `prefix[j] = sum(mapped[0..j-1])`. A subarray `nums[i..j-1]` has more ones than zeros exactly when `prefix[j] > prefix[i]`. So the answer is the number of pairs `(i, j)` with `i < j` and `prefix[j] > prefix[i]`, i.e. for every new prefix value we need the count of strictly smaller prefix values seen so far. Since prefix values range in `[-n, n]`, remap them to `[1, 2n+1]` and use a Binary Indexed Tree (Fenwick Tree) to query/update counts in O(log n) per step, starting the tree pre-seeded with `prefix = 0` (the empty prefix).

## C# Solution

```csharp
public class Solution 
{
    public int SubarraysWithMoreOnesThanZeros(int[] nums) 
    {
        const int mod = 1_000_000_007;
        int n = nums.Length;
        int[] tree = new int[2 * n + 3];

        void Add(int i, int delta)
        {
            for (; i < tree.Length; i += i & (-i))
                tree[i] += delta;
        }

        int Get(int i)
        {
            int sum = 0;
            for (; i > 0; i -= i & (-i))
                sum += tree[i];
            return sum;
        }

        int Remap(int value) => value + n + 1;

        long ans = 0;
        int prefix = 0;
        Add(Remap(0), 1);

        foreach (int num in nums)
        {
            prefix += num == 0 ? -1 : 1;
            ans += Get(Remap(prefix - 1));
            ans %= mod;
            Add(Remap(prefix), 1);
        }

        return (int)ans;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
