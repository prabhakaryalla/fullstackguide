# 3527. Find the Most Common Response

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting, String

## Problem
You are given `responses`, a list where each element is itself a list of strings representing the responses submitted in one survey/session (a response may repeat within the same session, but repeats within a single session should only count **once** toward that response's overall popularity). Find the response that appears in the most sessions (counting each session's distinct responses); if there is a tie, return the lexicographically smallest such response.

### Example
Input: `responses = [["good","ok"],["good","good"],["ok"]]` → `"good"` appears in sessions 0 and 1 (2 sessions), `"ok"` appears in sessions 0 and 2 (2 sessions). Tie, so return the lexicographically smaller: Output: `"good"`.

## Approach
For each inner list, take its **distinct** set of responses (deduplicating within that session), and increment a global frequency counter for each distinct response. After processing all sessions, scan the frequency map to find the maximum frequency, then return the lexicographically smallest response achieving that maximum.

## C# Solution

```csharp
public class Solution {
    public string FindCommonResponse(IList<IList<string>> responses) {
        var count = new Dictionary<string, int>();

        foreach (var response in responses) {
            var distinct = new HashSet<string>(response);
            foreach (string r in distinct) {
                count[r] = count.TryGetValue(r, out int c) ? c + 1 : 1;
            }
        }

        int maxFreq = 0;
        foreach (int freq in count.Values) maxFreq = Math.Max(maxFreq, freq);

        string ans = null;
        foreach (var entry in count) {
            if (entry.Value == maxFreq && (ans == null || string.CompareOrdinal(entry.Key, ans) < 0)) {
                ans = entry.Key;
            }
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(Sum of the lengths of all inner lists)
- **Space:** O(Sum of the lengths of all inner lists) for the distinct-response sets and frequency map
