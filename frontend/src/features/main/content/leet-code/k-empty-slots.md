# 683. K Empty Slots

**Difficulty:** Hard
**Category:** Array, Sliding Window, Ordered Set
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `bulbs` where `bulbs[i]` is the position turned on on day `i + 1`, and an integer `k`, return the earliest day on which there exist two turned-on bulbs with exactly `k` bulbs between them that are all still off, or `-1` if it never happens.

### Example

```
Input: bulbs = [1,3,2], k = 1
Output: 2
```

## Approach

Convert `bulbs` into a `days` array where `days[position]` gives the day that position was turned on. Slide a window of width `k + 2` (two "boundary" positions plus the `k` slots between them) across this array using two pointers `left` and `right = left + k + 1`. For a window to be valid, every position strictly between `left` and `right` must turn on *after* both boundary positions; if any inner position turns on earlier, jump the window to start right after that violating position (since it can now serve as a boundary itself) instead of only shifting by one, keeping the scan linear.

## C# Solution

```csharp
public class Solution
{
    public int KEmptySlots(int[] bulbs, int k)
    {
        int n = bulbs.Length;
        var days = new int[n];

        for (int i = 0; i < n; i++)
            days[bulbs[i] - 1] = i + 1;

        int left = 0, right = k + 1;
        int result = int.MaxValue;

        while (right < n)
        {
            bool valid = true;
            for (int i = left + 1; i < right; i++)
            {
                if (days[i] < days[left] || days[i] < days[right])
                {
                    left = i;
                    right = i + k + 1;
                    valid = false;
                    break;
                }
            }

            if (valid)
            {
                result = Math.Min(result, Math.Max(days[left], days[right]));
                left = right;
                right = left + k + 1;
            }
        }

        return result == int.MaxValue ? -1 : result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the days array.
