# 1804. Implement Trie II (Prefix Tree)

**Difficulty:** Medium
**Category:** Design, Trie, Hash Table, String

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Implement a trie (`Trie` class) with `Insert(word)`, `CountWordsEqualTo(word)` (number of times `word` was inserted), `CountWordsStartingWith(prefix)` (number of inserted words having `prefix` as a prefix), and `Erase(word)` (removes one occurrence of a previously inserted `word`).

### Example

```
Input: ["Trie","insert","insert","countWordsEqualTo","countWordsStartingWith","erase","countWordsEqualTo","countWordsStartingWith"]
       [[],["apple"],["apple"],["apple"],["app"],["apple"],["apple"],["app"]]
Output: [null,null,null,2,2,null,1,1]
```

## Approach

Each trie node tracks `WordCount` (how many inserted words end exactly here) and `PrefixCount` (how many inserted words pass through this node). `Insert` walks/creates nodes for each character, incrementing `PrefixCount` along the way and `WordCount` at the final node. `CountWordsEqualTo`/`CountWordsStartingWith` walk to the node for the given string and read `WordCount`/`PrefixCount` (or `0` if the path doesn't exist). `Erase` walks the existing path (guaranteed present per the problem's constraints) decrementing `PrefixCount` along the way and `WordCount` at the end.

## C# Solution

```csharp
public class Trie
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[26];
        public int WordCount;
        public int PrefixCount;
    }

    private readonly TrieNode _root = new TrieNode();

    public void Insert(string word)
    {
        var node = _root;
        foreach (char c in word)
        {
            int i = c - 'a';
            if (node.Children[i] == null) node.Children[i] = new TrieNode();
            node = node.Children[i];
            node.PrefixCount++;
        }
        node.WordCount++;
    }

    public int CountWordsEqualTo(string word)
    {
        var node = Find(word);
        return node?.WordCount ?? 0;
    }

    public int CountWordsStartingWith(string prefix)
    {
        var node = Find(prefix);
        return node?.PrefixCount ?? 0;
    }

    public void Erase(string word)
    {
        var node = _root;
        foreach (char c in word)
        {
            node = node.Children[c - 'a'];
            node.PrefixCount--;
        }
        node.WordCount--;
    }

    private TrieNode Find(string word)
    {
        var node = _root;
        foreach (char c in word)
        {
            node = node.Children[c - 'a'];
            if (node == null) return null;
        }
        return node;
    }
}
```

## Complexity

- **Time:** `O(L)` per operation, where `L` is the length of the word/prefix involved.
- **Space:** `O(total characters inserted)` for the trie nodes.
