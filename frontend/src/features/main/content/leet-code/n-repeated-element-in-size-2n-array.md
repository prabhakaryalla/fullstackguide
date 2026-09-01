# 961. N-Repeated Element in Size 2N Array

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

Given an array of size `2n` where one element repeats exactly `n` times and every other element appears exactly once, return the repeated element.

### Example

```
Input: nums = [5,1,5,2,5,3,5,4]
Output: 5
```

## Approach

Scan the array while tracking a set of seen values; the first value that's already in the set must be the repeated one, since only one element repeats.

## C# Solution

```csharp
public class Solution
{
    public int RepeatedNTimes(int[] nums)
    {
        var seen = new HashSet<int>();

        foreach (var num in nums)
        {
            if (!seen.Add(num)) return num;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)`.
