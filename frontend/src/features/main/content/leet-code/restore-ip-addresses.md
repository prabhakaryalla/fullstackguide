# 93. Restore IP Addresses

**Difficulty:** Medium
**Category:** String, Backtracking

## Problem

Given a string `s` containing only digits, return all possible valid IP address combinations that can be formed by inserting dots into `s`. A valid IP address consists of exactly four integers, each between `0` and `255`, separated by dots, with no leading zeros (except the segment `"0"` itself).

### Example 1

```
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
```

```mermaid
graph LR
    A["255"] --- B["255"] --- C["11"] --- D["135"]
    style A fill:#4caf50,color:#fff
    style B fill:#4caf50,color:#fff
```

### Example 2

```
Input: s = "0000"
Output: ["0.0.0.0"]
```

### Constraints

- `1 <= s.length <= 20`
- `s` consists of digits only.

## Approach

Backtrack, choosing the length (1, 2, or 3 digits) of each of the four segments. At each step, validate the candidate segment: it must not have a leading zero (unless it's exactly `"0"`), and its numeric value must be `<= 255`. Once all four segments are chosen and the entire string is consumed, the combination is valid.

## C# Solution

```csharp
public class Solution
{
    public IList<string> RestoreIpAddresses(string s)
    {
        var result = new List<string>();
        Backtrack(s, 0, new List<string>(), result);
        return result;
    }

    private void Backtrack(string s, int start, List<string> segments, List<string> result)
    {
        if (segments.Count == 4)
        {
            if (start == s.Length)
            {
                result.Add(string.Join(".", segments));
            }
            return;
        }

        for (int len = 1; len <= 3 && start + len <= s.Length; len++)
        {
            string segment = s.Substring(start, len);

            if (!IsValidSegment(segment)) continue;

            segments.Add(segment);
            Backtrack(s, start + len, segments, result);
            segments.RemoveAt(segments.Count - 1);
        }
    }

    private bool IsValidSegment(string segment)
    {
        if (segment.Length > 1 && segment[0] == '0') return false;
        return int.Parse(segment) <= 255;
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by a constant search space (at most `3^4` segment-length combinations).
- **Space:** `O(1)` extra, excluding the output.
