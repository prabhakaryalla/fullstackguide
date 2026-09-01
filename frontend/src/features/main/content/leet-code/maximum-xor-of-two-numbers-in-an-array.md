# 421. Maximum XOR of Two Numbers in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table, Bit Manipulation, Trie

## Problem

Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`, where `0 <= i, j < nums.length`.

### Example

```
Input: nums = [3,10,5,25,2,8]
Output: 28
```

### Constraints

- `1 <= nums.length <= 2 * 10^5`
- `0 <= nums[i] <= 2^31 - 1`

## Approach

Build the answer bit by bit from the most significant bit down. Maintain a running best-prefix `max`; at each bit position, tentatively set that bit in a candidate prefix and check, using a hash set of all numbers' prefixes truncated to the bits considered so far, whether some pair of prefixes actually achieves that candidate XOR value. If so, keep the bit set; otherwise leave it unset and move to the next bit.

## C# Solution

```csharp
public class Solution
{
    public int FindMaximumXOR(int[] nums)
    {
        int max = 0, mask = 0;

        for (int bit = 31; bit >= 0; bit--)
        {
            mask |= 1 << bit;
            var prefixes = new HashSet<int>();
            foreach (var num in nums)
                prefixes.Add(num & mask);

            int candidate = max | (1 << bit);
            foreach (var prefix in prefixes)
            {
                if (prefixes.Contains(candidate ^ prefix))
                {
                    max = candidate;
                    break;
                }
            }
        }

        return max;
    }
}
```

## Complexity

- **Time:** `O(32n)`.
- **Space:** `O(n)` for the prefix set.
