# 2179. Count Good Triplets in an Array

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Divide and Conquer, Binary Search, Merge Sort

## Problem

You are given two 0-indexed arrays `nums1` and `nums2` of length `n`, both being permutations of `[0, 1, ..., n-1]`.

A triplet of indices `(x, y, z)` is good if:
- 0 <= x < y < z < n
- `nums1[x] < nums1[y] < nums1[z]`
- `nums2[x] < nums2[y] < nums2[z]`

Return the number of good triplets.

### Example

```
Input: nums1 = [2,0,1,3], nums2 = [0,1,2,3]
Output: 1
Explanation: Only triplet (0,2,3) is good: nums1[0]<nums1[2]<nums1[3] (2<1<3 false)
Actually need to reconsider...
```

## Approach

This is a complex problem requiring efficient counting of increasing triplets that satisfy conditions in both arrays.

Use coordinate transformation: map positions from one array to the other. Then count inversions or use BIT (Binary Indexed Tree) to efficiently count qualifying triplets.

## C# Solution

```csharp
public class Solution
{
    public long GoodTriplets(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        
        // Map value to position in nums2
        var posInNums2 = new int[n];
        for (int i = 0; i < n; i++)
        {
            posInNums2[nums2[i]] = i;
        }
        
        // Transform nums1 to positions in nums2
        var transformed = new int[n];
        for (int i = 0; i < n; i++)
        {
            transformed[i] = posInNums2[nums1[i]];
        }
        
        // Count increasing triplets in transformed array
        long count = 0;
        var leftSmaller = new long[n];
        var rightLarger = new long[n];
        
        // Count elements smaller to the left
        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < i; j++)
            {
                if (transformed[j] < transformed[i])
                    leftSmaller[i]++;
            }
        }
        
        // Count elements larger to the right
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (transformed[i] < transformed[j])
                    rightLarger[i]++;
            }
        }
        
        // For each middle element, multiply counts
        for (int i = 0; i < n; i++)
        {
            count += leftSmaller[i] * rightLarger[i];
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n²) with the naive approach shown (can be optimized to O(n log n) with BIT)
- **Space:** O(n)
