# 1577. Number of Ways Where Square of Number Is Equal to Product of Two Numbers

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Binary Search, Sorting

## Problem

Given two arrays of integers `nums1` and `nums2`, return the total number of triplets formed under either of two patterns: a value from one array squared equals the product of two values (at different indices) from the other array. Count both `(nums1[i]^2 == nums2[j] * nums2[k])` and `(nums2[i]^2 == nums1[j] * nums1[k])` cases.

### Example

```
Input: nums1 = [7,4], nums2 = [5,2,8,9]
Output: 1
```

## Approach

For each element in one array, compute its square (`long` to avoid overflow), then count how many pairs `(j, k)` with `j < k` in the *other* array multiply to that exact value. Use a hash map of value-to-count for the other array, and for every product-target, iterate through pairs efficiently by counting matching values via a nested loop or precomputed frequency map. Apply this symmetric check in both directions (`nums1` squared against `nums2` pairs, and `nums2` squared against `nums1` pairs) and sum the totals.

## C# Solution

```csharp
public class Solution
{
    public int NumTriplets(int[] nums1, int[] nums2)
    {
        return CountTriplets(nums1, nums2) + CountTriplets(nums2, nums1);
    }

    private int CountTriplets(int[] squareSource, int[] pairSource)
    {
        int count = 0;

        foreach (int value in squareSource)
        {
            long target = (long)value * value;
            int n = pairSource.Length;

            for (int j = 0; j < n; j++)
            {
                for (int k = j + 1; k < n; k++)
                {
                    if ((long)pairSource[j] * pairSource[k] == target)
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

- **Time:** `O(n * m^2)` — for each element in one array, check every pair in the other array.
- **Space:** `O(1)` extra space.
