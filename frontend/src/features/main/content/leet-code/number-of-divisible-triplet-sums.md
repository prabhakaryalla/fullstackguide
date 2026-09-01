# 2964. Number of Divisible Triplet Sums

**Difficulty:** Medium
**Note:** This is a LeetCode premium (subscriber-only) problem.
**Category:** Array, Hash Table

## Problem

Given an array `nums` and an integer `d`, count the number of triplets `(i, j, k)` with `i < j < k` such that `(nums[i] + nums[j] + nums[k]) % d == 0`.

### Example

Input: `nums = [3,3,4,7,8], d = 5`
Output: `3`

## Approach

Fix `j` as the middle index and iterate `k > j`. Maintain a running hash map of remainder counts, `count[r]` = the number of indices `i < j` with `nums[i] % d == r`, updated incrementally as `j` increases (an index is only added to the map once all pairs `(j, k)` where it could serve as `i` have been considered for the current `j`). For each pair `(j, k)`, the required remainder for `nums[i]` is `(d - (nums[j] + nums[k]) % d) % d`; add `count[requiredRemainder]` to the answer.

## C# Solution

```csharp
public class Solution 
{
    public long DivisibleTripletCount(int[] nums, int d) 
    {
        int n = nums.Length;
        long ans = 0;
        Dictionary<int, int> remCount = new Dictionary<int, int>();
        
        for (int j = 0; j < n; j++) 
        {
            for (int k = j + 1; k < n; k++) 
            {
                int need = (((-(nums[j] + nums[k])) % d) + d) % d;
                if (remCount.TryGetValue(need, out int c)) 
                {
                    ans += c;
                }
            }
            
            int r = ((nums[j] % d) + d) % d;
            remCount[r] = remCount.TryGetValue(r, out int existing) ? existing + 1 : 1;
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(d)
