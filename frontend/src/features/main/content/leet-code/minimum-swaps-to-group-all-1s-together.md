# 1151. Minimum Swaps to Group All 1's Together

**Difficulty:** Medium
**Category:** Array, Sliding Window

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given a binary array `data`, return the minimum number of swaps required to group all the `1`s in the array together, into any contiguous position.

### Example

```
Input: data = [1,0,1,0,1]
Output: 1
```

## Approach

If there are `ones` total `1`s, the final grouped block will occupy a window of exactly `ones` positions somewhere in the array. Slide a fixed-size window of length `ones` across the array, tracking the number of `1`s inside it; the minimum swaps needed equals `ones` minus the maximum count of `1`s found in any such window (since only the `0`s inside the best window need to be swapped out).

## C# Solution

```csharp
public class Solution
{
    public int MinSwaps(int[] data)
    {
        int ones = data.Sum();
        if (ones == 0) return 0;

        int windowOnes = 0;
        for (int i = 0; i < ones; i++) windowOnes += data[i];

        int maxOnes = windowOnes;

        for (int i = ones; i < data.Length; i++)
        {
            windowOnes += data[i] - data[i - ones];
            maxOnes = Math.Max(maxOnes, windowOnes);
        }

        return ones - maxOnes;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
