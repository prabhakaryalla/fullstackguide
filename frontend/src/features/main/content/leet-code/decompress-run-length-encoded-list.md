# 1313. Decompress Run-Length Encoded List

**Difficulty:** Easy
**Category:** Array

## Problem

Given a run-length encoded list `nums` of `[freq, val]` pairs, return the fully decompressed array where `val` is repeated `freq` times for each pair.

### Example

```
Input: nums = [1,2,3,4]
Output: [2,4,4,4]
```

## Approach

Iterate through the array two elements at a time, treating each pair as `(freq, val)`, and append `val` to the result `freq` times.

## C# Solution

```csharp
public class Solution
{
    public int[] DecompressRLElist(int[] nums)
    {
        var result = new List<int>();

        for (int i = 0; i < nums.Length; i += 2)
        {
            int freq = nums[i], val = nums[i + 1];
            for (int k = 0; k < freq; k++) result.Add(val);
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(sum of freq)`.
- **Space:** `O(sum of freq)` for the output array.
