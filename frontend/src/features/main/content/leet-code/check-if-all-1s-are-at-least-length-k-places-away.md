# 1437. Check If All 1's Are at Least Length K Places Away

**Difficulty:** Easy
**Category:** Array

## Problem

Given a binary array `nums` and an integer `k`, return `true` if all `1`s in the array are at least `k` places apart.

### Example

```
Input: nums = [1,0,0,1,0,1], k = 2
Output: false
```

## Approach

Scan the array while tracking the index of the last seen `1`. Whenever a new `1` is found, verify that the gap since the previous `1` (number of positions strictly between them) is at least `k`; if not, the condition fails immediately.

## C# Solution

```csharp
public class Solution
{
    public bool KLengthApart(int[] nums, int k)
    {
        int last = -1;

        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] == 1)
            {
                if (last != -1 && i - last - 1 < k) return false;
                last = i;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
