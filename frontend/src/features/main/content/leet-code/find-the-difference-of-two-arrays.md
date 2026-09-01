# 2215. Find the Difference of Two Arrays

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given two 0-indexed integer arrays `nums1` and `nums2`, return a list `answer` of size 2 where:
- `answer[0]` is a list of all distinct integers in `nums1` which are not present in `nums2`
- `answer[1]` is a list of all distinct integers in `nums2` which are not present in `nums1`

Note that the integers in the lists may be returned in any order.

### Example

```
Input: nums1 = [1,2,3], nums2 = [2,4,6]
Output: [[1,3],[4,6]]
Explanation:
For nums1, 1 and 3 are not in nums2.
For nums2, 4 and 6 are not in nums1.
```

## Approach

1. Convert both arrays to sets
2. For answer[0]: find elements in nums1 set but not in nums2 set
3. For answer[1]: find elements in nums2 set but not in nums1 set

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FindDifference(int[] nums1, int[] nums2)
    {
        HashSet<int> set1 = new HashSet<int>(nums1);
        HashSet<int> set2 = new HashSet<int>(nums2);
        
        List<int> onlyIn1 = new List<int>();
        foreach (int num in set1)
        {
            if (!set2.Contains(num))
            {
                onlyIn1.Add(num);
            }
        }
        
        List<int> onlyIn2 = new List<int>();
        foreach (int num in set2)
        {
            if (!set1.Contains(num))
            {
                onlyIn2.Add(num);
            }
        }
        
        return new List<IList<int>> { onlyIn1, onlyIn2 };
    }
}
```

## Complexity

- **Time:** O(n + m), where n and m are the lengths of nums1 and nums2
- **Space:** O(n + m), for the sets
