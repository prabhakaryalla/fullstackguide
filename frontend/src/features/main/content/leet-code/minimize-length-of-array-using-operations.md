# 3012. Minimize Length of Array Using Operations

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Number Theory

## Problem

You are given a 0-indexed integer array `nums` containing positive integers. You may repeatedly perform the following operation: choose two distinct indices `i` and `j` where `nums[i] > 0` and `nums[j] > 0`, insert the value `nums[i] % nums[j]` at the end of the array, then remove the elements at indices `i` and `j` (shifting the rest). Return the minimum possible length of `nums` after performing any number of operations.

### Example

```
Input: nums = [1,4,3,1]
Output: 1
Explanation: 4 % 3 = 1 -> [3,1,1,1]; then repeatedly reduce down to a single 1.
```

## Approach

Let `minNum` be the minimum value currently in `nums`.

- If some element is **not** divisible by `minNum`, taking that element mod `minNum` produces a smaller positive remainder, and repeating this process can eventually reduce the whole array down to a single element. So the answer is `1`.
- If **every** element is divisible by `minNum`, then no operation can ever produce a value smaller than `minNum` other than `0` (when two copies of `minNum` are combined), and `0`s can't be combined further (they'd need a positive partner, but combining a `0` with `minNum` just reproduces `0 % minNum = 0`, not reducing the count of surviving non-removable elements below what's needed). Pairing up all `count(minNum)` occurrences of the minimum leaves `ceil(count / 2)` elements that can't be reduced further.

## C# Solution

```csharp
public class Solution {
    public int MinimumArrayLength(int[] nums) {
        int minNum = nums.Min();
        if (nums.Any(num => num % minNum > 0))
            return 1;
        int minCount = nums.Count(num => num == minNum);
        return (minCount + 1) / 2;
    }
}
```

## Complexity

- Time: O(n) — a few linear scans over the array.
- Space: O(1).
