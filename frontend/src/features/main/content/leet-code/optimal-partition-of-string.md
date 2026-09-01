# 2405. Optimal Partition of String

**Difficulty:** Medium
**Category:** Hash Table, String, Greedy

## Problem

Given a string `s`, partition the string into one or more substrings such that the characters in each substring are unique. That is, no letter appears in a single substring more than once.

Return the minimum number of substrings in such a partition.

Note that each character should belong to exactly one substring in a partition.

### Example

```
Input: s = "abacaba"
Output: 4
Explanation: Two possible partitions are ("a","ba","cab","a") and ("ab","a","ca","ba").
```

## Approach

Use a greedy approach with a hash set. Iterate through the string and maintain a set of seen characters in the current partition. When encountering a character already in the set, start a new partition (increment count and clear the set). Add the current character to the set and continue.

## C# Solution

```csharp
public class Solution
{
    public int PartitionString(string s)
    {
        int partitions = 1;
        HashSet<char> seen = new HashSet<char>();
        
        foreach (char c in s)
        {
            if (seen.Contains(c))
            {
                partitions++;
                seen.Clear();
            }
            seen.Add(c);
        }
        
        return partitions;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(min(n, 26)) for the hash set (at most 26 lowercase letters)
