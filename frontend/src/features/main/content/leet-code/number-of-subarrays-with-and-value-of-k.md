# 3209. Number of Subarrays With AND Value of K

**Difficulty:** Hard
**Category:** Array, Binary Search, Bit Manipulation, Segment Tree

## Problem
Given an integer array `nums` and an integer `k`, count the number of subarrays whose bitwise AND of all elements equals exactly `k`.

## Approach
Bitwise AND is monotonically non-increasing as more elements are included (each additional element can only clear more bits, never set new ones). Maintain a rolling map from AND value to frequency count, representing all possible AND results for subarrays ending at the current position. For each new number, extend every entry from the previous map by AND-ing with the current number, then add the current number itself as a fresh length-1 subarray. Because AND-ing only ever removes set bits, the number of distinct values in this rolling map stays small (bounded by roughly the bit-length of the numbers plus one). After updating the map for the current position, add the frequency count associated with the target value `k` (if present) to the running answer.

## C# Solution
```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        long ans = 0;
        Dictionary<int, int> prev = new Dictionary<int, int>();

        foreach (int num in nums) {
            Dictionary<int, int> curr = new Dictionary<int, int> { { num, 1 } };
            foreach (var kv in prev) {
                int val = kv.Key & num;
                curr[val] = curr.GetValueOrDefault(val, 0) + kv.Value;
            }
            ans += curr.GetValueOrDefault(k, 0);
            prev = curr;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n log(max(nums)))
- Space: O(log(max(nums)))
