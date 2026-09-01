# 3761. Minimum Absolute Distance Between Mirror Pairs

**Difficulty:** Medium
**Category:** Array, Hash Table, Math

## Problem

A mirror pair is a pair of indices `(i, j)` with `i < j` such that `reverse(nums[i]) == nums[j]`, where `reverse(x)` reverses the digits of `x` (dropping leading zeros). Return the minimum absolute distance `abs(i - j)` among all mirror pairs, or `-1` if none exist.

### Example

Input: `nums = [12,21,45,33,54]`
Output: `1`

`reverse(12) = 21 = nums[1]`, giving distance `1`; `reverse(45) = 54 = nums[4]`, giving distance `2`. The minimum is `1`.

## Approach

Scan left to right maintaining a hash map from a reversed value to its most recent originating index. At index `i`, if the map contains key `nums[i]`, a mirror pair is found with the stored index; update the best distance. Then store `reverse(nums[i]) -> i` for future matches.

## C# Solution

```csharp
public class Solution 
{
    public int MinAbsoluteDistance(int[] nums) 
    {
        var lastIndexForReverse = new Dictionary<long, int>();
        int best = int.MaxValue;
        for (int i = 0; i < nums.Length; i++)
        {
            if (lastIndexForReverse.TryGetValue(nums[i], out int j))
            {
                best = Math.Min(best, i - j);
            }
            long rev = Reverse(nums[i]);
            lastIndexForReverse[rev] = i;
        }
        return best == int.MaxValue ? -1 : best;
    }

    private long Reverse(long x)
    {
        long result = 0;
        while (x > 0)
        {
            result = result * 10 + x % 10;
            x /= 10;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
