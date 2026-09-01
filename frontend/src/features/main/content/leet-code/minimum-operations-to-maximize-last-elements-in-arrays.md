# 2934. Minimum Operations to Maximize Last Elements in Arrays

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given two arrays `nums1` and `nums2` of the same length. In one operation, you can swap `nums1[i]` with `nums2[i]`. Return the minimum number of operations needed such that the last element of both arrays is the maximum in their respective arrays. If impossible, return -1.

### Example

```
Input: nums1 = [1,2,7], nums2 = [4,5,3]
Output: 1
Explanation: Swap at index 1, resulting in nums1 = [1,5,7] and nums2 = [4,2,3].
```

## Approach

Try two scenarios: (1) don't swap the last elements, (2) swap the last elements. For each scenario, iterate through the arrays and swap elements when necessary to ensure no element before the last exceeds the last element in its array. Count the swaps and return the minimum.

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(int[] nums1, int[] nums2) 
    {
        int n = nums1.Length;
        
        int ops1 = TryWithoutSwappingLast(nums1, nums2);
        int ops2 = TryWithSwappingLast(nums1, nums2);
        
        if (ops1 == -1 && ops2 == -1) return -1;
        if (ops1 == -1) return ops2;
        if (ops2 == -1) return ops1;
        return Math.Min(ops1, ops2);
    }
    
    private int TryWithoutSwappingLast(int[] nums1, int[] nums2) 
    {
        int n = nums1.Length;
        int max1 = nums1[n - 1];
        int max2 = nums2[n - 1];
        int ops = 0;
        
        for (int i = 0; i < n - 1; i++) 
        {
            if (nums1[i] <= max1 && nums2[i] <= max2) continue;
            if (nums2[i] <= max1 && nums1[i] <= max2) 
            {
                ops++;
            } 
            else 
            {
                return -1;
            }
        }
        
        return ops;
    }
    
    private int TryWithSwappingLast(int[] nums1, int[] nums2) 
    {
        int n = nums1.Length;
        int max1 = nums2[n - 1];
        int max2 = nums1[n - 1];
        int ops = 1;
        
        for (int i = 0; i < n - 1; i++) 
        {
            if (nums1[i] <= max1 && nums2[i] <= max2) continue;
            if (nums2[i] <= max1 && nums1[i] <= max2) 
            {
                ops++;
            } 
            else 
            {
                return -1;
            }
        }
        
        return ops;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
