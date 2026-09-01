# 3065. Minimum Operations to Exceed Threshold Value I

**Difficulty:** Easy
**Category:** Array

## Problem

Given a 0-indexed integer array `nums` and an integer `k`, an operation removes the smallest element from `nums`. Return the minimum number of operations required until every remaining element in `nums` is greater than or equal to `k`.

### Example

```
Input: nums = [2,11,10,1,3], k = 10
Output: 3
Explanation: Removing 1, 2, and 3 (the elements below 10) leaves [11, 10], all >= 10.
```

## Approach

The elements that must eventually be removed are exactly those strictly less than `k` — order doesn't matter since only the count of "too small" elements determines the number of removals. Count how many elements are `< k`.

## C# Solution

```csharp
public class Solution {
    public int MinOperations(int[] nums, int k) {
        int count = 0;
        foreach (int num in nums)
            if (num < k)
                count++;
        return count;
    }
}
```

## Complexity

- Time: O(n) — a single pass over the array.
- Space: O(1).
