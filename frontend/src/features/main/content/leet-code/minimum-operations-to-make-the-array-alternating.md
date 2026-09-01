# 2170. Minimum Operations to Make the Array Alternating

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Counting

## Problem

You are given a 0-indexed array `nums` consisting of `n` positive integers.

The array is called alternating if:
- `nums[i-2] == nums[i]` for all `i` where `2 <= i < n`
- `nums[i-1] == nums[i+1]` for all `i` where `1 <= i < n-1`

In one operation, you can choose an index and change `nums[i]` to any positive integer.

Return the minimum number of operations required to make the array alternating.

### Example

```
Input: nums = [3,1,3,2,4,3]
Output: 3
Explanation: Make all even indices the same (3) and all odd indices the same (1 or 2).
```

## Approach

An alternating array has all even indices with one value and all odd indices with another value. Find the most frequent value at even indices and the most frequent value at odd indices.

Key consideration: if the most frequent values at even and odd positions are the same, we need to use the second-most frequent for one of them.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(int[] nums)
    {
        if (nums.Length == 1) return 0;
        
        var evenFreq = new Dictionary<int, int>();
        var oddFreq = new Dictionary<int, int>();
        
        for (int i = 0; i < nums.Length; i++)
        {
            if (i % 2 == 0)
            {
                if (!evenFreq.ContainsKey(nums[i]))
                    evenFreq[nums[i]] = 0;
                evenFreq[nums[i]]++;
            }
            else
            {
                if (!oddFreq.ContainsKey(nums[i]))
                    oddFreq[nums[i]] = 0;
                oddFreq[nums[i]]++;
            }
        }
        
        // Get top 2 most frequent for each
        var evenTop = GetTopTwo(evenFreq);
        var oddTop = GetTopTwo(oddFreq);
        
        int evenCount = (nums.Length + 1) / 2;
        int oddCount = nums.Length / 2;
        
        // If most frequent are different
        if (evenTop[0].Key != oddTop[0].Key)
        {
            return (evenCount - evenTop[0].Value) + (oddCount - oddTop[0].Value);
        }
        
        // If most frequent are same, use second best for one
        int option1 = (evenCount - evenTop[0].Value) + (oddCount - oddTop[1].Value);
        int option2 = (evenCount - evenTop[1].Value) + (oddCount - oddTop[0].Value);
        
        return Math.Min(option1, option2);
    }
    
    private List<KeyValuePair<int, int>> GetTopTwo(Dictionary<int, int> freq)
    {
        var sorted = freq.OrderByDescending(x => x.Value).ToList();
        var result = new List<KeyValuePair<int, int>>();
        result.Add(sorted.Count > 0 ? sorted[0] : new KeyValuePair<int, int>(0, 0));
        result.Add(sorted.Count > 1 ? sorted[1] : new KeyValuePair<int, int>(0, 0));
        return result;
    }
}
```

## Complexity

- **Time:** O(n + m log m) where n is array length and m is number of distinct values
- **Space:** O(m) for frequency maps
