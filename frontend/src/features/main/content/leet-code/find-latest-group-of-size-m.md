# 1562. Find Latest Group of Size M

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given a binary string of length `n` (all zeros initially) and a permutation `arr` describing the order in which bits are set to `1` (1-indexed positions), return the last "day" (1-indexed step) on which there exists a group of exactly `m` consecutive `1`'s with no adjacent `1` immediately outside the group. Return `-1` if such a moment never occurs.

### Example

```
Input: arr = [3,5,1,2,4], m = 1
Output: 4
```

## Approach

Maintain two arrays, `leftLength` and `rightLength`, indexed by position, where `leftLength[i]`/`rightLength[i]` store the length of the contiguous group of ones ending/starting there (using boundary endpoints only). When setting position `pos` to `1`, look at its already-set neighbors to determine the new merged group's length and boundaries; update the boundary length markers accordingly. Before merging, if either neighboring group had exactly length `m`, decrement a running counter of "groups of size `m`"; after merging, if the new combined group has length `m`, increment that counter. Whenever the counter is positive after processing a day, record that day as the latest candidate answer.

## C# Solution

```csharp
public class Solution
{
    public int FindLatestStep(int[] arr, int m)
    {
        int n = arr.Length;
        if (m == n)
        {
            return n;
        }

        int[] length = new int[n + 2];
        int countOfM = 0;
        int answer = -1;

        for (int day = 0; day < n; day++)
        {
            int pos = arr[day];
            int left = length[pos - 1];
            int right = length[pos + 1];
            int newLength = left + right + 1;

            if (left == m || right == m)
            {
                countOfM--;
            }

            if (newLength == m)
            {
                countOfM++;
            }

            length[pos - left] = newLength;
            length[pos + right] = newLength;

            if (countOfM > 0)
            {
                answer = day + 1;
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)` — each of the `n` days does constant work.
- **Space:** `O(n)` for the boundary-length array.
