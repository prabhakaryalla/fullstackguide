# 3781. Maximum Score After Binary Swaps

**Difficulty:** Medium
**Category:** Array, String, Greedy, Heap (Priority Queue)

## Problem

Given an integer array `nums` and a binary string `s` of the same length, each index `i` with `s[i]='1'` contributes `nums[i]` to the score. You may repeatedly choose an index `i` where `s[i]='0'` and `s[i+1]='1'` and swap them. Return the maximum possible score.

### Example

Input: `nums = [2,1,5,2,3], s = "01010"`
Output: `7`

## Approach

Since a `'1'` can only move leftward past `'0'`s (never crossing another `'1'`), each `'1'` (in left-to-right order) can effectively claim the best value among all positions seen so far. Scan left to right, pushing every `nums[i]` onto a max-heap; whenever `s[i] == '1'`, pop the maximum from the heap and add it to the score.

## C# Solution

```csharp
public class Solution 
{
    public long MaximumScore(int[] nums, string s) 
    {
        var heap = new PriorityQueue<int, int>();
        long score = 0;
        for (int i = 0; i < nums.Length; i++)
        {
            heap.Enqueue(nums[i], -nums[i]);
            if (s[i] == '1')
            {
                score += heap.Dequeue();
            }
        }
        return score;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
