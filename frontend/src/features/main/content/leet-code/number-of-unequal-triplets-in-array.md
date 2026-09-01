# 2475. Number of Unequal Triplets in Array

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

You are given an integer array `nums`. Find the number of triplets `(i, j, k)` where `0 <= i < j < k < nums.length` and `nums[i]`, `nums[j]`, and `nums[k]` are all distinct.

### Example

```
Input: nums = [4,4,2,4,3]
Output: 3
Explanation: The triplets are (0,2,4), (1,2,4), and (2,3,4).
```

## Approach

Use three nested loops to check all possible triplets. For each triplet, verify that all three values are distinct. An optimization is to use a hash map to count frequencies and compute the result mathematically.

## C# Solution

```csharp
public class Solution
{
    public int UnequalTriplets(int[] nums)
    {
        Dictionary<int, int> freq = new Dictionary<int, int>();
        foreach (int num in nums)
        {
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }
        
        int n = nums.Length;
        int result = 0;
        int left = 0;
        
        foreach (var count in freq.Values)
        {
            int right = n - left - count;
            result += left * count * right;
            left += count;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(n) for the frequency map
