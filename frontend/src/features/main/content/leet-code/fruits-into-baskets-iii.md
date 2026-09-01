# 3479. Fruits Into Baskets III

**Difficulty:** Medium
**Category:** Array, Segment Tree, Binary Search

## Problem

You are given two integer arrays `fruits` and `baskets`, each of length `n`, where `fruits[i]` represents the quantity of the `i`-th type of fruit and `baskets[j]` represents the capacity of the `j`-th basket. Starting from the leftmost fruit type, place each fruit type into the **leftmost available basket** whose capacity is greater than or equal to that fruit type's quantity; each basket can be used at most once. If no basket can hold a fruit type, it remains unplaced. Return the number of fruit types that remain unplaced. (Constraints here are larger than in the "II" version, requiring a more efficient search than a linear scan.)

### Example

`fruits = [4,2,5], baskets = [3,5,4]` → fruit type `4` uses basket index 1, fruit type `2` uses basket index 0, and fruit type `5` has no capable basket left, giving `1` unplaced fruit type.

## Approach

Build a max-segment tree over the basket capacities, indexed by basket position. For each fruit quantity, query the tree to find the leftmost position whose stored capacity is at least the required amount (descend into the left child first if its maximum satisfies the requirement, otherwise the right child); if found, mark that basket as used by setting its value to `-1` in the tree (so it can never satisfy a future requirement) and update the tree. If no valid position exists, count the fruit type as unplaced.

## C# Solution

```csharp
public class Solution 
{
    private int[] tree;
    private int n;

    public int NumOfUnplacedFruits(int[] fruits, int[] baskets) 
    {
        n = baskets.Length;
        tree = new int[4 * Math.Max(n, 1)];
        if (n > 0)
            Build(1, 0, n - 1, baskets);

        int unplaced = 0;

        foreach (int fruit in fruits)
        {
            if (n == 0 || tree[1] < fruit)
            {
                unplaced++;
                continue;
            }

            int pos = FindLeftmost(1, 0, n - 1, fruit);
            if (pos == -1)
                unplaced++;
            else
                Update(1, 0, n - 1, pos, -1);
        }

        return unplaced;
    }

    private void Build(int node, int l, int r, int[] baskets)
    {
        if (l == r)
        {
            tree[node] = baskets[l];
            return;
        }
        int mid = (l + r) / 2;
        Build(2 * node, l, mid, baskets);
        Build(2 * node + 1, mid + 1, r, baskets);
        tree[node] = Math.Max(tree[2 * node], tree[2 * node + 1]);
    }

    private void Update(int node, int l, int r, int pos, int value)
    {
        if (l == r)
        {
            tree[node] = value;
            return;
        }
        int mid = (l + r) / 2;
        if (pos <= mid)
            Update(2 * node, l, mid, pos, value);
        else
            Update(2 * node + 1, mid + 1, r, pos, value);
        tree[node] = Math.Max(tree[2 * node], tree[2 * node + 1]);
    }

    private int FindLeftmost(int node, int l, int r, int need)
    {
        if (tree[node] < need)
            return -1;
        if (l == r)
            return l;

        int mid = (l + r) / 2;
        int leftResult = FindLeftmost(2 * node, l, mid, need);
        if (leftResult != -1)
            return leftResult;
        return FindLeftmost(2 * node + 1, mid + 1, r, need);
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
