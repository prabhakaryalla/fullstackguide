# 2605. Form Smallest Number From Two Digit Arrays

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given two arrays of unique digits `nums1` and `nums2`, return the smallest number that contains at least one digit from each array.

### Example

```
Input: nums1 = [4,1,3], nums2 = [5,7]
Output: 15
Explanation: The smallest number that contains a digit from both arrays is 15.
```

## Approach

Find if there's a common digit in both arrays (use a HashSet for O(1) lookup). If found, return the smallest common digit. Otherwise, form a two-digit number from the smallest digit of each array, ensuring the smaller digit comes first.

## C# Solution

```csharp
public class Solution
{
    public int MinNumber(int[] nums1, int[] nums2)
    {
        var set1 = new HashSet<int>(nums1);
        int minCommon = int.MaxValue;
        
        foreach (int num in nums2)
        {
            if (set1.Contains(num))
                minCommon = Math.Min(minCommon, num);
        }
        
        if (minCommon != int.MaxValue)
            return minCommon;
        
        int min1 = nums1.Min();
        int min2 = nums2.Min();
        
        return Math.Min(min1, min2) * 10 + Math.Max(min1, min2);
    }
}
```

## Complexity

- **Time:** O(n + m) — where n and m are the lengths of the arrays
- **Space:** O(n) — for the HashSet
