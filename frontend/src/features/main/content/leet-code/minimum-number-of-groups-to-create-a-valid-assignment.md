# 2910. Minimum Number of Groups to Create a Valid Assignment

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy

## Problem

You are given an array of integers `nums`. You need to partition the array into the minimum number of groups such that each group contains elements with the same value, and the sizes of all groups differ by at most 1. Return the minimum number of groups needed.

### Example

```
Input: nums = [3,2,3,2,3]
Output: 2
Explanation: Group [3,3,3] and [2,2], sizes 3 and 2 differ by 1.
```

## Approach

Count the frequency of each distinct value. The key insight is that if we want all groups to have size `k` or `k+1`, we need to check if we can distribute each value's frequency into groups of size `k` or `k+1`. Try different group sizes starting from the minimum possible based on the minimum frequency, and find the smallest number of groups that satisfies the constraint.

## C# Solution

```csharp
public class Solution 
{
    public int MinGroupsForValidAssignment(int[] nums) 
    {
        var freq = new Dictionary<int, int>();
        foreach (int num in nums) 
        {
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        }
        
        int minFreq = freq.Values.Min();
        
        for (int size = minFreq; size >= 1; size--) 
        {
            int groups = 0;
            bool valid = true;
            
            foreach (int count in freq.Values) 
            {
                int full = count / (size + 1);
                int remainder = count % (size + 1);
                
                if (remainder == 0) 
                {
                    groups += full;
                } 
                else if (full >= size - remainder) 
                {
                    groups += full + 1;
                } 
                else 
                {
                    valid = false;
                    break;
                }
            }
            
            if (valid) return groups;
        }
        
        return freq.Values.Sum();
    }
}
```

## Complexity

- **Time:** O(n + m * k) where m is distinct values, k is max frequency
- **Space:** O(m)
