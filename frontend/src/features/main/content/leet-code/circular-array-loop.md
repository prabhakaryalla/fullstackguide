# 457. Circular Array Loop

**Difficulty:** Medium
**Category:** Array, Two Pointers

## Problem

Given a circular array `nums` of non-zero integers, where `nums[i]` indicates the number of steps to move forward (positive) or backward (negative) from index `i`, determine whether there is a cycle of length greater than 1 that moves in a single consistent direction (all forward or all backward).

### Example

```
Input: nums = [2,-1,1,2,2]
Output: true
```

### Constraints

- `1 <= nums.length <= 5000`
- `-1000 <= nums[i] <= 1000`
- `nums[i] != 0`

## Approach

For each unvisited starting index, use Floyd's slow/fast pointer cycle detection, restricted to moves that stay in the same direction (all positive or all negative) as the starting index. If the slow and fast pointers meet at a point other than a single-element self-loop, a valid cycle exists. After processing a starting index, mark every index visited along its direction-consistent path as `0` so it is skipped in future iterations, avoiding redundant work.

## C# Solution

```csharp
public class Solution
{
    public bool CircularArrayLoop(int[] nums)
    {
        int n = nums.Length;

        for (int i = 0; i < n; i++)
        {
            if (nums[i] == 0) continue;

            bool forward = nums[i] > 0;
            int slow = i, fast = i;

            while (true)
            {
                slow = Next(nums, slow, forward);
                if (slow == -1) break;

                fast = Next(nums, fast, forward);
                if (fast == -1) break;

                fast = Next(nums, fast, forward);
                if (fast == -1) break;

                if (slow == fast) break;
            }

            if (slow != -1 && slow == fast)
                return true;

            int j = i;
            while (nums[j] != 0 && (nums[j] > 0) == forward)
            {
                int next = Next(nums, j, forward);
                nums[j] = 0;
                if (next == -1) break;
                j = next;
            }
        }

        return false;
    }

    private int Next(int[] nums, int index, bool forward)
    {
        bool isForward = nums[index] > 0;
        if (isForward != forward) return -1;

        int n = nums.Length;
        int next = ((index + nums[index]) % n + n) % n;

        return next == index ? -1 : next;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is visited a constant number of times overall.
- **Space:** `O(1)` extra.
