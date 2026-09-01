# 334. Increasing Triplet Subsequence

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Given an integer array `nums`, return `true` if there exist three indices `i < j < k` such that `nums[i] < nums[j] < nums[k]`. Otherwise, return `false`.

### Example

```
Input: nums = [1,2,3,4,5]
Output: true
```

### Constraints

- `1 <= nums.length <= 5 * 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

Greedily track the smallest value seen (`first`) and the smallest value seen that is larger than some earlier value (`second`, forming a valid increasing pair). Any subsequent number strictly greater than `second` completes an increasing triplet.

## C# Solution

```csharp
public class Solution
{
    public bool IncreasingTriplet(int[] nums)
    {
        int first = int.MaxValue, second = int.MaxValue;

        foreach (var num in nums)
        {
            if (num <= first) first = num;
            else if (num <= second) second = num;
            else return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass.
- **Space:** `O(1)`.
