# 1032. Stream of Characters

**Difficulty:** Hard
**Category:** Design, Array, String, Trie, Data Stream

## Problem

Implement a `StreamChecker` class that receives one character at a time and, after each character, reports whether some suffix of the characters received so far forms one of the given `words`.

### Example

```
StreamChecker streamChecker = new StreamChecker(["cd","f","kl"]);
streamChecker.query('a'); // false
streamChecker.query('b'); // false
streamChecker.query('c'); // false
streamChecker.query('d'); // true, because 'cd' is in the wordlist
```

## Approach

Build a trie of the words **reversed**, so matching a suffix of the stream becomes matching a prefix of the reversed stream. Keep a rolling buffer of the most recent characters (bounded by the longest word length, since anything older can never be part of a valid suffix match). On each query, append the new character, then walk the trie backward from the most recent character; if a trie node marks the end of a word at any point, a valid suffix was found.

## C# Solution

```csharp
public class StreamChecker
{
    private class TrieNode
    {
        public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
        public bool IsWord;
    }

    private readonly TrieNode _root = new TrieNode();
    private readonly List<char> _stream = new List<char>();
    private readonly int _maxWordLength;

    public StreamChecker(string[] words)
    {
        int maxLen = 0;

        foreach (var word in words)
        {
            maxLen = Math.Max(maxLen, word.Length);
            var node = _root;

            for (int i = word.Length - 1; i >= 0; i--)
            {
                char c = word[i];
                if (!node.Children.TryGetValue(c, out var next))
                {
                    next = new TrieNode();
                    node.Children[c] = next;
                }
                node = next;
            }

            node.IsWord = true;
        }

        _maxWordLength = maxLen;
    }

    public bool Query(char letter)
    {
        _stream.Add(letter);
        if (_stream.Count > _maxWordLength) _stream.RemoveAt(0);

        var node = _root;
        for (int i = _stream.Count - 1; i >= 0; i--)
        {
            if (!node.Children.TryGetValue(_stream[i], out node)) return false;
            if (node.IsWord) return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(maxWordLength)` per query.
- **Space:** `O(total characters across words)` for the trie.
