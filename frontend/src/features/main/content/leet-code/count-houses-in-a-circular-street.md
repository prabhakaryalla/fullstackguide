# 2728. Count Houses in a Circular Street

**Difficulty:** Hard
**Category:** Interactive
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
This is an interactive problem. There is a circular street with `n` houses (`1 <= n <= k`, where `k` is given to you as a safe upper bound). Exactly one house's door is closed — the house at which your robot currently stands — and every other house's door is open. You may call `street.Closed()` to check whether the door of the house the robot currently occupies is closed, and `street.MoveRight()` to move the robot one house clockwise (after exactly `n` calls to `MoveRight()` the robot returns to the closed house). Using at most `2 * k` total calls to `Closed()` and `MoveRight()` combined, determine and return `n`.

## Approach
Move the robot one house to the right and count it. Keep moving right, incrementing the count for every house visited, until either the door is closed again (the robot has returned to its starting house) or the count reaches the safety bound `k`. The number of houses visited before the door is closed again is exactly `n`.

## C# Solution

```csharp
public interface Street
{
    bool Closed();
    void MoveRight();
}

public class Solution
{
    public int CountHouses(Street street, int k)
    {
        int count = 1;
        street.MoveRight();

        while (!street.Closed() && count < k)
        {
            count++;
            street.MoveRight();
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(k).
- **Space:** O(1).
