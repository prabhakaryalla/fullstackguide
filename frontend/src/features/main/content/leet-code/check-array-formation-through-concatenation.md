# 1640. Check Array Formation Through Concatenation

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an integer array `arr` and a list of integer arrays `pieces` (each a subarray of some permutation of `arr`, with all elements distinct across all pieces), determine whether `arr` can be formed by concatenating the pieces in some order (without reordering elements within any piece).

### Example

```
Input: arr = [49,18,16], pieces = [[16,18,49]]
Output: false
```

## Approach

Index each piece by its first element for O(1) lookup. Walk through `arr`; at each position, the piece starting with the current value must exist and must match `arr` exactly for its full length, advancing the pointer past it. If any lookup fails or a mismatch occurs, formation is impossible.

## C# Solution

```csharp
public class Solution
{
    public bool CanFormArray(int[] arr, int[][] pieces)
    {
        var startIndex = new Dictionary<int, int[]>();

        foreach (var piece in pieces)
        {
            startIndex[piece[0]] = piece;
        }

        int i = 0;

        while (i < arr.Length)
        {
            if (!startIndex.TryGetValue(arr[i], out var piece))
            {
                return false;
            }

            foreach (int value in piece)
            {
                if (i >= arr.Length || arr[i] != value)
                {
                    return false;
                }

                i++;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `arr`.
- **Space:** `O(n)` for the lookup map.
