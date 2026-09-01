# 3597. Partition String

**Difficulty:** Medium
**Category:** String, Hash Table, Greedy

## Problem
Given a string `s`, partition it into the minimum number of substrings such that all substrings in the partition are distinct (no two substrings are equal), using a greedy left-to-right approach: at each position, extend the current substring as long as possible without repeating a substring already used, then cut. Return the list of substrings forming the partition.

## Approach
Iterate through the string while building the current candidate substring character by character. Maintain a hash set of substrings already used in the partition. As soon as the current candidate (from the last cut point to the current index) is not present in the used set, cut here: add this substring to the result list and to the used set, then start a new candidate from the next character. Continue until the entire string is processed. This greedy strategy (cut as early as possible once uniqueness is achieved) naturally minimizes the number of pieces since we never extend beyond what is needed to guarantee distinctness.

## C# Solution

```csharp
public class Solution 
{
    public IList<string> PartitionString(string s) 
    {
        var result = new List<string>();
        var seen = new HashSet<string>();
        int start = 0;

        for (int i = 0; i < s.Length; i++)
        {
            string candidate = s.Substring(start, i - start + 1);
            if (!seen.Contains(candidate))
            {
                seen.Add(candidate);
                result.Add(candidate);
                start = i + 1;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n^2) in the worst case due to substring creation and hashing
- **Space:** O(n^2) for storing all substrings in the worst case
