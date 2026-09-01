# 453. Minimum Moves to Equal Array Elements

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given an integer array `nums` of size `n`, return the minimum number of moves required to make all array elements equal, where in one move you can increment `n - 1` elements of the array by `1`.

### Example

```
Input: nums = [1,2,3]
Output: 3
```

### Constraints

- `n == nums.length`
- `1 <= n <= 10^5`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

Incrementing all but one element by `1` is equivalent to decrementing that one element by `1` relative to the rest. So the minimum number of moves equals the sum of differences between every element and the smallest element, since each move effectively lowers the gap between the minimum and every other element by one until they converge.

## C# Solution

```csharp
public class Solution
{
    public int MinMoves(int[] nums)
    {
        int min = nums.Min();
        int moves = 0;

        foreach (var num in nums)
            moves += num - min;

        return moves;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
