# 2570. Merge Two 2D Arrays by Summing Values

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers

## Problem

You are given two 2D integer arrays `nums1` and `nums2`.

- `nums1[i] = [id_i, val_i]` indicates that the number with id `id_i` has value `val_i`.
- `nums2[i] = [id_i, val_i]` indicates that the number with id `id_i` has value `val_i`.

Each array contains unique ids and is sorted in ascending order by id.

Merge the two arrays into one array that is sorted by id in ascending order. For each id that appears in both arrays, sum their values. For ids that appear in only one array, keep the value as is.

### Example

```
Input: nums1 = [[1,2],[2,3],[4,5]], nums2 = [[1,4],[3,2],[4,1]]
Output: [[1,6],[2,3],[3,2],[4,6]]
Explanation:
id 1: 2 + 4 = 6
id 2: 3 (only in nums1)
id 3: 2 (only in nums2)
id 4: 5 + 1 = 6

Input: nums1 = [[2,4],[3,6],[5,5]], nums2 = [[1,3],[4,3]]
Output: [[1,3],[2,4],[3,6],[4,3],[5,5]]
```

## Approach

Use a two-pointer technique since both arrays are sorted by id:

- Compare the current ids from both arrays
- If equal, add their values and include in result, advance both pointers
- If `id1 < id2`, include `nums1[i]` and advance pointer in `nums1`
- If `id1 > id2`, include `nums2[j]` and advance pointer in `nums2`
- After one array is exhausted, append remaining elements from the other

## C# Solution

```csharp
public class Solution
{
    public int[][] MergeArrays(int[][] nums1, int[][] nums2)
    {
        var result = new List<int[]>();
        int i = 0, j = 0;
        
        while (i < nums1.Length && j < nums2.Length)
        {
            if (nums1[i][0] == nums2[j][0])
            {
                result.Add(new int[] { nums1[i][0], nums1[i][1] + nums2[j][1] });
                i++;
                j++;
            }
            else if (nums1[i][0] < nums2[j][0])
            {
                result.Add(nums1[i]);
                i++;
            }
            else
            {
                result.Add(nums2[j]);
                j++;
            }
        }
        
        while (i < nums1.Length)
        {
            result.Add(nums1[i]);
            i++;
        }
        
        while (j < nums2.Length)
        {
            result.Add(nums2[j]);
            j++;
        }
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n + m) where n and m are the lengths of the two arrays
- **Space:** O(n + m) for the result
