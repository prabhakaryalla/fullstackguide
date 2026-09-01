# 3397. Maximum Number of Distinct Elements After Operations

**Difficulty:** Medium
**Category:** Array, Sorting, Greedy

## Problem

You are given an integer array `nums` and an integer `k`. You are allowed to perform the following operation on each element of the array **at most once**:

- Add an integer in the range `[-k, k]` to the element.

Return the maximum possible number of distinct elements in `nums` after performing the operations.

### Example

`nums = [1,2,2,3,3,4]`, `k = 2`

Sort the array: `[1,2,2,3,3,4]`. Greedily assign the smallest valid distinct value to each element in order:
- `1` → stays `1` (range `[-1,3]`)
- `2` → smallest available greater than `1` is `2` (range `[0,4]`)
- `2` → smallest available greater than `2` is `3` (range `[0,4]`)
- `3` → smallest available greater than `3` is `4` (range `[1,5]`)
- `3` → smallest available greater than `4` is `5` (range `[1,5]`)
- `4` → smallest available greater than `5` is `6`, but range is `[2,6]`, so `6` works.

All 6 elements can be made distinct, so the answer is `6`.

## Approach

Sort the array. Process elements in increasing order while greedily assigning each element the **smallest value strictly greater than the previously assigned value** that still falls within `[num-k, num+k]`. If no such value exists (the candidate exceeds `num+k`), that element cannot contribute a new distinct value and is skipped. Count how many elements are successfully assigned a distinct value.

This greedy works because processing in sorted order and always picking the smallest feasible value leaves the most room for later, larger elements.

## C# Solution

```csharp
public class Solution 
{
    public int MaxDistinctElements(int[] nums, int k) 
    {
        Array.Sort(nums);
        int count = 0;
        long prev = long.MinValue;
        foreach (int num in nums) 
        {
            long candidate = Math.Max(prev + 1, (long)num - k);
            if (candidate <= (long)num + k) 
            {
                count++;
                prev = candidate;
            }
        }
        return count;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1) extra space
