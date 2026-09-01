# 2537. Count the Number of Good Subarrays

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums`.

A subarray is good if there are at least `k` pairs of indices `(i, j)` such that `i < j` and `nums[i] == nums[j]`.

### Example

```
Input: nums = [1,1,1,1,1], k = 10
Output: 1
Explanation: The only good subarray is the entire array with 10 pairs: C(5,2) = 10.
```

## Approach

Use a sliding window with a frequency map. For each right pointer expansion, count how many pairs are added (which equals the frequency of the new element before adding it). Track the total pairs in the current window. When pairs >= k, count valid subarrays and shrink from the left.

## C# Solution

```csharp
public class Solution
{
    public long CountGood(int[] nums, int k)
    {
        Dictionary<int, int> freq = new Dictionary<int, int>();
        long count = 0;
        long pairs = 0;
        int left = 0;
        
        for (int right = 0; right < nums.Length; right++)
        {
            int num = nums[right];
            if (freq.ContainsKey(num))
            {
                pairs += freq[num];
                freq[num]++;
            }
            else
            {
                freq[num] = 1;
            }
            
            while (pairs >= k)
            {
                count += nums.Length - right;
                
                int leftNum = nums[left];
                freq[leftNum]--;
                pairs -= freq[leftNum];
                
                if (freq[leftNum] == 0)
                {
                    freq.Remove(leftNum);
                }
                
                left++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(n) for the frequency map
