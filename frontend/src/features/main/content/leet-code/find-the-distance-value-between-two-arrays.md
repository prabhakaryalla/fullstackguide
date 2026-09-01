# 1385. Find the Distance Value Between Two Arrays

**Difficulty:** Easy
**Category:** Array, Two Pointers, Binary Search, Sorting

## Problem

Given two arrays `arr1` and `arr2` and an integer `d`, the distance value is the number of elements of `arr1` for which there is **no** element in `arr2` within distance `d`. Return the distance value.

### Example

```
Input: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
Output: 2
```

## Approach

For each element of `arr1`, scan every element of `arr2` and check whether any falls within `d`; if none do, count that element toward the answer. Since the arrays are small, a direct nested comparison is simple and efficient enough.

## C# Solution

```csharp
public class Solution
{
    public int FindTheDistanceValue(int[] arr1, int[] arr2, int d)
    {
        int count = 0;

        foreach (int a in arr1)
        {
            bool hasClose = false;
            foreach (int b in arr2)
            {
                if (Math.Abs(a - b) <= d)
                {
                    hasClose = true;
                    break;
                }
            }
            if (!hasClose) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n * m)`.
- **Space:** `O(1)`.
