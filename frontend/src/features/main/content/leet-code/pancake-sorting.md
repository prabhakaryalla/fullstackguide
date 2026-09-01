# 969. Pancake Sorting

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting, Simulation

## Problem

Given an array `arr`, a *pancake flip* of size `k` reverses the first `k` elements. Return a sequence of flip sizes (at most `10 * arr.Length`) that sorts the array in ascending order.

### Example

```
Input: arr = [3,2,4,1]
Output: [4,2,4,3]
```

## Approach

Repeatedly, for the current unsorted prefix of size `size`, find the index of its maximum element. Flip it to the front (if it isn't already there), then flip the whole prefix of size `size` to send that maximum to its correct final position at the end of the prefix. Shrink `size` by one and repeat.

## C# Solution

```csharp
public class Solution
{
    public IList<int> PancakeSort(int[] arr)
    {
        var result = new List<int>();
        int n = arr.Length;

        for (int size = n; size > 1; size--)
        {
            int maxIdx = 0;
            for (int i = 1; i < size; i++) if (arr[i] > arr[maxIdx]) maxIdx = i;

            if (maxIdx == size - 1) continue;

            if (maxIdx != 0)
            {
                Flip(arr, maxIdx);
                result.Add(maxIdx + 1);
            }

            Flip(arr, size - 1);
            result.Add(size);
        }

        return result;
    }

    private void Flip(int[] arr, int k)
    {
        int i = 0;
        while (i < k)
        {
            (arr[i], arr[k]) = (arr[k], arr[i]);
            i++;
            k--;
        }
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the result list.
