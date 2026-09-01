# 1945. Sum of Digits of String After Convert

**Difficulty:** Easy
**Category:** String, Simulation

## Problem

Given a string `s` of lowercase English letters and an integer `k`, first convert `s` to an integer by replacing each letter with its position in the alphabet (`'a' -> 1, ..., 'z' -> 26`) concatenated together. Then, repeat `k` times: replace the current number with the sum of its digits. Return the final integer.

### Example

```
Input: s = "iiii", k = 1
Output: 36
Explanation: "iiii" -> "9999" -> 9+9+9+9 = 36 (after 1 transform).
```

### Constraints

- `1 <= s.length <= 100`
- `1 <= k <= 10`
- `s` consists of lowercase English letters only.

## Approach

Build the initial numeric string by mapping each letter to its 1-26 alphabet position and concatenating those numbers as text. Then apply the "sum of digits" transform exactly `k` times, each time summing the digits of the current value (represented as a number, which shrinks quickly after the first transform).

## C# Solution

```csharp
public class Solution
{
    public int GetLucky(string s, int k)
    {
        var sb = new System.Text.StringBuilder();
        foreach (char c in s)
        {
            sb.Append(c - 'a' + 1);
        }

        string current = sb.ToString();

        for (int i = 0; i < k; i++)
        {
            long sum = 0;
            foreach (char c in current)
            {
                sum += c - '0';
            }
            current = sum.ToString();
        }

        return int.Parse(current);
    }
}
```

## Complexity

- **Time:** `O(n + k * d)` where `d` is the number of digits after the first transform (small).
- **Space:** `O(n)` for the initial numeric string.
