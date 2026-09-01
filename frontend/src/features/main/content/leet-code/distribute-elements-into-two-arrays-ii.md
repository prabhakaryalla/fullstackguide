# 3072. Distribute Elements Into Two Arrays II

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Sorting, Simulation

## Problem

This is the harder-constraints version of [Distribute Elements Into Two Arrays I](distribute-elements-into-two-arrays-i.md): given a 1-indexed array `nums` of distinct integers (up to `10^5` elements), distribute into `arr1`/`arr2` where the first two elements seed each array, and every subsequent element goes to whichever array currently has **more elements greater than it**; ties go to the shorter array (and if still tied, to `arr1`). Return the concatenation.

## Approach

"Number of elements greater than x already placed in an array" is exactly what a Fenwick (Binary Indexed Tree) over compressed ranks can answer in O(log n): compress all values to ranks `1..n`, maintain one Fenwick tree per output array counting placed elements, and query `arraySize - prefixCountUpToRank(x)` to get the count strictly greater than `x`.

## C# Solution

```csharp
public class Solution {
    public int[] ResultArray(int[] nums) {
        var sortedVals = nums.Distinct().OrderBy(x => x).ToArray();
        var ranks = new Dictionary<int, int>();
        for (int i = 0; i < sortedVals.Length; i++)
            ranks[sortedVals[i]] = i + 1;

        var arr1 = new List<int>();
        var arr2 = new List<int>();
        var tree1 = new FenwickTree(ranks.Count);
        var tree2 = new FenwickTree(ranks.Count);

        Add(nums[0], arr1, tree1, ranks);
        Add(nums[1], arr2, tree2, ranks);

        for (int i = 2; i < nums.Length; i++) {
            int greaterCount1 = arr1.Count - tree1.Get(ranks[nums[i]]);
            int greaterCount2 = arr2.Count - tree2.Get(ranks[nums[i]]);
            if (greaterCount1 > greaterCount2)
                Add(nums[i], arr1, tree1, ranks);
            else if (greaterCount1 < greaterCount2)
                Add(nums[i], arr2, tree2, ranks);
            else if (arr1.Count > arr2.Count)
                Add(nums[i], arr2, tree2, ranks);
            else
                Add(nums[i], arr1, tree1, ranks);
        }

        arr1.AddRange(arr2);
        return arr1.ToArray();
    }

    private void Add(int num, List<int> arr, FenwickTree tree, Dictionary<int, int> ranks) {
        arr.Add(num);
        tree.Add(ranks[num], 1);
    }

    private class FenwickTree {
        private readonly int[] sums;

        public FenwickTree(int n) {
            sums = new int[n + 1];
        }

        public void Add(int i, int delta) {
            for (; i < sums.Length; i += Lowbit(i))
                sums[i] += delta;
        }

        public int Get(int i) {
            int sum = 0;
            for (; i > 0; i -= Lowbit(i))
                sum += sums[i];
            return sum;
        }

        private static int Lowbit(int i) => i & -i;
    }
}
```

## Complexity

- Time: O(n log n) — each insertion/query does O(log n) Fenwick tree work.
- Space: O(n) — the rank map and Fenwick trees.
