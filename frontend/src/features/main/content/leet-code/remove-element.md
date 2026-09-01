# 27. Remove Element

**Difficulty:** Easy
**Category:** Array, Two Pointers

## Problem

Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Return the number of elements not equal to `val`.

### Example 1

```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
```

### Example 2

```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
```

### Constraints

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

## Approach

Use a slow pointer marking the next position to write a kept value, and a fast pointer scanning every element. Whenever the fast pointer finds a value different from `val`, write it to the slow position and advance the slow pointer.

## C# Solution

```csharp
public class Solution
{
    public int RemoveElement(int[] nums, int val)
    {
        int slow = 0;

        for (int fast = 0; fast < nums.Length; fast++)
        {
            if (nums[fast] != val)
            {
                nums[slow] = nums[fast];
                slow++;
            }
        }

        return slow;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)` — in-place.
