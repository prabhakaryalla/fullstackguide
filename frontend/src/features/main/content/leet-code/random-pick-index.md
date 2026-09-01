# 398. Random Pick Index

**Difficulty:** Medium
**Category:** Hash Table, Math, Reservoir Sampling, Randomization

## Problem

Given an integer array `nums` with possibly duplicate elements, implement the `Solution` class with a `Pick(target)` method that returns a random index of an occurrence of `target`, where each valid index has equal probability of being chosen.

### Example

```
Input:
["Solution", "pick", "pick", "pick"]
[[[1, 2, 3, 3, 3]], [3], [1], [3]]
Output:
[null, 2, 0, 4] (indices for 3 may vary)
```

### Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `target` is an integer from `nums`.
- At most `10^4` calls will be made to `Pick`.

## Approach

Use reservoir sampling over the matching indices: scan the array, and for the `i`th match found so far, replace the currently held result index with the current index with probability `1/i`. This yields a uniform choice among all matching indices in a single pass, without needing to store them all.

## C# Solution

```csharp
public class Solution
{
    private readonly int[] nums;
    private readonly Random random = new();

    public Solution(int[] nums)
    {
        this.nums = nums;
    }

    public int Pick(int target)
    {
        int result = -1;
        int count = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            if (nums[i] != target) continue;

            count++;
            if (random.Next(count) == 0)
                result = i;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` per `Pick` call.
- **Space:** `O(1)` extra.
