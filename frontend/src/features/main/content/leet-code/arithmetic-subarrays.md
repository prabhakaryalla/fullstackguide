# 1630. Arithmetic Subarrays

**Difficulty:** Medium
**Category:** Array, Sorting

## Problem

Given `nums` and query ranges `l[i]`/`r[i]`, for each query determine whether the subarray `nums[l[i]..r[i]]`, when sorted, forms an arithmetic sequence (constant difference between consecutive elements).

### Example

```
Input: nums = [4,6,5,9,3,7], l = [0,0,2], r = [2,3,5]
Output: [true,false,true]
```

## Approach

For each query, copy the relevant subarray, sort the copy, and verify that every consecutive pair shares the same difference as the first pair. Since each query is handled independently with a fresh copy, sorting one query never affects another.

## C# Solution

```csharp
public class Solution
{
    public IList<bool> CheckArithmeticSubarrays(int[] nums, int[] l, int[] r)
    {
        List<bool> result = new List<bool>();

        for (int i = 0; i < l.Length; i++)
        {
            int[] segment = new int[r[i] - l[i] + 1];
            Array.Copy(nums, l[i], segment, 0, segment.Length);
            Array.Sort(segment);

            bool isArithmetic = true;

            if (segment.Length >= 2)
            {
                int diff = segment[1] - segment[0];

                for (int j = 2; j < segment.Length; j++)
                {
                    if (segment[j] - segment[j - 1] != diff)
                    {
                        isArithmetic = false;
                        break;
                    }
                }
            }

            result.Add(isArithmetic);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(q * k log k)`, where `k` is the average subarray length.
- **Space:** `O(k)` per query.
