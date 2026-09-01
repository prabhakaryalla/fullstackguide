# 3307. Find the K-th Character in String Game II

**Difficulty:** Hard
**Category:** String, Bit Manipulation, Simulation, Recursion

## Problem

Alice starts with `word = "a"`. She is given an array `operations`. For the `i`-th operation:
- If `operations[i] == 0`, she appends an exact copy of `word` to itself: `word = word + word`.
- If `operations[i] == 1`, she appends a "shifted" copy of `word` to itself, where every character is advanced to the next character in the alphabet cyclically (`'z'` becomes `'a'`): `word = word + shift(word)`.

Given an integer `k` and the array `operations`, return the k-th character (1-indexed) of `word` once its length reaches at least `k`. `k` can be very large, so the string must never be built explicitly.

### Example

Input: `k = 5, operations = [0,0,0]`

Word grows as `"a"` → `"aa"` → `"aaaa"` → `"aaaaaaaa"`, length 8 ≥ 5. The 5th character is `'a'`.

## Approach

The length of `word` doubles with every operation, so we first determine the smallest number of operations `idx` needed for the length to reach at least `k` (this is at most ~50 for realistic `k`).

To find the k-th character without building the string, work backwards from position `k` (1-indexed) through the operations in reverse:
- Let `half` be the length of `word` right before the current operation.
- If `pos <= half`, the target character lies in the first (unshifted) copy, so recurse into the state before this operation with the same `pos`.
- Otherwise the target lies in the second copy: subtract `half` from `pos`, and if the operation was a shift (`operations[i] == 1`), record one extra shift to be applied.

After unwinding all operations back to the base string `"a"` (position 1), the answer is `'a'` advanced by the total number of shifts encountered (mod 26).

## C# Solution

```csharp
public class Solution 
{
    public char KthCharacter(long k, int[] operations) 
    {
        var lengths = new System.Collections.Generic.List<long> { 1L };
        int idx = 0;
        while (lengths[lengths.Count - 1] < k)
        {
            lengths.Add(lengths[lengths.Count - 1] * 2);
            idx++;
        }

        int shifts = 0;
        long pos = k;
        for (int i = idx; i >= 1; i--)
        {
            long half = lengths[i - 1];
            if (pos > half)
            {
                pos -= half;
                if (operations[i - 1] == 1) shifts++;
            }
        }

        return (char)('a' + (shifts % 26));
    }
}
```

## Complexity

- **Time:** O(log k) — the number of doublings needed to reach length k.
- **Space:** O(log k) for the lengths list.
