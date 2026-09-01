# 2875. Minimum Size Subarray in Infinite Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window, Prefix Sum

## Problem

You are given a 0-indexed array `nums` and an integer `target`. Consider an infinite array `infiniteNums` that is formed by repeating `nums` infinitely: `[nums[0], nums[1], ..., nums[n-1], nums[0], nums[1], ...]`.

Return the length of the shortest subarray in `infiniteNums` whose sum equals `target`. If no such subarray exists, return -1.

### Example

```
Input: nums = [1,2,3], target = 5
Output: 2
Explanation:
In the infinite array [1,2,3,1,2,3,1,2,3,...], the subarray [2,3] has sum 5.
This is the shortest such subarray.
```

## Approach

Calculate the total sum of `nums`. If `target` is a multiple of the sum, we might need entire repetitions. Use modulo arithmetic to handle full cycles.

Find the minimum subarray in at most two copies of `nums` that sums to `target % totalSum`, then add the length of full cycles. Use a sliding window or prefix sum with hash map to find the shortest subarray efficiently.

## C# Solution

```csharp
public class Solution
{
    public int MinSizeSubarray(int[] nums, int target)
    {
        int n = nums.Length;
        long totalSum = nums.Sum(x => (long)x);
        
        long fullCycles = target / totalSum;
        long remainder = target % totalSum;
        
        if (remainder == 0)
            return (int)(fullCycles * n);
        
        int[] doubled = new int[2 * n];
        for (int i = 0; i < 2 * n; i++)
            doubled[i] = nums[i % n];
        
        int minLen = int.MaxValue;
        long currentSum = 0;
        int left = 0;
        
        for (int right = 0; right < 2 * n; right++)
        {
            currentSum += doubled[right];
            
            while (currentSum > remainder && left <= right)
            {
                currentSum -= doubled[left];
                left++;
            }
            
            if (currentSum == remainder)
                minLen = Math.Min(minLen, right - left + 1);
        }
        
        return minLen == int.MaxValue ? -1 : minLen + (int)(fullCycles * n);
    }
}
```

## Complexity

- **Time:** `O(n)` — sliding window over doubled array.
- **Space:** `O(n)` for the doubled array.
