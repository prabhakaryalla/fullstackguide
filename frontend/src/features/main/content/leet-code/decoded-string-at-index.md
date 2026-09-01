# 880. Decoded String at Index

**Difficulty:** Medium
**Category:** String, Stack, Recursion

## Problem

An encoded string `s` is decoded by processing it left to right: letters are appended to the decoded string, and a digit `d` causes the entire decoded string built so far to be repeated `d` times. Given `s` and an integer `k` (1-indexed), return the `k`-th character of the fully decoded string, without building it explicitly.

### Example

```
Input: s = "leet2code3", k = 10
Output: "o"
```

## Approach

First, scan forward through `s`, tracking the length (`size`) the decoded string would reach, stopping as soon as `size >= k` — this identifies the shortest prefix of `s` that already determines the `k`-th character. Then scan backward from that point: for a digit character, undo its multiplication (divide `size` by the digit) and reduce `k` modulo the new (smaller) size, since the same character at position `k` recurs at position `k mod size` within each repeated block. For a letter character, it represents the newly appended last position of the current `size` — if `k` is `0` or equals the (now-reduced) `size`, that letter is the answer; otherwise, shrink `size` by one and continue backward.

## C# Solution

```csharp
public class Solution
{
    public string DecodeAtIndex(string s, int k)
    {
        long size = 0;
        int i = 0;

        while (size < k)
        {
            if (char.IsDigit(s[i]))
                size *= s[i] - '0';
            else
                size++;

            i++;
        }

        for (int j = i - 1; j >= 0; j--)
        {
            char c = s[j];

            if (char.IsDigit(c))
            {
                size /= c - '0';
                k %= (int)size;
            }
            else
            {
                if (k == 0 || k == size)
                    return c.ToString();

                size--;
            }
        }

        return "";
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
