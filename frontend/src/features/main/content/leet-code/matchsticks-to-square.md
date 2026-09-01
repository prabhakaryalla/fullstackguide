# 473. Matchsticks to Square

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking, Bitmask

## Problem

Given an integer array `matchsticks` where `matchsticks[i]` is the length of the `i`th matchstick, return `true` if all the matchsticks can be used to form a square, using every matchstick exactly once without breaking any.

### Example

```
Input: matchsticks = [1,1,2,2,2]
Output: true
Explanation: Two squares of side 2 can be formed: [1,1,2] and [2,2].
```

### Constraints

- `1 <= matchsticks.length <= 15`
- `1 <= matchsticks[i] <= 10^8`

## Approach

The total length must be divisible by 4 (giving the target side length); reject immediately otherwise, along with any single matchstick longer than that target. Sort matchsticks in descending order (placing longer, more constrained sticks first prunes the search faster), then backtrack by trying to add each unplaced stick to one of the four sides in turn, succeeding only if all four sides end up equal to the target.

## C# Solution

```csharp
public class Solution
{
    public bool Makesquare(int[] matchsticks)
    {
        int total = matchsticks.Sum();
        if (total % 4 != 0) return false;

        int side = total / 4;
        Array.Sort(matchsticks);
        Array.Reverse(matchsticks);

        if (matchsticks[0] > side) return false;

        var sides = new int[4];
        return Backtrack(matchsticks, 0, sides, side);
    }

    private bool Backtrack(int[] matchsticks, int index, int[] sides, int target)
    {
        if (index == matchsticks.Length)
            return sides[0] == target && sides[1] == target && sides[2] == target;

        for (int i = 0; i < 4; i++)
        {
            if (sides[i] + matchsticks[index] > target) continue;

            sides[i] += matchsticks[index];
            if (Backtrack(matchsticks, index + 1, sides, target))
                return true;

            sides[i] -= matchsticks[index];

            if (sides[i] == 0) break;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(4^n)` in the worst case, though sorting and pruning make it much faster in practice.
- **Space:** `O(n)` for the recursion stack.
