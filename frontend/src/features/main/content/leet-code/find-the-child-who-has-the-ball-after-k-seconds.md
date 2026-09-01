# 3178. Find the Child Who Has the Ball After K Seconds

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem
`n` children stand in a line, numbered 0 to n-1, and pass a ball back and forth: starting at child 0, the ball moves toward the end of the line, bounces back when it reaches either end, and continues bouncing every second. Given `n` and `k` seconds, determine which child is holding the ball after exactly `k` seconds.

## Approach
The ball's motion is periodic: a full round trip (from one end to the other and back) takes `2 * (n - 1)` seconds. Compute the effective time within the current cycle as `k % roundTime`. If that value is less than `n`, the ball is still moving forward and its position equals that value directly; otherwise, it's on the return trip, and the position is `roundTime - pos`.

## C# Solution
```csharp
public class Solution {
    public int NumberOfChild(int n, int k) {
        int roundTime = 2 * (n - 1);
        int pos = k % roundTime;
        return pos < n ? pos : roundTime - pos;
    }
}
```

## Complexity
- Time: O(1)
- Space: O(1)
