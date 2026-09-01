# 3046. Split the Array

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

You are given a 0-indexed integer array `nums` of even length. Determine whether `nums` can be split into two arrays, `nums1` and `nums2`, each containing exactly half of the elements (any elements, in any assignment), such that all elements within `nums1` are distinct and all elements within `nums2` are distinct. Return `true` if such a split is possible, otherwise `false`.

### Example

```
Input: nums = [1,1,2,2,3,4]
Output: true
Explanation: Split into nums1 = [1,2,3] and nums2 = [1,2,4]; both halves have all-distinct elements.
```

## Approach

A split satisfying the condition is possible **if and only if** no value appears more than twice in the whole array — if a value appears at most twice, one copy can go to each half (or, if it appears once, it just goes to either half); if any value appears three or more times, at least two copies would have to land in the same half, violating distinctness there.

## C# Solution

```csharp
public class Solution {
    public bool IsPossibleToSplit(int[] nums) {
        const int kMax = 100;
        int[] count = new int[kMax + 1];
        foreach (int num in nums)
            count[num]++;
        return count.All(freq => freq <= 2);
    }
}
```

## Complexity

- Time: O(n) — one pass to count, one pass over the fixed-size frequency array.
- Space: O(1) — the frequency array has a fixed bounded size.
