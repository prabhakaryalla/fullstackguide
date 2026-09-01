# 163. Missing Ranges

**Difficulty:** Easy
**Category:** Array

## Problem

Given an inclusive range `[lower, upper]` and a sorted, deduplicated array `nums` where every element is within that range, return the shortest sorted list of ranges that describe every number missing from `nums` within `[lower, upper]`. Each gap should be reported as `"a"` (a single missing number) or `"a->b"` (a missing range).

### Example 1

```
Input: nums = [0,1,3,50,75], lower = 0, upper = 99
Output: ["2","4->49","51->74","76->99"]
```

### Example 2

```
Input: nums = [], lower = 1, upper = 1
Output: ["1"]
```

### Constraints

- `-10^9 <= lower <= upper <= 10^9`
- `0 <= nums.length <= 100`
- `nums` is sorted in strictly increasing order.

## Approach

Walk through `nums` while tracking the next expected number (`prev + 1`, starting from `lower`). Whenever the current number in `nums` is greater than expected, everything between the expected value and one less than the current number is a gap. After the last element, also check for a trailing gap up to `upper`.

## C# Solution

```csharp
public class Solution
{
    public IList<string> FindMissingRanges(int[] nums, int lower, int upper)
    {
        var result = new List<string>();
        long expected = lower;

        foreach (int num in nums)
        {
            if (num > expected)
            {
                result.Add(FormatRange(expected, num - 1L));
            }
            expected = (long)num + 1;
        }

        if (expected <= upper)
        {
            result.Add(FormatRange(expected, upper));
        }

        return result;
    }

    private string FormatRange(long start, long end)
    {
        return start == end ? start.ToString() : $"{start}->{end}";
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass over `nums`.
- **Space:** `O(1)` extra, excluding the output.
