# 2202. Maximize the Topmost Element After K Moves

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given a 0-indexed integer array `nums` representing a pile, where `nums[0]` is the topmost element.

In one move, you can perform either:
- Remove the topmost element from the pile
- If the pile is empty, push any number onto the pile

You are also given an integer `k`, which denotes the number of moves to be made.

Return the maximum value of the topmost element after exactly `k` moves. If there is no element in the pile after `k` moves, return -1.

### Example

```
Input: nums = [5,2,2,4,0,6], k = 4
Output: 5
Explanation:
One optimal sequence:
- Remove 5 (pile: [2,2,4,0,6])
- Remove 2 (pile: [2,4,0,6])
- Remove 2 (pile: [4,0,6])
- Push 5 back (pile: [5,4,0,6])
```

## Approach

Consider different scenarios:
1. If k = 0: return nums[0]
2. If k = 1: return nums[1] if exists, else -1
3. If k >= n: we can remove all and push back the maximum
4. If k < n: we can either take nums[k] (after k removals), or remove k-1 elements and push back the maximum from first k-1 elements

The answer is the maximum among valid options.

## C# Solution

```csharp
public class Solution
{
    public int MaximumTop(int[] nums, int k)
    {
        int n = nums.Length;
        
        // Edge case: if array has only 1 element and k is odd, we can't have a top element
        if (n == 1)
        {
            return k % 2 == 0 ? nums[0] : -1;
        }
        
        // If k = 0, return top element
        if (k == 0)
        {
            return nums[0];
        }
        
        // If k = 1, return second element
        if (k == 1)
        {
            return n > 1 ? nums[1] : -1;
        }
        
        int result = -1;
        
        // Option 1: Remove k elements and element at position k becomes top
        if (k < n)
        {
            result = Math.Max(result, nums[k]);
        }
        
        // Option 2: Remove k-1 elements and push back the maximum from first k-1
        int limit = Math.Min(k - 1, n);
        for (int i = 0; i < limit; i++)
        {
            result = Math.Max(result, nums[i]);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(min(k, n))
- **Space:** O(1)
