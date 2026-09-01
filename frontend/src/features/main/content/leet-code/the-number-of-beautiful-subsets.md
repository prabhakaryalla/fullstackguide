# 2597. The Number of Beautiful Subsets

**Difficulty:** Medium
**Category:** Array, Hash Table, Dynamic Programming, Backtracking

## Problem

You are given an array `nums` of positive integers and a positive integer `k`. A subset of `nums` is beautiful if it does not contain two integers with an absolute difference equal to `k`.

Return the number of non-empty beautiful subsets of the array `nums`.

### Example

```
Input: nums = [2,4,6], k = 2
Output: 4
Explanation: 
Beautiful subsets are [2], [4], [6], [4,6]
[2,4] and [2,6] are not beautiful because |2-4|=2 and |2-6|=4 contains 2
```

## Approach

Use backtracking to generate all possible subsets. For each element, we have two choices: include it or skip it. When including an element, check if any already-included element differs from it by exactly `k`. Use a frequency map to track included elements.

## C# Solution

```csharp
public class Solution
{
    private int count = 0;
    
    public int BeautifulSubsets(int[] nums, int k)
    {
        var freq = new Dictionary<int, int>();
        Backtrack(nums, k, 0, freq);
        return count - 1; // Subtract 1 for empty subset
    }
    
    private void Backtrack(int[] nums, int k, int index, Dictionary<int, int> freq)
    {
        if (index == nums.Length)
        {
            count++;
            return;
        }
        
        Backtrack(nums, k, index + 1, freq);
        
        bool canInclude = !freq.ContainsKey(nums[index] - k) && 
                          !freq.ContainsKey(nums[index] + k);
        
        if (canInclude)
        {
            freq[nums[index]] = freq.GetValueOrDefault(nums[index]) + 1;
            Backtrack(nums, k, index + 1, freq);
            
            freq[nums[index]]--;
            if (freq[nums[index]] == 0)
            {
                freq.Remove(nums[index]);
            }
        }
    }
}
```

## Complexity

- **Time:** O(2^n) in worst case
- **Space:** O(n) for recursion depth and frequency map
