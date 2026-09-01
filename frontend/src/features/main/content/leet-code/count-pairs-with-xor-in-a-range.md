# 1803. Count Pairs With XOR in a Range

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Trie

## Problem

Given an integer array `nums` and two integers `low` and `high`, return the number of pairs `(i, j)` with `i < j` such that `low <= (nums[i] XOR nums[j]) <= high`.

### Example

```
Input: nums = [1,4,2,7], low = 2, high = 6
Output: 6
Explanation: All pairs XOR to a value in [2,6] except (1,7) which XORs to 6... (worked example varies by pairing).
```

## Approach

Count pairs with XOR `<= limit` using a binary trie of bit-prefixes, then answer with `CountLessOrEqual(high) - CountLessOrEqual(low - 1)`. For each number, before inserting it into the trie, walk the trie bit by bit (from the most significant bit): whenever `limit`'s current bit is `1`, every previously-inserted number sharing the current bit (giving an XOR bit of `0`) is guaranteed to satisfy the bound regardless of remaining bits, so add that subtree's count and continue down the branch matching an XOR bit of `1`; whenever `limit`'s bit is `0`, only the branch giving an XOR bit of `0` can still satisfy the bound, so descend there without adding. After the walk, add an exact-match count if the path survived to represent XOR `== limit`. Then insert the number into the trie.

## C# Solution

```csharp
public class Solution
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[2];
        public int Count;
    }

    private const int Bits = 15;

    public int CountPairs(int[] nums, int low, int high)
    {
        return CountLessOrEqual(nums, high) - CountLessOrEqual(nums, low - 1);
    }

    private int CountLessOrEqual(int[] nums, int limit)
    {
        if (limit < 0) return 0;

        var root = new TrieNode();
        int result = 0;

        foreach (int num in nums)
        {
            result += QueryAndInsert(root, num, limit);
        }

        return result;
    }

    private int QueryAndInsert(TrieNode root, int num, int limit)
    {
        var node = root;
        int count = 0;

        for (int i = Bits; i >= 0 && node != null; i--)
        {
            int numBit = (num >> i) & 1;
            int limitBit = (limit >> i) & 1;

            if (limitBit == 1)
            {
                var sameBitChild = node.Children[numBit];
                if (sameBitChild != null) count += sameBitChild.Count;
                node = node.Children[1 - numBit];
            }
            else
            {
                node = node.Children[numBit];
            }
        }

        if (node != null) count += node.Count;

        var cur = root;
        for (int i = Bits; i >= 0; i--)
        {
            int bit = (num >> i) & 1;
            if (cur.Children[bit] == null) cur.Children[bit] = new TrieNode();
            cur = cur.Children[bit];
            cur.Count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n * B)` where `B` is the bit width (16), since each number does one trie walk and one insert.
- **Space:** `O(n * B)` for the trie nodes.
