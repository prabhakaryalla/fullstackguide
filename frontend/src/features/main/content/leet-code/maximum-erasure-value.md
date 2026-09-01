# 1695. Maximum Erasure Value

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

Given an array of positive integers `nums`, choose one contiguous subarray with all distinct elements and delete it, scoring the sum of the deleted elements. Return the maximum achievable score.

### Example

```
Input: nums = [4,2,4,5,6]
Output: 17
```

## Approach

Use a sliding window with a hash set tracking the elements currently in the window. Extend the window to the right; whenever the incoming element is already in the set, shrink from the left (removing elements from both the set and the running sum) until the duplicate is gone. Track the maximum running sum seen.

## C# Solution

```csharp
public class Solution
{
    public int MaximumUniqueSubarray(int[] nums)
    {
        HashSet<int> seen = new HashSet<int>();
        int left = 0;
        int sum = 0;
        int best = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            while (!seen.Add(nums[right]))
            {
                seen.Remove(nums[left]);
                sum -= nums[left];
                left++;
            }

            sum += nums[right];
            best = Math.Max(best, sum);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the hash set.
