# 525. Contiguous Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum

## Problem

Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of `0`s and `1`s.

### Example

```
Input: nums = [0,1,0,0,1,1]
Output: 6
```

### Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Approach

Convert the problem into a prefix-sum balance: treat each `1` as `+1` and each `0` as `-1`. A subarray has equal `0`s and `1`s exactly when its running balance returns to a previously seen value. Track the first index at which each balance value occurred; whenever a balance repeats, the distance since its first occurrence is a valid candidate length.

## C# Solution

```csharp
public class Solution
{
    public int FindMaxLength(int[] nums)
    {
        var firstIndexOfBalance = new Dictionary<int, int> { [0] = -1 };
        int balance = 0, maxLength = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            balance += nums[i] == 1 ? 1 : -1;

            if (firstIndexOfBalance.TryGetValue(balance, out var firstIndex))
                maxLength = Math.Max(maxLength, i - firstIndex);
            else
                firstIndexOfBalance[balance] = i;
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the balance-index map.
