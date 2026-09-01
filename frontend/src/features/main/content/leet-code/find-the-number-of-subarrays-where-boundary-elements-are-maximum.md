# 3113. Find the Number of Subarrays Where Boundary Elements Are Maximum

**Difficulty:** Medium
**Category:** Array, Stack, Monotonic Stack

## Problem

Given a 0-indexed integer array `nums`, return the number of subarrays where the first and last elements are both equal to the subarray's maximum value.

### Example

```
Input: nums = [1,4,3,3,2]
Output: 6
Explanation: Every single-element subarray trivially qualifies (5 of them), plus [3,3] qualifies since
both ends equal 3, which is also the max of that subarray. Total = 6.
```

## Approach

Maintain a monotonically decreasing stack of `(value, count)` pairs, where `count` tracks how many valid subarrays currently end at an occurrence of `value` as both the maximum and the right boundary. For each new number, pop any stack entries with a smaller value (they can no longer be the maximum once a bigger number appears next to them). If the top of the stack now matches the current value, its `count` carries over (extend the count of subarrays ending here with this max/boundary value) — otherwise push a fresh entry. Every time you land on a matching top entry, increment its count by one (accounting for the new single-element and boundary-matching subarrays it introduces) and add that updated count to the running total.

## C# Solution

```csharp
public class Solution {
    public long NumberOfSubarrays(int[] nums) {
        long ans = 0;
        var stack = new List<(int val, int count)>();

        foreach (int num in nums) {
            while (stack.Count > 0 && stack[^1].val < num)
                stack.RemoveAt(stack.Count - 1);

            if (stack.Count == 0 || stack[^1].val != num)
                stack.Add((num, 0));

            var top = stack[^1];
            top.count++;
            stack[^1] = top;
            ans += top.count;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n) — each element is pushed and popped from the stack at most once.
- Space: O(n) — the monotonic stack.
