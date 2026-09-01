# 942. DI String Match

**Difficulty:** Easy
**Category:** Array, Two Pointers, String, Greedy

## Problem

Given a string `s` of `'I'` (increase) and `'D'` (decrease) characters of length `n`, return a permutation `perm` of `[0, ..., n]` such that for every position `i`, `perm[i] < perm[i+1]` if `s[i] == 'I'` and `perm[i] > perm[i+1]` if `s[i] == 'D'`.

### Example

```
Input: s = "IDID"
Output: [0,4,1,3,2]
```

## Approach

Maintain two pointers, `low` starting at `0` and `high` starting at `n`. For each `'I'`, output the current `low` and increment it (guaranteeing the next value is larger); for each `'D'`, output the current `high` and decrement it (guaranteeing the next value is smaller). The last remaining value (where `low == high`) fills the final slot.

## C# Solution

```csharp
public class Solution
{
    public int[] DiStringMatch(string s)
    {
        int n = s.Length;
        int low = 0, high = n;
        var result = new int[n + 1];

        for (int i = 0; i < n; i++)
        {
            result[i] = s[i] == 'I' ? low++ : high--;
        }

        result[n] = low;
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
