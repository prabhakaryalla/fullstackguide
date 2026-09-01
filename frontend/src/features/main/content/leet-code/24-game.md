# 679. 24 Game

**Difficulty:** Hard
**Category:** Array, Math, Backtracking

## Problem

Given an array of 4 integer cards, determine whether they can be combined using `+`, `-`, `*`, `/`, and parentheses (using each card exactly once) to make the value `24`.

### Example

```
Input: cards = [4,1,8,7]
Output: true
Explanation: (8-4) * (7-1) = 24
```

### Constraints

- `cards.length == 4`
- `1 <= cards[i] <= 9`

## Approach

Use backtracking: repeatedly pick any two remaining numbers, combine them with every possible operation (addition, subtraction in both orders conceptually via the pair chosen, multiplication, and division when the divisor is nonzero), and replace those two numbers with the result, recursing on the smaller set. When only one number remains, check whether it's close enough to `24` (using a small epsilon to account for floating-point division).

## C# Solution

```csharp
public class Solution
{
    private const double Epsilon = 1e-6;

    public bool JudgePoint24(int[] cards)
    {
        var nums = cards.Select(c => (double)c).ToList();
        return Solve(nums);
    }

    private bool Solve(List<double> nums)
    {
        if (nums.Count == 1)
            return Math.Abs(nums[0] - 24) < Epsilon;

        for (int i = 0; i < nums.Count; i++)
        {
            for (int j = 0; j < nums.Count; j++)
            {
                if (i == j) continue;

                var remaining = new List<double>();
                for (int k = 0; k < nums.Count; k++)
                    if (k != i && k != j)
                        remaining.Add(nums[k]);

                var candidates = new List<double> { nums[i] + nums[j], nums[i] - nums[j], nums[i] * nums[j] };
                if (Math.Abs(nums[j]) > Epsilon)
                    candidates.Add(nums[i] / nums[j]);

                foreach (var candidate in candidates)
                {
                    remaining.Add(candidate);
                    if (Solve(remaining)) return true;
                    remaining.RemoveAt(remaining.Count - 1);
                }
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by the fixed set of 4 cards and operations.
- **Space:** `O(1)` for the recursion stack.
