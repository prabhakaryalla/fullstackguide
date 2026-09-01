# 466. Count The Repetitions

**Difficulty:** Hard
**Category:** String, Dynamic Programming

## Problem

Define `str = [s, n]` as the string `s` concatenated `n` times. Given strings `s1`, `s2` and integers `n1`, `n2` such that `str([s2, n2])` can be obtained from `str([s1, n1])` as a subsequence, return the maximum integer `m` such that `str([s2, m])` can be obtained from `str([s1, n1])` as a subsequence.

### Example

```
Input: s1 = "acb", n1 = 4, s2 = "ab", n2 = 1
Output: 2
```

### Constraints

- `1 <= s1.length, s2.length <= 100`
- `s1` and `s2` consist of lowercase English letters.
- `1 <= n1, n2 <= 10^6`

## Approach

For each possible starting position within `s2` (there are only `s2.Length` of them), simulate matching one full copy of `s1` against `s2` starting from that position, recording how many complete copies of `s2` are consumed and which position within `s2` the match ends at. Since the ending position after each `s1` copy only depends on the starting position, this creates a short cycle across the `n1` copies of `s1`, letting the total `s2` matches be summed by repeatedly following the recorded transitions instead of simulating all `n1` copies directly.

## C# Solution

```csharp
public class Solution
{
    public int GetMaxRepetitions(string s1, int n1, string s2, int n2)
    {
        if (n1 == 0) return 0;

        int len1 = s1.Length, len2 = s2.Length;
        var nextIndex = new int[len2];
        var countS2PerS1 = new int[len2];

        for (int start = 0; start < len2; start++)
        {
            int j = start;
            int count = 0;

            for (int i = 0; i < len1; i++)
            {
                if (s1[i] == s2[j])
                {
                    j++;
                    if (j == len2)
                    {
                        j = 0;
                        count++;
                    }
                }
            }

            nextIndex[start] = j;
            countS2PerS1[start] = count;
        }

        int totalS2Count = 0;
        int index = 0;

        for (int i = 0; i < n1; i++)
        {
            totalS2Count += countS2PerS1[index];
            index = nextIndex[index];
        }

        return totalS2Count / n2;
    }
}
```

## Complexity

- **Time:** `O(len1 * len2 + n1)`.
- **Space:** `O(len2)` for the transition tables.
