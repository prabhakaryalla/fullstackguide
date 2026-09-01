# 1122. Relative Sort Array

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting, Counting Sort

## Problem

Given two arrays `arr1` and `arr2`, where every element of `arr2` is distinct and also present in `arr1`, sort the elements of `arr1` so that they appear in the same relative order as in `arr2`. Elements not present in `arr2` should appear at the end of `arr1`, sorted in ascending order.

### Example

```
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]
```

## Approach

Since values are bounded (`0` to `1000`), count the occurrences of every value in `arr1` using a counting array. First output the values in the order given by `arr2`, consuming their counts, then sweep the counting array from smallest to largest value and append any remaining occurrences.

## C# Solution

```csharp
public class Solution
{
    public int[] RelativeSortArray(int[] arr1, int[] arr2)
    {
        int[] count = new int[1001];
        foreach (int n in arr1) count[n]++;

        var result = new List<int>();
        foreach (int n in arr2)
        {
            while (count[n] > 0)
            {
                result.Add(n);
                count[n]--;
            }
        }

        for (int v = 0; v <= 1000; v++)
        {
            while (count[v] > 0)
            {
                result.Add(v);
                count[v]--;
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n + arr2.Length + 1000)`.
- **Space:** `O(1000)` for the counting array.
