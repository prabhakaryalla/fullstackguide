# 3739. Count Subarrays With Majority Element II

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Prefix Sum

## Problem

Same as "Count Subarrays With Majority Element I" but `nums` can be very large, requiring a sub-quadratic solution.

### Example

nums = [2,2,1,2], x = 2 → subarrays where 2 is strict majority: [2],[2](idx1),[2](idx3),[2,2],[2,2,1],[2,2,1,2] → total 6.

## Approach

Use the same `+1`/`-1` transform and prefix sums as version I, but count valid pairs `i < j` with `prefix[j] - prefix[i] > 0` efficiently: coordinate-compress all prefix values, then sweep `j` left to right, at each step querying a Binary Indexed Tree for the count of previously inserted prefix values strictly less than `prefix[j]`, then inserting `prefix[j]`.

## C# Solution

```csharp
public class Solution 
{
    public long CountSubarraysWithMajority(int[] nums, int x) 
    {
        int n = nums.Length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) 
        {
            prefix[i + 1] = prefix[i] + (nums[i] == x ? 1 : -1);
        }

        int[] sorted = (int[])prefix.Clone();
        Array.Sort(sorted);
        int m = sorted.Length;

        int[] bit = new int[m + 2];
        void Update(int i) 
        {
            for (i++; i <= m; i += i & (-i)) bit[i]++;
        }
        long Query(int i) 
        {
            long s = 0;
            for (i++; i > 0; i -= i & (-i)) s += bit[i];
            return s;
        }

        long count = 0;
        for (int j = 0; j <= n; j++) 
        {
            int rank = Array.BinarySearch(sorted, prefix[j]);
            while (rank > 0 && sorted[rank - 1] == prefix[j]) rank--;
            if (rank > 0) count += Query(rank - 1);
            Update(rank);
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
