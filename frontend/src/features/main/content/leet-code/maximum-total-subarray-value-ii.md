# 3691. Maximum Total Subarray Value II

**Difficulty:** Hard
**Category:** Array, Greedy, Segment Tree, Heap (Priority Queue)

## Problem

You are given an integer array `nums` of length `n` and an integer `k`.

You must select exactly `k` **distinct** subarrays `nums[l..r]`. Subarrays may overlap, but the exact same subarray (same `l` and `r`) cannot be chosen more than once.

The value of a subarray `nums[l..r]` is defined as `max(nums[l..r]) - min(nums[l..r])`. The total value is the sum of the values of all chosen subarrays.

Return the maximum possible total value you can achieve.

### Example

```
Input: nums = [1,3,2], k = 2
Output: 4
Explanation: Choose nums[0..1] (value 2) and nums[0..2] (value 2); total = 4.
```

### Constraints

- `1 <= n == nums.length <= 5 * 10^4`
- `0 <= nums[i] <= 10^9`
- `1 <= k <= min(10^5, n * (n + 1) / 2)`

## Approach

For a fixed left endpoint `l`, the value `v(l, r) = max(nums[l..r]) - min(nums[l..r])` is non-increasing as `r` shrinks toward `l` (a smaller window can't have a larger spread). This means the best remaining candidate for each `l` is always its current largest `r`. Build a sparse table for O(1) range max/min queries, seed a max-heap with `(v(l, n-1), l, n-1)` for every `l`, and repeatedly pop the largest value `k` times; after popping `(l, r)`, push the next candidate `(l, r-1)` for the same `l` (if it still forms a valid subarray).

## C# Solution

```csharp
public class Solution
{
    private int[][] maxSparse, minSparse;
    private int[] log;

    public long MaxTotalValue(int[] nums, int k)
    {
        int n = nums.Length;
        BuildSparseTables(nums);

        PriorityQueue<(int l, int r), int> heap =
            new PriorityQueue<(int, int), int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));

        for (int l = 0; l < n; l++)
        {
            heap.Enqueue((l, n - 1), Query(l, n - 1));
        }

        long total = 0;
        for (int picked = 0; picked < k; picked++)
        {
            var (l, r) = heap.Dequeue();
            total += Query(l, r);

            if (r - 1 >= l)
            {
                heap.Enqueue((l, r - 1), Query(l, r - 1));
            }
        }

        return total;
    }

    private void BuildSparseTables(int[] nums)
    {
        int n = nums.Length;
        log = new int[n + 1];
        for (int i = 2; i <= n; i++)
        {
            log[i] = log[i / 2] + 1;
        }

        int levels = log[n] + 1;
        maxSparse = new int[levels][];
        minSparse = new int[levels][];
        maxSparse[0] = (int[])nums.Clone();
        minSparse[0] = (int[])nums.Clone();

        for (int j = 1; j < levels; j++)
        {
            int length = 1 << j;
            int half = 1 << (j - 1);
            maxSparse[j] = new int[n - length + 1];
            minSparse[j] = new int[n - length + 1];

            for (int i = 0; i + length <= n; i++)
            {
                maxSparse[j][i] = Math.Max(maxSparse[j - 1][i], maxSparse[j - 1][i + half]);
                minSparse[j][i] = Math.Min(minSparse[j - 1][i], minSparse[j - 1][i + half]);
            }
        }
    }

    private int Query(int l, int r)
    {
        int length = r - l + 1;
        int j = log[length];
        int half = 1 << j;
        int maxVal = Math.Max(maxSparse[j][l], maxSparse[j][r - half + 1]);
        int minVal = Math.Min(minSparse[j][l], minSparse[j][r - half + 1]);
        return maxVal - minVal;
    }
}
```

## Complexity

- **Time:** `O(n log n + k log n)` for building the sparse tables and processing heap operations.
- **Space:** `O(n log n)` for the sparse tables.
