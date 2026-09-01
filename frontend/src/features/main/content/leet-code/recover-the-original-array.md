# 2122. Recover the Original Array

**Difficulty:** Hard
**Category:** Array, Hash Table, Sorting, Enumeration

## Problem

An array `original` is transformed into `changed` by appending each `original[i]` and `original[i] + k` for some integer k. Given `changed`, recover any valid `original` array or return empty if impossible.

### Example

```
Input: changed = [1,3,4,2,6,8]
Output: [1,3,4]
Explanation: k=1 gives original=[1,3,4] and changed=[1,2,3,4,6,8] (reordered).
```

## Approach

Sort the changed array. Try each possible value of k by checking if pairs (x, x+k) can form all elements. Use a frequency map to greedily match elements, ensuring each original value is paired exactly once.

## C# Solution

```csharp
public class Solution
{
    public int[] RecoverArray(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length / 2;
        
        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] == nums[0]) continue;
            int diff = nums[i] - nums[0];
            if (diff % 2 != 0) continue;
            
            var result = TryRecover(nums, diff / 2);
            if (result.Length > 0)
                return result;
        }
        
        return new int[0];
    }
    
    private int[] TryRecover(int[] nums, int k)
    {
        var freq = new Dictionary<int, int>();
        foreach (int num in nums)
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        
        var result = new List<int>();
        foreach (int num in nums)
        {
            if (freq.GetValueOrDefault(num, 0) == 0) continue;
            if (freq.GetValueOrDefault(num + 2 * k, 0) == 0) return new int[0];
            
            freq[num]--;
            freq[num + 2 * k]--;
            result.Add(num + k);
        }
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n² log n)
- **Space:** O(n)
