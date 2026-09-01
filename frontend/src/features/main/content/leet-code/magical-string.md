# 481. Magical String

**Difficulty:** Medium
**Category:** Array, Two Pointers

## Problem

A magical string `s` consists only of `1`s and `2`s, and the string is also its own run-length-encoding description: reading the counts of consecutive `1`s and `2`s reproduces `s` itself. Given an integer `n`, return the number of `1`'s in the first `n` characters of `s`, where `s` begins `"1221121221221121122..."`.

### Example

```
Input: n = 6
Output: 3
Explanation: The first 6 characters "122112" contain three 1's.
```

### Constraints

- `1 <= n <= 10^5`

## Approach

Build the string incrementally, starting with the known seed `[1, 2, 2]`. Use a pointer into the sequence itself to determine how many copies of the next value to append: the value at that pointer tells the run length, and the next value alternates between `1` and `2` based on the last appended value. Continue until the sequence reaches length `n`, then count how many `1`s appear in the first `n` characters.

## C# Solution

```csharp
public class Solution
{
    public int MagicalString(int n)
    {
        if (n <= 0) return 0;
        if (n <= 3) return 1;

        var sequence = new List<int> { 1, 2, 2 };
        int index = 2;

        while (sequence.Count < n)
        {
            int nextValue = sequence[^1] == 1 ? 2 : 1;
            int count = sequence[index];

            for (int i = 0; i < count && sequence.Count < n; i++)
                sequence.Add(nextValue);

            index++;
        }

        int ones = 0;
        for (int i = 0; i < n; i++)
            if (sequence[i] == 1)
                ones++;

        return ones;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the built sequence.
