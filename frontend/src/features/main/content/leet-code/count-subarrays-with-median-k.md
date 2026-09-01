# 2488. Count Subarrays With Median K

**Difficulty:** Hard
**Category:** Array, Hash Table, Prefix Sum

## Problem

You are given an array `nums` of size `n` consisting of distinct integers from 1 to `n` and an integer `k`.

Return the number of non-empty subarrays in `nums` that have a median equal to `k`.

The median is the middle element in a sorted array. If the length is even, the median is the left of the two middle elements.

### Example

```
Input: nums = [3,2,1,4,5], k = 4
Output: 3
Explanation: Subarrays with median 4 are: [4], [4,5], [3,2,1,4,5]

Input: nums = [2,3,1], k = 3
Output: 1
```

## Approach

Find the position of k in the array. For a subarray containing k to have median k:
- Count elements less than k (call this balance)
- Count elements greater than k
- For odd length: balance must be 0
- For even length: balance must be 0 or 1

Use a hash map to count prefix balances and match them with suffix balances.

## C# Solution

```csharp
public class Solution
{
    public int CountSubarrays(int[] nums, int k)
    {
        int n = nums.Length;
        int kIndex = -1;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] == k)
            {
                kIndex = i;
                break;
            }
        }
        
        var map = new Dictionary<int, int>();
        map[0] = 1;
        
        int balance = 0;
        for (int i = kIndex - 1; i >= 0; i--)
        {
            balance += nums[i] > k ? 1 : -1;
            if (!map.ContainsKey(balance))
            {
                map[balance] = 0;
            }
            map[balance]++;
        }
        
        int result = map[0] + (map.ContainsKey(-1) ? map[-1] : 0);
        
        balance = 0;
        for (int i = kIndex + 1; i < n; i++)
        {
            balance += nums[i] > k ? 1 : -1;
            
            result += map.ContainsKey(-balance) ? map[-balance] : 0;
            result += map.ContainsKey(-balance + 1) ? map[-balance + 1] : 0;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the array length
- **Space:** O(n) for the hash map
