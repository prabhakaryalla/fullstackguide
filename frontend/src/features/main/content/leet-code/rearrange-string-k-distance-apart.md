# 358. Rearrange String k Distance Apart

**Difficulty:** Hard
**Category:** Hash Table, String, Greedy, Sorting, Heap, Counting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s` and an integer `k`, rearrange the string such that the same characters are at least distance `k` from each other. Return any valid rearrangement, or an empty string if impossible.

### Example

```
Input: s = "aabbcc", k = 3
Output: "abcabc"
```

### Constraints

- `1 <= s.length <= 3 * 10^4`
- `s` consists of only lowercase English letters.
- `0 <= k <= s.length`

## Approach

Greedily place the most frequent remaining character at each position, using a max-heap keyed by remaining count. After placing a character, it can't be reused until `k` positions have passed, so hold it in a waiting queue tagged with the position at which it becomes eligible again; check that queue at the start of every position to release characters back into the heap. If the heap ever empties while characters are still waiting (and the output isn't yet complete), no valid arrangement exists.

## C# Solution

```csharp
public class Solution
{
    public string RearrangeString(string s, int k)
    {
        if (k <= 1) return s;

        var counts = new Dictionary<char, int>();
        foreach (var c in s)
            counts[c] = counts.GetValueOrDefault(c) + 1;

        var maxHeap = new PriorityQueue<char, int>();
        foreach (var pair in counts)
            maxHeap.Enqueue(pair.Key, -pair.Value);

        var result = new StringBuilder();
        var waitQueue = new Queue<(char Char, int Count, int AvailableAt)>();

        int position = 0;
        while (maxHeap.Count > 0 || waitQueue.Count > 0)
        {
            if (waitQueue.Count > 0 && waitQueue.Peek().AvailableAt == position)
            {
                var (c, count, _) = waitQueue.Dequeue();
                maxHeap.Enqueue(c, -count);
            }

            if (maxHeap.Count == 0) return "";

            maxHeap.TryDequeue(out var current, out var negCount);
            result.Append(current);

            int remaining = -negCount - 1;
            if (remaining > 0)
                waitQueue.Enqueue((current, remaining, position + k));

            position++;
        }

        return result.Length == s.Length ? result.ToString() : "";
    }
}
```

## Complexity

- **Time:** `O(n log 26)`, effectively `O(n)`.
- **Space:** `O(n)` for the heap and waiting queue.
