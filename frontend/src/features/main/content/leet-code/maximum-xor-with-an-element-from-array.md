# 1707. Maximum XOR With an Element From Array

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Trie, Sorting

## Problem

Given an array `nums` and queries `[xi, mi]`, for each query find the maximum XOR value of `xi` and any element of `nums` that does not exceed `mi`. Return `-1` for a query if no such element exists.

### Example

```
Input: nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
Output: [3,3,7]
```

## Approach

Sort `nums` and process queries in increasing order of `mi`, inserting eligible numbers into a binary trie as the limit grows. For each query, greedily walk the trie choosing the opposite bit whenever possible to maximize the XOR result.

## C# Solution

```csharp
public class Solution
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[2];
    }

    public int[] MaximizeXor(int[] nums, int[][] queries)
    {
        const int Bits = 30;
        Array.Sort(nums);

        int q = queries.Length;
        int[][] sortedQueries = new int[q][];
        for (int i = 0; i < q; i++)
            sortedQueries[i] = new int[] { queries[i][0], queries[i][1], i };
        Array.Sort(sortedQueries, (a, b) => a[1] - b[1]);

        int[] ans = new int[q];
        var root = new TrieNode();
        int idx = 0;

        foreach (var query in sortedQueries)
        {
            int x = query[0], m = query[1], qi = query[2];
            while (idx < nums.Length && nums[idx] <= m)
            {
                Insert(root, nums[idx], Bits);
                idx++;
            }

            if (idx == 0)
            {
                ans[qi] = -1;
                continue;
            }

            var node = root;
            int result = 0;
            for (int b = Bits; b >= 0; b--)
            {
                int bit = (x >> b) & 1;
                int want = 1 - bit;
                if (node.Children[want] != null)
                {
                    result |= 1 << b;
                    node = node.Children[want];
                }
                else
                {
                    node = node.Children[bit];
                }
            }
            ans[qi] = result;
        }

        return ans;
    }

    private void Insert(TrieNode root, int num, int bits)
    {
        var node = root;
        for (int b = bits; b >= 0; b--)
        {
            int bit = (num >> b) & 1;
            if (node.Children[bit] == null) node.Children[bit] = new TrieNode();
            node = node.Children[bit];
        }
    }
}
```

## Complexity

- **Time:** `O((n + q) log(max) + n log n + q log q)`.
- **Space:** `O(n log(max))` for the trie.
