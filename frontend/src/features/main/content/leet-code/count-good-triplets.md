# 1534. Count Good Triplets

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array of integers `arr` and three integers `a`, `b`, and `c`, count the number of triplets `(i, j, k)` with `i < j < k` such that `|arr[i] - arr[j]| <= a`, `|arr[j] - arr[k]| <= b`, and `|arr[i] - arr[k]| <= c`.

### Example

```
Input: arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
Output: 4
```

## Approach

Since `arr.Length` is small (at most 100 by the problem's constraints), a straightforward triple-nested loop checking all three conditions for every `(i, j, k)` combination is efficient enough.

## C# Solution

```csharp
public class Solution
{
    public int CountGoodTriplets(int[] arr, int a, int b, int c)
    {
        int n = arr.Length;
        int count = 0;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (Math.Abs(arr[i] - arr[j]) > a)
                {
                    continue;
                }

                for (int k = j + 1; k < n; k++)
                {
                    if (Math.Abs(arr[j] - arr[k]) <= b && Math.Abs(arr[i] - arr[k]) <= c)
                    {
                        count++;
                    }
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^3)` — three nested loops over the array.
- **Space:** `O(1)`.
