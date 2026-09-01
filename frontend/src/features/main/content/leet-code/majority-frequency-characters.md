# 3692. Majority Frequency Characters

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

You are given a string `s` consisting of lowercase English letters.

The frequency group for a value `k` is the set of characters that appear exactly `k` times in `s`. The majority frequency group is the frequency group that contains the largest number of distinct characters.

Return a string containing all characters in the majority frequency group, in any order. If two or more frequency groups tie for the largest size, pick the group whose frequency `k` is larger.

### Example

```
Input: s = "aaabbbccdddde"
Output: "ab"
Explanation: 'a' and 'b' each occur 3 times, more distinct characters than any other frequency group.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists only of lowercase English letters.

## Approach

Count the occurrences of each character, then group characters by their frequency. Scan the groups to find the one with the most distinct characters, breaking ties by preferring the larger frequency value. Return all characters in that winning group.

## C# Solution

```csharp
public class Solution
{
    public string MajorityFrequencyGroup(string s)
    {
        int[] freq = new int[26];
        foreach (char c in s)
        {
            freq[c - 'a']++;
        }

        Dictionary<int, List<char>> groups = new Dictionary<int, List<char>>();
        for (int i = 0; i < 26; i++)
        {
            if (freq[i] == 0) continue;

            if (!groups.TryGetValue(freq[i], out List<char> chars))
            {
                chars = new List<char>();
                groups[freq[i]] = chars;
            }
            chars.Add((char)('a' + i));
        }

        int bestSize = -1, bestFrequency = -1;
        foreach (var entry in groups)
        {
            int frequency = entry.Key;
            int size = entry.Value.Count;

            if (size > bestSize || (size == bestSize && frequency > bestFrequency))
            {
                bestSize = size;
                bestFrequency = frequency;
            }
        }

        return new string(groups[bestFrequency].ToArray());
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `s`.
- **Space:** `O(1)` — at most 26 distinct characters.
