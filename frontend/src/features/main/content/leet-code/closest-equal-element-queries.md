# 3488. Closest Equal Element Queries

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search

## Problem

You are given a **circular** integer array `nums` (the element after the last one is the first one), and an integer array `queries`.

For each `queries[i]`, let `q = queries[i]`. Find the minimum circular distance between index `q` and any other index `j` (`j != q`) such that `nums[j] == nums[q]`. The circular distance between indices `a` and `b` in an array of length `n` is `min(|a - b|, n - |a - b|)`. If no other index has the same value, the answer for that query is `-1`.

Return an array containing the answer to every query.

### Example

```
Input: nums = [1,3,1,4,1,3,2], queries = [0,3,5]
Output: [2,-1,3]
Explanation:
- queries[0] = 0: nums[0] = 1, also found at indices 2 and 4. Circular distance to 2 is 2, to 4 is min(4, 3) = 3. Minimum is 2.
- queries[1] = 3: nums[3] = 4 appears only once, so the answer is -1.
- queries[2] = 5: nums[5] = 3, also found at index 1. Circular distance is min(4, 3) = 3.
```

## Approach

Group indices by value; each group is naturally sorted in increasing order. For a query index `q`, binary search for `q` inside its value's group to find the immediate predecessor and successor in that sorted list (wrapping around the group for the circular neighbors). Compute the circular distance to each of those two neighbors and take the minimum. If the group has only one element, there is no other occurrence, so the answer is `-1`.

## C# Solution

```csharp
public class Solution 
{
    public IList<int> SolveQueries(int[] nums, int[] queries) 
    {
        int n = nums.Length;
        var indicesByValue = new Dictionary<int, List<int>>();
        for (int i = 0; i < n; i++)
        {
            if (!indicesByValue.TryGetValue(nums[i], out var list))
            {
                list = new List<int>();
                indicesByValue[nums[i]] = list;
            }
            list.Add(i);
        }

        var result = new List<int>();
        foreach (int q in queries)
        {
            var list = indicesByValue[nums[q]];
            if (list.Count == 1)
            {
                result.Add(-1);
                continue;
            }

            int pos = list.BinarySearch(q);
            int prevIdx = list[pos == 0 ? list.Count - 1 : pos - 1];
            int nextIdx = list[pos == list.Count - 1 ? 0 : pos + 1];
            int best = Math.Min(CircularDistance(q, prevIdx, n), CircularDistance(q, nextIdx, n));
            result.Add(best);
        }
        return result;
    }

    private int CircularDistance(int a, int b, int n)
    {
        int d = Math.Abs(a - b);
        return Math.Min(d, n - d);
    }
}
```

## Complexity

- **Time:** O(n + m log n), where n is the length of `nums` and m is the number of queries.
- **Space:** O(n) for the grouped indices.
