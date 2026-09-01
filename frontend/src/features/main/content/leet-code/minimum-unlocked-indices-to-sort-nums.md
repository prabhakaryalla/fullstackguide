# 3431. Minimum Unlocked Indices to Sort Nums

**Difficulty:** Medium
**Category:** Array, Sorting, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums`. Every index starts out **locked**. You may choose any subset of indices to **unlock** (each unlock costs 1). Afterward, you take the multiset of values currently sitting at the unlocked indices, sort it, and place the sorted values back into those same index positions in increasing order of index; locked indices keep their original values untouched. Return the minimum number of indices you must unlock so that the resulting array is sorted in non-decreasing order.

## Approach
The final array is always some permutation of the original values (locked values never move, and unlocked values are simply rearranged among their own slots). If that final array is non-decreasing, it must be *exactly* the fully sorted version of `nums`, since a sorted permutation of a fixed multiset is unique. Therefore, a locked index `i` can only remain locked if `nums[i]` already equals `sortedNums[i]` — otherwise the final array could never match the required sorted sequence at that position.

Conversely, if we lock exactly the set of indices where `nums[i] == sortedNums[i]`, the remaining (unlocked) positions automatically receive the correct remaining values once sorted, because the sorted array restricted to the unlocked positions (in increasing index order) is precisely the sorted version of the remaining multiset.

So the answer is simply `n` minus the number of indices already in their correct sorted position: sort a copy of `nums`, compare it element-by-element with the original, and count matches.

## C# Solution

```csharp
public class Solution 
{
    public int MinUnlockedIndices(int[] nums) 
    {
        int n = nums.Length;
        int[] sortedNums = (int[])nums.Clone();
        Array.Sort(sortedNums);

        int matches = 0;
        for (int i = 0; i < n; i++) 
        {
            if (nums[i] == sortedNums[i]) matches++;
        }

        return n - matches;
    }
}
```

## Complexity

- **Time:** O(n log n), dominated by sorting the copy of the array.
- **Space:** O(n) for the sorted copy.
