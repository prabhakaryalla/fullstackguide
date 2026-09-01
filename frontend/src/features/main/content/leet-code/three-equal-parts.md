# 927. Three Equal Parts

**Difficulty:** Hard
**Category:** Array, Math

## Problem

Given a binary array `arr`, find indices `i < j` such that splitting into `arr[0..i]`, `arr[i+1..j-1]`, and `arr[j..]` yields three binary numbers of equal value (leading zeros allowed, and equal value `0` is fine too). Return `[i, j]`, or `[-1, -1]` if impossible.

### Example

```
Input: arr = [1,0,1,0,1]
Output: [0,3]
```

## Approach

Total the `1`s; it must be divisible by 3 (the all-zero case is a trivial split). Each of the three parts must contain exactly one third of the ones, so locate the starting index of the 1st, `(total/3 + 1)`th, and `(2*total/3 + 1)`th one — these mark where each part's most-significant `1` begins. Since all parts must end at the array's end (trailing zeros must line up), compare the three fixed-length tails starting at those three indices for equality.

## C# Solution

```csharp
public class Solution
{
    public int[] ThreeEqualParts(int[] arr)
    {
        int n = arr.Length;
        int onesTotal = arr.Sum();

        if (onesTotal == 0) return new[] { 0, n - 1 };
        if (onesTotal % 3 != 0) return new[] { -1, -1 };

        int k = onesTotal / 3;
        var breaks = new int[3];
        int count = 0, partIdx = 0;

        for (int i = 0; i < n && partIdx < 3; i++)
        {
            if (arr[i] == 1)
            {
                if (count % k == 0) breaks[partIdx++] = i;
                count++;
            }
        }

        int tailLen = n - breaks[2];
        int i1 = breaks[0], i2 = breaks[1], i3 = breaks[2];

        for (int offset = 0; offset < tailLen; offset++)
        {
            if (i3 + offset >= n) return new[] { -1, -1 };
            if (arr[i1 + offset] != arr[i3 + offset] || arr[i2 + offset] != arr[i3 + offset])
                return new[] { -1, -1 };
        }

        return new[] { i1 + tailLen - 1, i2 + tailLen };
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
