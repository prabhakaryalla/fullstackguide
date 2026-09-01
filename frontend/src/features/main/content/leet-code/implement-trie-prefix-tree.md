# 208. Implement Trie (Prefix Tree)

**Difficulty:** Medium
**Category:** Hash Table, String, Design, Trie

## Problem

Implement a trie with `Insert(word)`, `Search(word)` (exact match), and `StartsWith(prefix)` (any inserted word begins with this prefix).

### Example

```
Insert("apple")
Search("apple") -> true
Search("app") -> false
StartsWith("app") -> true
```

## Approach

Each trie node holds a fixed-size array (or dictionary) of child pointers, one per possible next character, plus a flag marking whether a complete word ends there. `Insert` walks/creates nodes character by character. `Search` walks the same path and additionally requires the final node's end-of-word flag to be set (distinguishing a full word from just a prefix). `StartsWith` only needs the path to exist.

## C# Solution

```csharp
public class Trie
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[26];
        public bool IsEndOfWord;
    }

    private readonly TrieNode root = new();

    public void Insert(string word)
    {
        var node = root;

        foreach (char c in word)
        {
            int index = c - 'a';
            node.Children[index] ??= new TrieNode();
            node = node.Children[index];
        }

        node.IsEndOfWord = true;
    }

    public bool Search(string word)
    {
        var node = Find(word);
        return node != null && node.IsEndOfWord;
    }

    public bool StartsWith(string prefix)
    {
        return Find(prefix) != null;
    }

    private TrieNode Find(string s)
    {
        var node = root;

        foreach (char c in s)
        {
            int index = c - 'a';
            if (node.Children[index] == null) return null;
            node = node.Children[index];
        }

        return node;
    }
}
```

## Complexity

- **Time:** `O(L)` per operation — where `L` is the word/prefix length.
- **Space:** `O(N * L)` — where `N` is the number of inserted words.
