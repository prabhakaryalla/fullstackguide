# 212. Word Search II

**Difficulty:** Hard
**Category:** Array, String, Backtracking, Trie, Matrix

## Problem

Given an `m x n` grid of characters `board` and a list of strings `words`, return all words from `words` that can be formed by a path of horizontally/vertically adjacent cells, without reusing a cell within a single word.

### Example

```
board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
words = ["oath","pea","eat","rain"] -> ["eat","oath"]
```

## Approach

Running a separate Word Search DFS per word would repeatedly re-scan the board. Instead, insert all words into a trie, then do a single DFS pass over the board following trie edges instead of comparing against one target word — many words sharing a prefix reuse the same branch of exploration, and unpromising cells can be pruned immediately (no matching trie child).

## C# Solution

```csharp
public class Solution
{
    private class TrieNode
    {
        public TrieNode[] Children = new TrieNode[26];
        public string Word;
    }

    public IList<string> FindWords(char[][] board, string[] words)
    {
        var root = new TrieNode();

        foreach (var word in words)
        {
            var node = root;
            foreach (char c in word)
            {
                int index = c - 'a';
                node.Children[index] ??= new TrieNode();
                node = node.Children[index];
            }
            node.Word = word;
        }

        var result = new List<string>();

        for (int row = 0; row < board.Length; row++)
        {
            for (int col = 0; col < board[0].Length; col++)
            {
                Dfs(board, row, col, root, result);
            }
        }

        return result;
    }

    private void Dfs(char[][] board, int row, int col, TrieNode node, List<string> result)
    {
        if (row < 0 || row >= board.Length || col < 0 || col >= board[0].Length) return;

        char c = board[row][col];
        if (c == '#' || node.Children[c - 'a'] == null) return;

        var next = node.Children[c - 'a'];

        if (next.Word != null)
        {
            result.Add(next.Word);
            next.Word = null; // avoid duplicate results
        }

        board[row][col] = '#';

        Dfs(board, row + 1, col, next, result);
        Dfs(board, row - 1, col, next, result);
        Dfs(board, row, col + 1, next, result);
        Dfs(board, row, col - 1, next, result);

        board[row][col] = c;
    }
}
```

## Complexity

- **Time:** `O(m * n * 4^L)` — where `L` is the longest word length, pruned significantly by the trie's shared prefixes.
- **Space:** `O(N * L)` — for the trie, where `N` is the number of words.
