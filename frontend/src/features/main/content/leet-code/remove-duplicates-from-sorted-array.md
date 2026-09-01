# 26. Remove Duplicates from Sorted Array

**Difficulty:** Easy
**Category:** Array, Two Pointers

## Problem

Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Return the number of unique elements.

### Example 1

```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
```

```mermaid
graph LR
    A["1"] --- B["1"] --- C["2"]
    style A fill:#4caf50,color:#fff
    style C fill:#4caf50,color:#fff
```

### Example 2

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
```

### Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order.

## Approach

Use a slow pointer marking the last position of a unique element, and a fast pointer scanning ahead. Whenever the fast pointer finds a value different from the one at the slow pointer, advance the slow pointer and copy the new value there.

## C# Solution

```csharp
public class Solution
{
    public int RemoveDuplicates(int[] nums)
    {
        if (nums.Length == 0) return 0;

        int slow = 0;

        for (int fast = 1; fast < nums.Length; fast++)
        {
            if (nums[fast] != nums[slow])
            {
                slow++;
                nums[slow] = nums[fast];
            }
        }

        return slow + 1;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)` — in-place, no extra structures.
