# 1776. Car Fleet II

**Difficulty:** Hard
**Category:** Array, Stack, Monotonic Stack, Simulation

## Problem

Given `cars` where `cars[i] = [positioni, speedi]` sorted by increasing position along a road, return for each car the time it will take to collide with the car directly ahead of it (accounting for that car possibly merging into a slower fleet first), or `-1` if it never collides.

### Example

```
Input: cars = [[1,2],[2,1],[4,3],[7,2]]
Output: [1.00000,-1.00000,-1.00000,-1.00000]
```

## Approach

Process cars from right to left while maintaining a stack of indices that represent potentially relevant fleets ahead. For car `i`, if it is not faster than the car on top of the stack, it will never catch it, so leave it unresolved. Otherwise compute the naive catch-up time; if that time is no later than the time the car ahead of it collides with its own leader (or that leader never collides), it's valid — otherwise that fleet already merged before being caught, so pop it and check the next one down.

## C# Solution

```csharp
public class Solution
{
    public double[] GetCollisionTimes(int[][] cars)
    {
        int n = cars.Length;
        double[] result = new double[n];
        var stack = new Stack<int>();

        for (int i = n - 1; i >= 0; i--)
        {
            result[i] = -1.0;

            while (stack.Count > 0)
            {
                int j = stack.Peek();
                if (cars[i][1] <= cars[j][1]) break;

                double t = (double)(cars[j][0] - cars[i][0]) / (cars[i][1] - cars[j][1]);
                if (result[j] < 0 || t <= result[j])
                {
                    result[i] = t;
                    break;
                }

                stack.Pop();
            }

            stack.Push(i);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` amortized, since each index is pushed and popped at most once.
- **Space:** `O(n)` for the stack and output.
