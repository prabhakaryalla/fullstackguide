# 1649. Create Sorted Array through Instructions

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Segment Tree, Merge Sort, Ordered Set

## Problem

Given `instructions`, insert its values one at a time into an initially empty array, always inserting to keep the array sorted. The cost of each insertion is `min(count of already-inserted values strictly less than the current value, count of already-inserted values strictly greater than it)`. Return the total cost modulo `10^9 + 7`.

### Example

```
Input: instructions = [1,5,6,2]
Output: 1
```

## Approach

Maintain a Binary Indexed Tree (Fenwick tree) over the value range `[1, 100000]` tracking how many of each value have been inserted so far. Before inserting `value`, query the prefix sum up to `value - 1` for the "less than" count, and derive the "greater than" count as `insertedSoFar - prefixSum(value)`. Add the smaller of the two to the running cost, then update the tree.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;
    private int[] tree;
    private int size;

    public int CreateSortedArray(int[] instructions)
    {
        size = 100001;
        tree = new int[size + 1];
        long cost = 0;
        int inserted = 0;

        foreach (int value in instructions)
        {
            int lessCount = Query(value - 1);
            int greaterCount = inserted - Query(value);
            cost += Math.Min(lessCount, greaterCount);
            Update(value, 1);
            inserted++;
        }

        return (int)(cost % Mod);
    }

    private int Query(int index)
    {
        int sum = 0;

        for (; index > 0; index -= index & (-index))
        {
            sum += tree[index];
        }

        return sum;
    }

    private void Update(int index, int delta)
    {
        for (; index <= size; index += index & (-index))
        {
            tree[index] += delta;
        }
    }
}
```

## Complexity

- **Time:** `O(n log(maxValue))`.
- **Space:** `O(maxValue)` for the Fenwick tree.
