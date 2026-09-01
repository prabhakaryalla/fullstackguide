# 287. Find the Duplicate Number

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Bit Manipulation

## Problem

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive, there is exactly one repeated number. Find and return that number without modifying the array and using only `O(1)` extra space.

### Example

```
Input: nums = [1,3,4,2,2]
Output: 2
```

## Approach

Treat the array as a linked list where each index `i` points to index `nums[i]`. Because there's a duplicate, this "list" must contain a cycle, and finding the duplicate reduces to Floyd's cycle detection ("tortoise and hare"): advance a slow pointer one step and a fast pointer two steps until they meet inside the cycle, then reset one pointer to the start and advance both one step at a time — they meet again exactly at the cycle's entrance, which is the duplicate number.

## C# Solution

```csharp
public class Solution
{
    public int FindDuplicate(int[] nums)
    {
        int slow = nums[0];
        int fast = nums[0];

        do
        {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = nums[0];
        while (slow != fast)
        {
            slow = nums[slow];
            fast = nums[fast];
        }

        return slow;
    }
}
```

## Complexity

- **Time:** `O(n)` — Floyd's algorithm runs in linear time.
- **Space:** `O(1)` — only two pointers are used, and the array is unmodified.
