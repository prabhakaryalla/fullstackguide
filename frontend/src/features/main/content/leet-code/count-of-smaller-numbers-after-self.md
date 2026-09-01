# 315. Count of Smaller Numbers After Self

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Binary Search, Divide and Conquer, Merge Sort

## Problem

Given an integer array `nums`, return an integer array `counts` where `counts[i]` is the number of smaller elements to the right of `nums[i]`.

### Example

```
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Approach

Coordinate-compress the values into ranks, then scan the array from right to left using a Binary Indexed Tree (Fenwick Tree) indexed by rank. For each element, query how many smaller ranks have already been inserted (elements seen so far, which are all to its right), then insert its own rank.

## C# Solution

```csharp
public class Solution
{
    public IList<int> CountSmaller(int[] nums)
    {
        int n = nums.Length;
        var sorted = (int[])nums.Clone();
        Array.Sort(sorted);

        var tree = new int[n + 1];
        var result = new int[n];

        for (int i = n - 1; i >= 0; i--)
        {
            int rank = LowerBound(sorted, nums[i]) + 1;
            result[i] = Query(tree, rank - 1);
            Update(tree, rank, n);
        }

        return result;
    }

    private int LowerBound(int[] sorted, int value)
    {
        int lo = 0, hi = sorted.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (sorted[mid] < value) lo = mid + 1;
            else hi = mid;
        }

        return lo;
    }

    private void Update(int[] tree, int i, int n)
    {
        for (; i <= n; i += i & (-i))
            tree[i]++;
    }

    private int Query(int[] tree, int i)
    {
        int sum = 0;
        for (; i > 0; i -= i & (-i))
            sum += tree[i];

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — one Fenwick tree operation per element.
- **Space:** `O(n)` for the tree and sorted array.
