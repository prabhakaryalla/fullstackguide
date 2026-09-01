# 1018. Binary Prefix Divisible By 5

**Difficulty:** Easy
**Category:** Array

## Problem

Given a binary array `nums`, for every index `i`, consider the number formed by the binary prefix `nums[0..i]` read as a binary number. Return a boolean array `answer` where `answer[i]` is `true` if that prefix's value is divisible by `5`.

### Example

```
Input: nums = [0,1,1]
Output: [true,false,false]
```

## Approach

Rather than reconstructing the actual (potentially huge) prefix value, track only its remainder modulo `5`. Appending a new bit to a binary number is equivalent to `value = value * 2 + bit`, so the remainder updates the same way: `remainder = (remainder * 2 + bit) % 5`. Record whether that remainder is `0` at each step.

## C# Solution

```csharp
public class Solution
{
    public IList<bool> PrefixesDivBy5(int[] nums)
    {
        var result = new List<bool>();
        int remainder = 0;

        foreach (var bit in nums)
        {
            remainder = (remainder * 2 + bit) % 5;
            result.Add(remainder == 0);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)` extra beyond the output list.
