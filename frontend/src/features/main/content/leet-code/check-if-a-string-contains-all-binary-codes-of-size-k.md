# 1461. Check If a String Contains All Binary Codes of Size K

**Difficulty:** Medium
**Category:** Hash Table, String, Bit Manipulation, Rolling Hash, Sliding Window

## Problem

Given a binary string `s` and an integer `k`, return `true` if every possible binary code of length `k` (there are `2^k` of them) appears as a substring of `s`.

### Example

```
Input: s = "00110110", k = 2
Output: true
```

## Approach

Use a sliding window of length `k` maintained as a rolling integer: shifting left and OR-ing in the next bit, masked to `k` bits, updates the window in `O(1)`. Each resulting integer directly represents (and indexes) one of the `2^k` possible codes, so track which codes have been seen in a boolean array of size `2^k`. If all `2^k` codes are eventually seen, return `true`.

## C# Solution

```csharp
public class Solution
{
    public bool HasAllCodes(string s, int k)
    {
        int need = 1 << k;
        if (s.Length - k + 1 < need) return false;

        var seen = new bool[need];
        int mask = need - 1;
        int hash = 0, count = 0;

        for (int i = 0; i < s.Length; i++)
        {
            hash = ((hash << 1) | (s[i] - '0')) & mask;

            if (i >= k - 1 && !seen[hash])
            {
                seen[hash] = true;
                count++;
            }
        }

        return count == need;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the length of `s`.
- **Space:** `O(2^k)` for the `seen` array.
