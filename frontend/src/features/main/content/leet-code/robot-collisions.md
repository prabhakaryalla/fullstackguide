# 2762. Robot Collisions

**Difficulty:** Hard
**Category:** Array, Stack, Simulation

## Problem

There are `n` robots on an infinite number line. You are given two integer arrays `positions` and `healths` of length `n`, and a string `directions` of length `n`. The i-th robot is initially at position `positions[i]` with health `healths[i]` and moving in direction `directions[i]` ('L' for left, 'R' for right).

All robots move simultaneously at the same speed. When two robots collide, the one with lower health is removed. If both have equal health, both are removed. The robot with higher health continues with its health decreased by 1.

Return an array of the final healths of the surviving robots in their original order, or an empty array if no robots survive.

### Example

```
Input: positions = [5,4,3,2,1], healths = [2,17,9,15,10], directions = "RRRRR"
Output: [2,17,9,15,10]
Explanation: No collisions occur since all robots move in the same direction.
```

## Approach

Create pairs of (position, index, health, direction) and sort by position. Use a stack to simulate collisions:
- If a robot moves right ('R'), push it onto the stack
- If a robot moves left ('L'), check for collisions with robots on top of the stack moving right
- Process collisions according to the rules until no more collisions occur
- Collect surviving robots and restore their original order

## C# Solution

```csharp
public class Solution
{
    public int[] SurvivedRobotsHealths(int[] positions, int[] healths, string directions)
    {
        int n = positions.Length;
        var robots = new List<(int pos, int idx, int health, char dir)>();
        
        for (int i = 0; i < n; i++)
        {
            robots.Add((positions[i], i, healths[i], directions[i]));
        }
        
        robots.Sort((a, b) => a.pos.CompareTo(b.pos));
        
        var stack = new Stack<(int idx, int health, char dir)>();
        var survived = new int[n];
        Array.Fill(survived, -1);
        
        foreach (var robot in robots)
        {
            if (robot.dir == 'R')
            {
                stack.Push((robot.idx, robot.health, robot.dir));
            }
            else
            {
                int currentHealth = robot.health;
                bool alive = true;
                
                while (stack.Count > 0 && alive)
                {
                    var right = stack.Peek();
                    
                    if (right.health < currentHealth)
                    {
                        stack.Pop();
                        currentHealth--;
                    }
                    else if (right.health > currentHealth)
                    {
                        stack.Pop();
                        stack.Push((right.idx, right.health - 1, right.dir));
                        alive = false;
                    }
                    else
                    {
                        stack.Pop();
                        alive = false;
                    }
                }
                
                if (alive)
                {
                    survived[robot.idx] = currentHealth;
                }
            }
        }
        
        while (stack.Count > 0)
        {
            var robot = stack.Pop();
            survived[robot.idx] = robot.health;
        }
        
        var result = new List<int>();
        for (int i = 0; i < n; i++)
        {
            if (survived[i] != -1)
            {
                result.Add(survived[i]);
            }
        }
        
        return result.ToArray();
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting, O(n) for simulation
- **Space:** O(n) for the stack and result arrays
