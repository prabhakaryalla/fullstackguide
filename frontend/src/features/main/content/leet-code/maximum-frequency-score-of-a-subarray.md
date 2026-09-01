# 2524. Maximum Frequency Score of a Subarray

**Difficulty:** Hard
**Category:** Array, Hash Table, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer array `nums` and a positive integer `k`. The frequency score of an array is the sum of the distinct values in the array raised to the power of their frequencies.

Return the maximum frequency score of a subarray of size `k` in `nums`.

### Example

```
Input: nums = [1,1,2,1,2,1], k = 3
Output: 5
Explanation: The subarray [1,1,2] has score = 1^2 + 2^1 = 1 + 2 = 3.
The subarray [1,2,1] has score = 1^2 + 2^1 = 1 + 2 = 3.
The subarray [2,1,2] has score = 2^2 + 1^1 = 4 + 1 = 5 (maximum).
```

## Approach

Use a sliding window of size k. Maintain a frequency map of elements in the current window. For each window, calculate the frequency score by iterating through the map and summing `value^frequency` for each unique value. Track the maximum score seen.

## C# Solution

```csharp
public class Solution
{
    public long MaxFrequencyScore(int[] nums, int k)
    {
        Dictionary<int, int> freq = new Dictionary<int, int>();
        long maxScore = 0;
        
        for (int i = 0; i < k; i++)
        {
            freq[nums[i]] = freq.GetValueOrDefault(nums[i], 0) + 1;
        }
        
        maxScore = CalculateScore(freq);
        
        for (int i = k; i < nums.Length; i++)
        {
            freq[nums[i]] = freq.GetValueOrDefault(nums[i], 0) + 1;
            
            freq[nums[i - k]]--;
            if (freq[nums[i - k]] == 0)
            {
                freq.Remove(nums[i - k]);
            }
            
            maxScore = Math.Max(maxScore, CalculateScore(freq));
        }
        
        return maxScore;
    }
    
    private long CalculateScore(Dictionary<int, int> freq)
    {
        long score = 0;
        foreach (var kvp in freq)
        {
            long val = kvp.Key;
            int count = kvp.Value;
            long power = 1;
            for (int i = 0; i < count; i++)
            {
                power *= val;
            }
            score += power;
        }
        return score;
    }
}
```

## Complexity

- **Time:** O(n × k) where n is the length of nums
- **Space:** O(k) for the frequency map
