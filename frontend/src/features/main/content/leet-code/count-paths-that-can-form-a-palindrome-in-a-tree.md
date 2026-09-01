# 2791. Count Paths That Can Form a Palindrome in a Tree

**Difficulty:** Hard
**Category:** Bit Manipulation, Tree, Hash Table, Bitmask, Depth-First Search

## Problem

You are given a tree rooted at node 0 with `n` nodes, described by a 0-indexed array `parent` (`parent[i]` is the parent of node `i`, and `parent[0] = -1`) and a string `s` where `s[i]` is the lowercase letter on the edge connecting node `i` to `parent[i]` (for `i >= 1`). Return the number of pairs of nodes `(u, v)` such that the characters along the path between `u` and `v` can be rearranged into a palindrome.

### Example

Consider parent = [-1,0,0,1,1,2], s = "acaaba". The characters along the path between any two nodes can be checked for the palindrome-rearrangement property (at most one letter with an odd count), and the total number of such qualifying pairs is returned.

## Approach

A multiset of characters can be rearranged into a palindrome if and only if at most one character has an odd count. For each node, compute `mask[node]`: a 26-bit bitmask where bit `c` is toggled every time a letter `c` appears an odd number of times on the path from the root to that node (XOR of `1 << (s[i]-'a')` along the root path). Two nodes `u` and `v` form a qualifying pair exactly when `popcount(mask[u] XOR mask[v]) <= 1`, since the XOR cancels out the shared root-to-LCA prefix and leaves the parity of the path between them. Process nodes in order (parent before child), keep a hash map counting how many times each mask value has been seen, and for each new node's mask add the count of nodes with the *same* mask (path parity is already even) plus the counts of nodes whose mask differs by exactly one bit (single odd-count letter) — then record the new mask in the map.

## C# Solution

```csharp
public class Solution 
{
    public long CountPalindromePaths(IList<int> parent, string s) 
    {
        int n = parent.Count;
        var mask = new int[n];
        var cnt = new Dictionary<int, long>();
        cnt[0] = 1;

        long answer = 0;

        for (int i = 1; i < n; i++) 
        {
            mask[i] = mask[parent[i]] ^ (1 << (s[i] - 'a'));

            answer += cnt.GetValueOrDefault(mask[i], 0L);
            for (int bit = 0; bit < 26; bit++) 
            {
                answer += cnt.GetValueOrDefault(mask[i] ^ (1 << bit), 0L);
            }

            cnt[mask[i]] = cnt.GetValueOrDefault(mask[i], 0L) + 1;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n · 26)
- **Space:** O(n)
