# 219. Contains Duplicate II

**Difficulty:** Easy
**Category:** Array, Hash Table, Sliding Window

## Problem

Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` such that `nums[i] == nums[j]` and `abs(i - j) <= k`.

### Example

```
nums = [1,2,3,1], k = 3 -> true
nums = [1,0,1,1], k = 1 -> true
nums = [1,2,3,1,2,3], k = 2 -> false
```

## Approach

Maintain a hash set representing a sliding window of the last `k` indices. For each new element, check whether it's already in the window (a match within distance `k`); if the window has grown past size `k`, remove the element that's now sliding out.

## C# Solution

```csharp
public class Solution
{
    public bool ContainsNearbyDuplicate(int[] nums, int k)
    {
        var window = new HashSet<int>();

        for (int i = 0; i < nums.Length; i++)
        {
            if (!window.Add(nums[i])) return true;

            if (window.Count > k)
            {
                window.Remove(nums[i - k]);
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(min(n, k))` — the window holds at most `k` elements.
