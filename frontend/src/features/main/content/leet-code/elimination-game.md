# 390. Elimination Game

**Difficulty:** Medium
**Category:** Array, Math, Simulation

## Problem

Given a list of integers from `1` to `n` sorted in ascending order, repeatedly eliminate every other number starting from the left, then reverse direction and eliminate every other number from the remaining list starting from the right, alternating directions until only one number remains. Return that number.

### Example

```
Input: n = 9
Output: 6
```

### Constraints

- `1 <= n <= 10^9`

## Approach

Rather than simulating the elimination, track the value of the leftmost remaining number (`head`), the gap between remaining numbers (`step`), and the current elimination direction. When eliminating from the left, or when the remaining count is odd (which also shifts the head when eliminating from the right), advance `head` by `step`. Halve the count and double the step after each round until only one number remains.

## C# Solution

```csharp
public class Solution
{
    public int LastRemaining(int n)
    {
        int head = 1;
        int step = 1;
        bool leftToRight = true;

        while (n > 1)
        {
            if (leftToRight || n % 2 == 1)
                head += step;

            n /= 2;
            step *= 2;
            leftToRight = !leftToRight;
        }

        return head;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
