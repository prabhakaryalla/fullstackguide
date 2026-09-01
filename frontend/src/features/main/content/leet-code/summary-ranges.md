# 228. Summary Ranges

**Difficulty:** Easy
**Category:** Array

## Problem

Given a sorted, unique integer array `nums`, return the smallest sorted list of ranges that cover all the numbers exactly, with no missing or repeated numbers. Each range should be reported as `"a"` (single number) or `"a->b"` (a run of consecutive numbers).

### Example

```
nums = [0,1,2,4,5,7] -> ["0->2","4->5","7"]
```

## Approach

Scan through the array tracking the start of the current consecutive run. Whenever the next number isn't exactly one more than the current number, the run has broken — close it off (formatted as a single number or a range) and start a new run from the next number.

## C# Solution

```csharp
public class Solution
{
    public IList<string> SummaryRanges(int[] nums)
    {
        var result = new List<string>();
        int i = 0;

        while (i < nums.Length)
        {
            int start = i;

            while (i + 1 < nums.Length && nums[i + 1] == nums[i] + 1)
            {
                i++;
            }

            result.Add(start == i ? $"{nums[start]}" : $"{nums[start]}->{nums[i]}");
            i++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)` extra, excluding the output.
