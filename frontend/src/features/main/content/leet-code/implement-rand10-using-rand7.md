# 470. Implement Rand10() Using Rand7()

**Difficulty:** Medium
**Category:** Math, Randomization, Rejection Sampling

## Problem

Given a function `Rand7()` that returns a uniformly random integer in the range `[1, 7]`, implement `Rand10()` that returns a uniformly random integer in the range `[1, 10]`, using only calls to `Rand7()`.

### Example

```
Input: n = 1
Output: [a value between 1 and 10]
```

### Constraints

- `1 <= n <= 10^5`

## Approach

Combine two independent `Rand7()` calls to build a uniformly random index in `[0, 49)` via `(row - 1) * 7 + (col - 1)`. Since `49` isn't a multiple of `10`, reject any result `>= 40` (the largest multiple of 10 that fits within 49) and retry, guaranteeing a uniform distribution over the remaining `40` outcomes, which map evenly onto `[1, 10]` via `result % 10 + 1`.

## C# Solution

```csharp
public class Solution
{
    private readonly Random random = new();

    public int Rand10()
    {
        int result;

        do
        {
            int row = Rand7() - 1;
            int col = Rand7() - 1;
            result = row * 7 + col;
        }
        while (result >= 40);

        return result % 10 + 1;
    }

    private int Rand7() => random.Next(1, 8);
}
```

## Complexity

- **Time:** `O(1)` expected — each attempt succeeds with probability `40/49`.
- **Space:** `O(1)`.
