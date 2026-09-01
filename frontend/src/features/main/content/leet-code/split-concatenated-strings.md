# 555. Split Concatenated Strings

**Difficulty:** Medium
**Category:** Array, String, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array of strings `strs`, form a big looped string by concatenating each string (optionally reversed) in order, then choose one point in the loop to split it back into a regular string. Return the lexicographically largest string achievable this way.

### Example

```
Input: strs = ["abc","xyz"]
Output: "zyxcba"
```

### Constraints

- `1 <= strs.length <= 1000`
- `1 <= strs[i].length <= 1000`

## Approach

For each string, independently pick whichever of itself or its reverse is lexicographically larger, since only the larger option could ever help maximize the final result — this fixes each piece's orientation up front. Then, for every piece in turn, try both of its orientations again as the "cut piece" (the one being rotated), and for every possible rotation point within it, build the candidate result by rotating that piece and appending all the other (already-fixed) pieces after it; track the lexicographically largest candidate seen across all pieces, orientations, and rotation points.

## C# Solution

```csharp
public class Solution
{
    public string SplitLoopedString(string[] strs)
    {
        var pieces = new string[strs.Length];
        for (int i = 0; i < strs.Length; i++)
        {
            var reversed = new string(strs[i].Reverse().ToArray());
            pieces[i] = string.CompareOrdinal(strs[i], reversed) >= 0 ? strs[i] : reversed;
        }

        string best = "";

        for (int i = 0; i < pieces.Length; i++)
        {
            for (int rotation = 0; rotation < 2; rotation++)
            {
                var candidate = rotation == 0 ? pieces[i] : new string(pieces[i].Reverse().ToArray());

                for (int cut = 0; cut <= candidate.Length; cut++)
                {
                    var sb = new StringBuilder();
                    sb.Append(candidate.Substring(cut)).Append(candidate.Substring(0, cut));

                    for (int j = 0; j < pieces.Length; j++)
                    {
                        if (j == i) continue;
                        sb.Append(pieces[j]);
                    }

                    var result = sb.ToString();
                    if (string.CompareOrdinal(result, best) > 0)
                        best = result;
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n * L^2)`, where `n` is the number of strings and `L` is the average string length.
- **Space:** `O(n * L)` for the pieces and candidate strings.
