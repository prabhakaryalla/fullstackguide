# 370. Range Addition

**Difficulty:** Medium
**Category:** Array, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer `length` and an array of `updates` where `updates[i] = [start, end, value]` means add `value` to every element from index `start` to `end` inclusive, return the final array after applying all updates.

### Example

```
Input: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
Output: [-2,0,3,5,3]
```

### Constraints

- `1 <= length <= 10^5`
- `0 <= updates.length <= 10^4`
- `0 <= start <= end < length`

## Approach

Use a difference array: instead of updating every element in each range directly (which would be `O(length)` per update), only record the *change in the rate of increase* at the range's boundaries — add `value` at `start` and subtract it at `end + 1`. After processing all updates, a single prefix-sum pass over the difference array reconstructs the final values.

## C# Solution

```csharp
public class Solution
{
    public int[] GetModifiedArray(int length, int[][] updates)
    {
        var delta = new int[length + 1];

        foreach (var update in updates)
        {
            int start = update[0], end = update[1], value = update[2];
            delta[start] += value;
            delta[end + 1] -= value;
        }

        var result = new int[length];
        int runningSum = 0;

        for (int i = 0; i < length; i++)
        {
            runningSum += delta[i];
            result[i] = runningSum;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(length + updates.Length)`.
- **Space:** `O(length)` for the difference array.
