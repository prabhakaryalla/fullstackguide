# 982. Triples with Bitwise AND Equal To Zero

**Difficulty:** Hard
**Category:** Array, Hash Table, Bit Manipulation

## Problem

Given an integer array `nums`, return the number of triples of indices `(i, j, k)` (indices can repeat) such that `nums[i] & nums[j] & nums[k] == 0`.

### Example

```
Input: nums = [2,1,3]
Output: 12
```

## Approach

First compute every pairwise AND of the array with itself and count how many pairs produce each resulting bitmask. Then, for every element `c` in the array and every recorded pairwise-AND mask, if `mask & c == 0`, add that mask's pair count to the total (since choosing `i, j` with `nums[i] & nums[j] == mask` and any `k == c` completes a valid triple).

## C# Solution

```csharp
public class Solution
{
    public int CountTriplets(int[] nums)
    {
        var pairAndCount = new Dictionary<int, int>();

        foreach (var a in nums)
        {
            foreach (var b in nums)
            {
                pairAndCount[a & b] = pairAndCount.GetValueOrDefault(a & b) + 1;
            }
        }

        int total = 0;

        foreach (var c in nums)
        {
            foreach (var (mask, cnt) in pairAndCount)
            {
                if ((mask & c) == 0) total += cnt;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n^2 + n * distinctMasks)`.
- **Space:** `O(distinctMasks)`.
