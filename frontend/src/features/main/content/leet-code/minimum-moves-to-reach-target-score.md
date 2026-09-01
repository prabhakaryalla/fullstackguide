# 2139. Minimum Moves to Reach Target Score

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

You are playing a game with integers. You start with integer `1` and you want to reach integer `target`.

In one move, you can either:
- Increment the current integer by one (i.e., `x = x + 1`)
- Double the current integer (i.e., `x = 2 * x`)

You can use the increment operation any number of times. However, you can use the double operation at most `maxDoubles` times.

Return the minimum number of moves needed to reach `target` starting from `1`.

### Example

```
Input: target = 5, maxDoubles = 0
Output: 4
Explanation: Increment from 1 to 5: 1 -> 2 -> 3 -> 4 -> 5

Input: target = 19, maxDoubles = 2
Output: 7
Explanation: 1 -> 2 (double) -> 3 (increment) -> 6 (double) -> 12 -> 13 -> ... -> 19
```

## Approach

Work backwards from target to 1. At each step:
- If target is even and we have doubles left, divide by 2 (reverse of doubling)
- Otherwise, decrement by 1

Working backwards is more efficient because we immediately know if we should divide or subtract. The greedy strategy is optimal: use doubles whenever possible (when target is even) because doubling is exponentially more powerful than incrementing.

## C# Solution

```csharp
public class Solution
{
    public int MinMoves(int target, int maxDoubles)
    {
        int moves = 0;
        
        while (target > 1)
        {
            if (target % 2 == 0 && maxDoubles > 0)
            {
                target /= 2;
                maxDoubles--;
            }
            else
            {
                // If no doubles left, just decrement rest of the way
                if (maxDoubles == 0)
                {
                    moves += target - 1;
                    break;
                }
                target--;
            }
            moves++;
        }
        
        return moves;
    }
}
```

## Complexity

- **Time:** O(log target) in best case, O(target) in worst case
- **Space:** O(1)
