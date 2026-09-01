# 3221. Maximum Array Hopping Score II

**Difficulty:** Medium
**Category:** Array, Greedy, Monotonic Stack, Stack

## Problem
This is a variant of "Maximum Array Hopping Score I" with the identical rules: starting at index 0, repeatedly jump forward to any later index `j`, earning `(j - i) * nums[j]` for each jump, until reaching the last index. Return the maximum total score achievable.

## Approach
The same greedy reformulation from the earlier version applies directly and remains optimal: scanning from right to left, maintain a running maximum of values seen in the suffix so far, and add this running maximum to the answer at every position except the very last one. This effectively captures the total achievable score across the optimal sequence of "always jump to the suffix maximum" moves.

## C# Solution
```csharp
public class Solution {
    public long MaxScore(int[] nums) {
        long ans = 0;
        int mx = 0;

        for (int i = nums.Length - 1; i > 0; i--) {
            mx = Math.Max(mx, nums[i]);
            ans += mx;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
