# 2540. Minimum Common Value

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers, Binary Search

## Problem

Given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, return the minimum integer common to both arrays. If there is no common integer, return -1.

### Example

```
Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest common element is 2.
```

## Approach

Use two pointers, one for each array. If the values match, return it. If `nums1[i] < nums2[j]`, increment i. Otherwise, increment j. Continue until a common element is found or one array is exhausted.

## C# Solution

```csharp
public class Solution
{
    public int GetCommon(int[] nums1, int[] nums2)
    {
        int i = 0, j = 0;
        
        while (i < nums1.Length && j < nums2.Length)
        {
            if (nums1[i] == nums2[j])
            {
                return nums1[i];
            }
            else if (nums1[i] < nums2[j])
            {
                i++;
            }
            else
            {
                j++;
            }
        }
        
        return -1;
    }
}
```

## Complexity

- **Time:** O(n + m) where n and m are the lengths of the arrays
- **Space:** O(1)
