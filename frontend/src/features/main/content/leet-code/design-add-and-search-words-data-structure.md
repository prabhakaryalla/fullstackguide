# 211. Design Add and Search Words Data Structure

**Difficulty:** Medium
**Category:** String, Depth-First Search, Design, Trie

## Problem

Design a data structure that supports adding words (`AddWord`) and searching for a word (`Search`), where the search word may contain `'.'` as a wildcard matching any single letter.

### Example

```
AddWord("bad"); AddWord("dad"); AddWord("mad");
Search("pad") -> false
Search(".ad") -> true
Search("b..") -> true
```

## Approach

Store words in a trie, same structure as Implement Trie. `AddWord` is identical to a normal trie insert. `Search` needs a recursive helper because of `'.'`: at a literal character, follow the single matching child (or fail if absent); at `'.'`, try every non-null child branch recursively, succeeding if any of them leads to a match.

## C# Solution

```csharp
public class WordDictionary
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[26];
        public bool IsEndOfWord;
    }

    private readonly TrieNode root = new();

    public void AddWord(string word)
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
        return SearchFrom(root, word, 0);
    }

    private bool SearchFrom(TrieNode node, string word, int index)
    {
        if (node == null) return false;
        if (index == word.Length) return node.IsEndOfWord;

        char c = word[index];

        if (c == '.')
        {
            foreach (var child in node.Children)
            {
                if (SearchFrom(child, word, index + 1)) return true;
            }
            return false;
        }

        return SearchFrom(node.Children[c - 'a'], word, index + 1);
    }
}
```

## Complexity

- **Time:** `O(L)` for `AddWord`; `O(26^L)` worst case for `Search` with all wildcards, where `L` is the word length.
- **Space:** `O(N * L)` — where `N` is the number of inserted words.
