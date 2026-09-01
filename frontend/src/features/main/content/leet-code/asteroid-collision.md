# 735. Asteroid Collision

**Difficulty:** Medium
**Category:** Array, Stack, Simulation

## Problem

Given an array of integers `asteroids` representing asteroids in a row (magnitude is size, sign is direction — positive moves right, negative moves left), simulate collisions: two asteroids moving toward each other collide, and the smaller one is destroyed (equal sizes destroy both). Return the state of the asteroids after all collisions.

### Example

```
Input: asteroids = [5,10,-5]
Output: [5,10]
```

## Approach

Use a stack to represent asteroids that have survived so far, moving left to right through the input. A collision only happens when the current asteroid moves left (negative) and the stack's top moves right (positive) — in that case, repeatedly resolve the collision: pop and discard the top if it's smaller, pop the top and stop (current asteroid also destroyed) if they're equal, or discard the current asteroid entirely if the top is larger. If the current asteroid survives all such collisions, push it onto the stack.

## C# Solution

```csharp
public class Solution
{
    public int[] AsteroidCollision(int[] asteroids)
    {
        var stack = new Stack<int>();

        foreach (var asteroid in asteroids)
        {
            bool destroyed = false;

            while (stack.Count > 0 && asteroid < 0 && stack.Peek() > 0)
            {
                int top = stack.Peek();

                if (top < -asteroid)
                {
                    stack.Pop();
                    continue;
                }
                else if (top == -asteroid)
                {
                    stack.Pop();
                }

                destroyed = true;
                break;
            }

            if (!destroyed)
                stack.Push(asteroid);
        }

        return stack.Reverse().ToArray();
    }
}
```

## Complexity

- **Time:** `O(n)` — each asteroid is pushed and popped at most once.
- **Space:** `O(n)` for the stack.
