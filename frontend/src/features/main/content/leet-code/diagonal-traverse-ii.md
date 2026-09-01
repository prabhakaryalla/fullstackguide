# 1424. Diagonal Traverse II

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

Given a 2D jagged integer list `nums`, return all elements in diagonal order — grouping elements whose row + column index sum is equal, and listing elements within the same diagonal from the highest row index to the lowest.

### Example

```
Input: nums = [[1,2,3],[4,5],[6,7,8,9],[10,11,12,13,14]]
Output: [1,4,2,6,5,3,10,7,8,9,11,12,13,14]
```

## Approach

Scan the rows in order `0, 1, 2, ...` and, within each row, columns left to right. For each element, compute its diagonal key `row + col` and prepend it to that diagonal's bucket (a `LinkedList` for O(1) prepend). Because rows are scanned in increasing order, prepending naturally leaves each diagonal's bucket sorted by descending row index. Finally, concatenate the buckets in increasing diagonal-key order.

## C# Solution

```csharp
public class Solution
{
    public IList<int> FindDiagonalOrder(IList<IList<int>> nums)
    {
        var buckets = new Dictionary<int, LinkedList<int>>();
        int maxDiagonal = 0;

        for (int i = 0; i < nums.Count; i++)
        {
            for (int j = 0; j < nums[i].Count; j++)
            {
                int diagonal = i + j;
                if (!buckets.TryGetValue(diagonal, out var list))
                {
                    list = new LinkedList<int>();
                    buckets[diagonal] = list;
                }

                list.AddFirst(nums[i][j]);
                maxDiagonal = Math.Max(maxDiagonal, diagonal);
            }
        }

        var result = new List<int>();
        for (int d = 0; d <= maxDiagonal; d++)
            if (buckets.TryGetValue(d, out var list))
                result.AddRange(list);

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the total number of elements.
- **Space:** `O(n)` for the buckets and result list.
