# 995. Minimum Number of K Consecutive Bit Flips

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Queue, Sliding Window, Prefix Sum

## Problem

Given a binary array `nums` and an integer `k`, a *k-bit flip* flips every bit in a contiguous subarray of length `k`. Return the minimum number of k-bit flips needed to make every element `1`, or `-1` if impossible.

### Example

```
Input: nums = [0,1,0], k = 1
Output: 2
```

## Approach

Track the number of flips currently affecting the position being processed using a difference array. At each index, add any flip starting exactly there, then check the effective current value (`original XOR parity of flips so far`); if it's `0`, a new flip must start at this index — apply it if there's room (`index + k <= n`), otherwise it's impossible, and record the flip's end in the difference array so its effect expires after `k` positions.

## C# Solution

```csharp
public class Solution
{
    public int MinKBitFlips(int[] nums, int k)
    {
        int n = nums.Length;
        var diff = new int[n + 1];
        int flips = 0, result = 0;

        for (int i = 0; i < n; i++)
        {
            flips += diff[i];

            if ((nums[i] + flips) % 2 == 0)
            {
                if (i + k > n) return -1;

                flips++;
                diff[i + k]--;
                result++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the difference array.
