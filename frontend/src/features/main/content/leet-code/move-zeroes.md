# 283. Move Zeroes

**Difficulty:** Easy
**Category:** Array, Two Pointers

## Problem

Given an integer array `nums`, move all `0`'s to the end while maintaining the relative order of the non-zero elements, modifying the array in place.

### Example

```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

### Constraints

- `1 <= nums.length <= 10^4`

## Approach

Use two pointers: `writeIndex` tracks where the next non-zero element should be placed. Scan through the array; whenever a non-zero element is found, swap it into position `writeIndex` and advance `writeIndex`. Because everything before `writeIndex` is already non-zero and in order, a swap (rather than an overwrite) correctly shuffles zeros toward the end without extra passes.

## C# Solution

```csharp
public class Solution
{
    public void MoveZeroes(int[] nums)
    {
        int writeIndex = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] != 0)
            {
                (nums[writeIndex], nums[i]) = (nums[i], nums[writeIndex]);
                writeIndex++;
            }
        }
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)` — modified in place.
