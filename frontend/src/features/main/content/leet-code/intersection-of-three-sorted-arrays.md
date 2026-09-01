# 1213. Intersection of Three Sorted Arrays

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given three integer arrays sorted in strictly increasing order, return an array of the elements that appear in all three, also in strictly increasing order.

### Example

```
Input: arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]
Output: [1,5]
```

## Approach

Since all three arrays are sorted, walk them simultaneously with three pointers. If the current elements at all three pointers match, that value belongs in the result and every pointer advances. Otherwise, advance only the pointer(s) referencing the smallest of the three current values, since a smaller value can never re-appear later in a sorted array.

## C# Solution

```csharp
public class Solution
{
    public IList<int> ArraysIntersection(int[] arr1, int[] arr2, int[] arr3)
    {
        var result = new List<int>();
        int i = 0, j = 0, k = 0;

        while (i < arr1.Length && j < arr2.Length && k < arr3.Length)
        {
            if (arr1[i] == arr2[j] && arr2[j] == arr3[k])
            {
                result.Add(arr1[i]);
                i++; j++; k++;
            }
            else
            {
                int max = Math.Max(arr1[i], Math.Max(arr2[j], arr3[k]));
                if (arr1[i] < max) i++;
                if (arr2[j] < max) j++;
                if (arr3[k] < max) k++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n1 + n2 + n3)` across the three arrays.
- **Space:** `O(1)` extra beyond the output.
