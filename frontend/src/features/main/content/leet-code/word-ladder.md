# 127. Word Ladder

**Difficulty:** Hard
**Category:** Hash Table, String, Breadth-First Search

## Problem

Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the length of the **shortest** transformation sequence from `beginWord` to `endWord` (each step changes exactly one letter, and every intermediate word must appear in `wordList`), or `0` if no such sequence exists.

### Example 1

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: "hit" -> "hot" -> "dot" -> "dog" -> "cog", 5 words in the sequence.
```

```mermaid
graph LR
    A["hit"] --> B["hot"] --> C["dot"] --> D["dog"] --> E["cog"]
    style A fill:#4caf50,color:#fff
    style E fill:#4caf50,color:#fff
```

### Example 2

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
```

### Constraints

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- All words consist of lowercase English letters.

## Approach

This is an unweighted shortest-path problem, solved with plain BFS: treat every word as a graph node, with an edge between two words that differ by exactly one letter. Starting from `beginWord`, expand outward level by level, trying every possible single-letter substitution at each position; remove a word from the dictionary once discovered so it isn't revisited. The first time `endWord` is reached, the current BFS depth is the answer.

## C# Solution

```csharp
public class Solution
{
    public int LadderLength(string beginWord, string endWord, IList<string> wordList)
    {
        var dictionary = new HashSet<string>(wordList);
        if (!dictionary.Contains(endWord)) return 0;

        var queue = new Queue<string>();
        queue.Enqueue(beginWord);
        int steps = 1;

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;

            for (int i = 0; i < levelSize; i++)
            {
                string word = queue.Dequeue();
                if (word == endWord) return steps;

                var chars = word.ToCharArray();

                for (int pos = 0; pos < chars.Length; pos++)
                {
                    char original = chars[pos];

                    for (char c = 'a'; c <= 'z'; c++)
                    {
                        if (c == original) continue;
                        chars[pos] = c;
                        string candidate = new string(chars);

                        if (dictionary.Remove(candidate))
                        {
                            queue.Enqueue(candidate);
                        }
                    }

                    chars[pos] = original;
                }
            }

            steps++;
        }

        return 0;
    }
}
```

## Complexity

- **Time:** `O(N * L^2 * 26)` — `N` words of length `L`, each trying `26` substitutions per position.
- **Space:** `O(N)` — for the dictionary and queue.
