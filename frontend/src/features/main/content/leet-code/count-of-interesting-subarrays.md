# 2845. Count of Interesting Subarrays

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

You are given a 0-indexed integer array `nums`, an integer `modulo`, and an integer `k`. An index `i` is counted for a subarray `nums[l..r]` if `nums[i] % modulo == k`. A subarray `nums[l..r]` is "interesting" if the count of such indices within it, taken modulo `modulo`, equals `k`. Return the number of interesting subarrays.

### Example

Input: nums = [3,2,4], modulo = 2, k = 1
Output: 3
Explanation: The subarrays [3], [3,2], and [3,2,4] each have exactly one element (3) satisfying `nums[i] % 2 == 1`, and `1 % 2 == 1 == k`.

## Approach

Maintain a running prefix count `current` of indices satisfying `nums[i] % modulo == k`, reduced modulo `modulo`. For a subarray ending at the current position to be interesting, the prefix count at its start must equal `(current - k) mod modulo`. Track how many times each prefix-count-mod-`modulo` value has occurred so far in a hash map (initialized with `{0: 1}` for the empty prefix), add the count for the required value to the answer at each step, then record the current prefix value in the map.

## C# Solution

```csharp
public class Solution 
{
    public long CountInterestingSubarrays(IList<int> nums, int modulo, int k) 
    {
        var prefixCount = new Dictionary<int, long>();
        prefixCount[0] = 1;

        long answer = 0;
        int current = 0;

        foreach (int num in nums) 
        {
            if (num % modulo == k) current = (current + 1) % modulo;

            int need = ((current - k) % modulo + modulo) % modulo;
            answer += prefixCount.GetValueOrDefault(need, 0L);

            prefixCount[current] = prefixCount.GetValueOrDefault(current, 0L) + 1;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(modulo)
