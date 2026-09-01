# 1089. Duplicate Zeros

**Difficulty:** Easy
**Category:** Array

## Problem

Given a fixed-length integer array `arr`, duplicate each occurrence of zero, shifting the remaining elements to the right, and dropping elements that would move past the end of the array. Modify `arr` in place.

### Example

```
Input: arr = [1,0,2,3,0,4,5,0]
Output: [1,0,0,2,3,0,0,4]
```

## Approach

First count how many zeros exist, which determines the total rightward shift. Then walk from the end of the array backward with a separate write pointer starting at `n - 1 + zerosCount`: copy each element (only if its target write position is still within bounds), and whenever the copied element is zero, write an extra `0` one position earlier before continuing. Processing from right to left avoids overwriting values that still need to be read.

## C# Solution

```csharp
public class Solution
{
    public void DuplicateZeros(int[] arr)
    {
        int n = arr.Length;
        int zerosCount = 0;

        for (int i = 0; i < n; i++)
        {
            if (arr[i] == 0) zerosCount++;
        }

        int writeIndex = n + zerosCount - 1;
        int readIndex = n - 1;

        while (readIndex >= 0)
        {
            if (writeIndex < n)
            {
                arr[writeIndex] = arr[readIndex];
            }

            if (arr[readIndex] == 0)
            {
                writeIndex--;
                if (writeIndex < n)
                {
                    arr[writeIndex] = 0;
                }
            }

            writeIndex--;
            readIndex--;
        }
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes.
- **Space:** `O(1)` — modifies the array in place.
