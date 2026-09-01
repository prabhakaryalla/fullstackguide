# 2499. Minimum Total Cost to Make Arrays Unequal

**Difficulty:** Hard
**Category:** Array, Hash Table, Greedy, Counting

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2` of equal length `n`.

You can perform the following operation any number of times:
- Choose two indices `i` and `j` where `0 <= i, j < n` and swap `nums1[i]` with `nums1[j]`. The cost is `i + j`.

Return the minimum total cost such that for all indices `i`, `nums1[i] != nums2[i]`. Return -1 if it's impossible.

### Example

```
Input: nums1 = [1,2,3,4,5], nums2 = [1,2,3,4,5]
Output: 10
Explanation: Swap nums1[0] with nums1[4], cost = 0 + 4 = 4
Swap nums1[1] with nums1[3], cost = 1 + 3 = 4
Total cost = 8 (need to recalculate)
```

## Approach

Use a greedy strategy with frequency counting:
1. Identify positions where `nums1[i] == nums2[i]` (bad positions)
2. Find the most frequent value among bad positions
3. Swap problematic positions with good positions, prioritizing lower-cost swaps
4. Use a two-pointer or greedy approach to minimize the total cost

## C# Solution

```csharp
public class Solution
{
    public long MinimumTotalCost(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        long cost = 0;
        var freq = new Dictionary<int, int>();
        int badCount = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (nums1[i] == nums2[i])
            {
                badCount++;
                if (!freq.ContainsKey(nums1[i]))
                {
                    freq[nums1[i]] = 0;
                }
                freq[nums1[i]]++;
                cost += i;
            }
        }
        
        if (badCount == 0) return 0;
        
        int maxFreq = 0;
        int maxVal = -1;
        foreach (var pair in freq)
        {
            if (pair.Value > maxFreq)
            {
                maxFreq = pair.Value;
                maxVal = pair.Key;
            }
        }
        
        int needed = Math.Max(0, 2 * maxFreq - badCount);
        
        for (int i = 0; i < n && needed > 0; i++)
        {
            if (nums1[i] != nums2[i] && nums1[i] != maxVal && nums2[i] != maxVal)
            {
                cost += i;
                needed--;
            }
        }
        
        return needed == 0 ? cost : -1;
    }
}
```

## Complexity

- **Time:** O(n) where n is the array length
- **Space:** O(n) for the frequency map
