# 2425. Bitwise XOR of All Pairings

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Brainteaser

## Problem

You are given two 0-indexed arrays, `nums1` and `nums2`, consisting of non-negative integers. There exists another array, `nums3`, which contains the bitwise XOR of all pairings of integers between `nums1` and `nums2` (every integer in `nums1` is paired with every integer in `nums2` exactly once).

Return the bitwise XOR of all integers in `nums3`.

### Example

```
Input: nums1 = [2,1,3], nums2 = [10,2,5,0]
Output: 13
Explanation: All pairings are:
(2,10), (2,2), (2,5), (2,0), (1,10), (1,2), (1,5), (1,0), (3,10), (3,2), (3,5), (3,0)
XOR of all: 2^10 ^ 2^2 ^ 2^5 ^ 2^0 ^ 1^10 ^ 1^2 ^ 1^5 ^ 1^0 ^ 3^10 ^ 3^2 ^ 3^5 ^ 3^0 = 13
```

## Approach

Key insight: Each element in `nums1` appears `len(nums2)` times in pairings, and vice versa. Since `a XOR a = 0`, if an element appears an even number of times, it contributes 0 to the final XOR.

- If `len(nums2)` is odd, all elements in `nums1` contribute to the result
- If `len(nums1)` is odd, all elements in `nums2` contribute to the result
- XOR all contributing elements

## C# Solution

```csharp
public class Solution
{
    public int XorAllNums(int[] nums1, int[] nums2)
    {
        int result = 0;
        
        // If nums2 has odd length, each num in nums1 appears odd times
        if (nums2.Length % 2 == 1)
        {
            foreach (int num in nums1)
            {
                result ^= num;
            }
        }
        
        // If nums1 has odd length, each num in nums2 appears odd times
        if (nums1.Length % 2 == 1)
        {
            foreach (int num in nums2)
            {
                result ^= num;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n + m) where n and m are the lengths of nums1 and nums2
- **Space:** O(1)
