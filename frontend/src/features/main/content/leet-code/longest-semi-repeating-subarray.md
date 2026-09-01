# 3641. Longest Semi-Repeating Subarray

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums` and an integer `k`. A subarray is called semi-repeating if the number of distinct values that appear more than once within it is at most `k`.

Return the length of the longest semi-repeating subarray of `nums`.

### Example
Input: `nums = [1,1,2,2,3], k = 1`
Output: `4`
Explanation: The subarray `[1,2,2,3]` (indices 1 to 4) has only the value 2 repeated, satisfying `k = 1`, and has length 4. The full array would require both 1 and 2 to be allowed to repeat (2 distinct repeated values), which exceeds `k = 1`.

Constraints:
- `1 <= nums.length <= 10^5`
- `1 <= k <= nums.length`

## Approach
Use a sliding window with a frequency map. As the right boundary expands, increment the count of the newly included value; whenever a value's count first reaches 2, increment a `repeat` counter (tracking how many distinct values currently repeat within the window). Whenever `repeat` exceeds `k`, shrink the window from the left, decrementing counts and `repeat` accordingly, until the window is valid again. Track the maximum window length seen.

## C# Solution

```csharp
public class Solution {
    public int LongestSubarray(int[] nums, int k) {
        var cnt = new Dictionary<int, int>();
        int left = 0, repeat = 0, result = 0;

        for (int right = 0; right < nums.Length; right++) {
            int v = nums[right];
            cnt[v] = cnt.GetValueOrDefault(v) + 1;
            if (cnt[v] == 2) repeat++;

            while (repeat > k) {
                int lv = nums[left];
                cnt[lv]--;
                if (cnt[lv] == 1) repeat--;
                if (cnt[lv] == 0) cnt.Remove(lv);
                left++;
            }

            result = Math.Max(result, right - left + 1);
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of nums.
- **Space:** O(n)
