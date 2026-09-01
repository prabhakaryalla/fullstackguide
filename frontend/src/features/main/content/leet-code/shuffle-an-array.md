# 384. Shuffle an Array

**Difficulty:** Medium
**Category:** Array, Math, Randomization

## Problem

Given an integer array `nums`, design an algorithm to randomly shuffle the array, implementing `Reset()` (returns the array to its original configuration) and `Shuffle()` (returns a random shuffling of the array), where every permutation is equally likely.

### Example

```
Input:
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
Output:
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]] (results may vary)
```

### Constraints

- `1 <= nums.length <= 50`
- `-10^6 <= nums[i] <= 10^6`
- All the values of `nums` are unique.
- At most `10^4` calls total will be made to `Reset` and `Shuffle`.

## Approach

Keep the original array unchanged for `Reset`. For `Shuffle`, apply the Fisher-Yates shuffle on a copy: iterate from the last index to the first, swapping each element with a uniformly random element at or before its current position, which produces every permutation with equal probability.

## C# Solution

```csharp
public class Solution
{
    private readonly int[] original;
    private readonly Random random = new();

    public Solution(int[] nums)
    {
        original = nums;
    }

    public int[] Reset()
    {
        return (int[])original.Clone();
    }

    public int[] Shuffle()
    {
        var shuffled = (int[])original.Clone();
        for (int i = shuffled.Length - 1; i > 0; i--)
        {
            int j = random.Next(i + 1);
            (shuffled[i], shuffled[j]) = (shuffled[j], shuffled[i]);
        }

        return shuffled;
    }
}
```

## Complexity

- **Time:** `O(n)` per `Shuffle` or `Reset` call.
- **Space:** `O(n)` for the shuffled copy.
