# 2762. Continuous Subarrays

**Difficulty:** Medium
**Category:** Array, Heap (Priority Queue), Sliding Window, Ordered Map

## Problem

You are given a 0-indexed integer array `nums`. A subarray of `nums` is called continuous if:
- Let `i`, `i + 1`, ..., `j` be the indices in the subarray. Then, for each pair of indices `i <= i1, i2 <= j`, `|nums[i1] - nums[i2]| <= 2`.

Return the total number of continuous subarrays.

### Example

```
Input: nums = [5,4,2,4]
Output: 8
Explanation: Continuous subarrays: [5], [4], [2], [4], [5,4], [4,2], [2,4], [4,2,4]
```

## Approach

Use sliding window with a data structure to track min/max in the window. Expand right while maintaining the constraint; when violated, shrink from left. Count all valid subarrays ending at each position.

## C# Solution

```csharp
public class Solution
{
    public long ContinuousSubarrays(int[] nums)
    {
        int n = nums.Length;
        long count = 0;
        int left = 0;
        var minDeque = new LinkedList<int>();
        var maxDeque = new LinkedList<int>();
        
        for (int right = 0; right < n; right++)
        {
            while (minDeque.Count > 0 && nums[minDeque.Last.Value] >= nums[right])
            {
                minDeque.RemoveLast();
            }
            minDeque.AddLast(right);
            
            while (maxDeque.Count > 0 && nums[maxDeque.Last.Value] <= nums[right])
            {
                maxDeque.RemoveLast();
            }
            maxDeque.AddLast(right);
            
            while (nums[maxDeque.First.Value] - nums[minDeque.First.Value] > 2)
            {
                if (minDeque.First.Value == left) minDeque.RemoveFirst();
                if (maxDeque.First.Value == left) maxDeque.RemoveFirst();
                left++;
            }
            
            count += right - left + 1;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
