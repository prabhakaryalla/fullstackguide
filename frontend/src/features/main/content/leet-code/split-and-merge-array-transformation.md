# 3690. Split and Merge Array Transformation

**Difficulty:** Medium
**Category:** Array, Hash Table, Breadth-First Search

## Problem

You are given two integer arrays `nums1` and `nums2`, each of length `n`. You may perform the following split-and-merge operation on `nums1` any number of times:

1. Choose a subarray `nums1[L..R]`.
2. Remove that subarray, leaving the prefix and suffix that remain.
3. Re-insert the removed subarray (in its original order) at any position in the remaining array.

Return the minimum number of split-and-merge operations needed to transform `nums1` into `nums2`.

### Example

```
Input: nums1 = [3,1,2], nums2 = [1,2,3]
Output: 1
Explanation: Split out [3] and re-insert it at the end to get [1,2,3].
```

### Constraints

- `2 <= n == nums1.length == nums2.length <= 6`
- `-10^5 <= nums1[i], nums2[i] <= 10^5`
- `nums2` is a permutation of `nums1`.

## Approach

Since `n <= 6`, the total number of distinct array states is small enough to search exhaustively. Perform a breadth-first search over array configurations, starting from `nums1`. From each state, generate every possible successor by choosing a subarray `[L, R]` to remove and every position to re-insert it, tracking visited states (encoded as strings) to avoid cycles. The first time `nums2` is reached, the current BFS depth is the minimum number of operations.

## C# Solution

```csharp
public class Solution
{
    public int MinSplitMerge(int[] nums1, int[] nums2)
    {
        string start = Encode(nums1);
        string target = Encode(nums2);

        if (start == target)
        {
            return 0;
        }

        HashSet<string> visited = new HashSet<string> { start };
        Queue<int[]> queue = new Queue<int[]>();
        queue.Enqueue(nums1);

        int steps = 0;

        while (queue.Count > 0)
        {
            steps++;
            int size = queue.Count;

            for (int iter = 0; iter < size; iter++)
            {
                int[] current = queue.Dequeue();
                int n = current.Length;

                for (int l = 0; l < n; l++)
                {
                    for (int r = l; r < n; r++)
                    {
                        int[] prefix = current.Take(l).ToArray();
                        int[] segment = current.Skip(l).Take(r - l + 1).ToArray();
                        int[] suffix = current.Skip(r + 1).ToArray();
                        int[] remaining = prefix.Concat(suffix).ToArray();

                        for (int pos = 0; pos <= remaining.Length; pos++)
                        {
                            int[] next = remaining.Take(pos).Concat(segment).Concat(remaining.Skip(pos)).ToArray();
                            string encoded = Encode(next);

                            if (encoded == target)
                            {
                                return steps;
                            }

                            if (visited.Add(encoded))
                            {
                                queue.Enqueue(next);
                            }
                        }
                    }
                }
            }
        }

        return -1;
    }

    private string Encode(int[] arr) => string.Join(",", arr);
}
```

## Complexity

- **Time:** `O(B^d)` in the worst case, where `B` is the branching factor per state and `d` the answer depth; bounded in practice by `n <= 6`.
- **Space:** `O(states)` for the visited set and BFS queue.
