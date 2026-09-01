# 1888. Minimum Number of Flips to Make the Binary String Alternating

**Difficulty:** Medium
**Category:** String, Sliding Window, Greedy

## Problem

Given a binary string `s`, in one operation you may either remove the first character and append it to the end, or flip any character. Return the minimum number of operations needed to make the string alternating.

### Example

```
Input: s = "111000"
Output: 2
```

## Approach

Consider every possible number of rotations `k` (0 to n-1), each costing `k` operations, and for each resulting rotation compute the minimum flips to make it alternating. To do this efficiently, build the doubled string `s + s` and maintain a sliding window of length `n` counting mismatches against the fixed absolute-index pattern "even index expects `'0'`, odd index expects `'1'`" — call this count `mismatchEven0`. Since this pattern and its bitwise complement are the only two possible alternating targets for any window, and every position matches exactly one of the two, the minimum flips for a given window is `min(mismatchEven0, windowSize - mismatchEven0)` regardless of the rotation's parity. Slide the window one step at a time (removing the leftmost, adding the new rightmost character's mismatch contribution) while trying every `k`, and track the overall minimum of `k + flips`.

## C# Solution

```csharp
public class Solution
{
    public int MinFlips(string s)
    {
        int n = s.Length;
        string doubled = s + s;
        int m = doubled.Length;
        int windowSize = n;

        int mismatchEven0 = 0;
        for (int i = 0; i < windowSize; i++)
        {
            char expected = (i % 2 == 0) ? '0' : '1';
            if (doubled[i] != expected) mismatchEven0++;
        }

        int best = int.MaxValue;

        for (int k = 0; k < n; k++)
        {
            int flips = Math.Min(mismatchEven0, windowSize - mismatchEven0);
            best = Math.Min(best, k + flips);

            int rightIndex = k + windowSize;
            if (rightIndex < m)
            {
                char leftChar = doubled[k];
                char leftExpected = (k % 2 == 0) ? '0' : '1';
                if (leftChar != leftExpected) mismatchEven0--;

                char rightChar = doubled[rightIndex];
                char rightExpected = (rightIndex % 2 == 0) ? '0' : '1';
                if (rightChar != rightExpected) mismatchEven0++;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the doubled string.
