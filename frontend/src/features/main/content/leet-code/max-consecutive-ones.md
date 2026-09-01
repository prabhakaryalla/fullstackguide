# 485. Max Consecutive Ones

**Difficulty:** Easy
**Category:** Array

## Problem

Given a binary array `nums`, return the maximum number of consecutive `1`'s in the array.

### Example

```
Input: nums = [1,1,0,1,1,1]
Output: 3
```

### Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Approach

Scan the array while tracking the length of the current run of consecutive `1`s, resetting it to zero whenever a `0` is encountered, and keeping a running maximum of the run length seen so far.

## C# Solution

```csharp
public class Solution
{
    public int FindMaxConsecutiveOnes(int[] nums)
    {
        int maxCount = 0, current = 0;

        foreach (var num in nums)
        {
            if (num == 1)
            {
                current++;
                maxCount = Math.Max(maxCount, current);
            }
            else
            {
                current = 0;
            }
        }

        return maxCount;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
