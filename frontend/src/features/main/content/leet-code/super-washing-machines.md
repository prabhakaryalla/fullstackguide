# 517. Super Washing Machines

**Difficulty:** Hard
**Category:** Array, Greedy

## Problem

Given `n` washing machines in a row, each containing some number of dresses, and in one move you can transfer one dress from any machine to an adjacent machine, return the minimum number of moves to make every machine have the same number of dresses. Return `-1` if impossible.

### Example

```
Input: machines = [1,0,5]
Output: 3
```

### Constraints

- `n == machines.length`
- `1 <= n <= 10^4`
- `0 <= machines[i] <= 10^5`

## Approach

If the total dress count isn't divisible by `n`, an equal distribution is impossible. Otherwise, compute each machine's surplus or deficit relative to the target average, and track a running balance representing the net dresses that must flow across the boundary just after each machine. The answer is the largest value among: the maximum absolute running balance (dresses that must cross some boundary), and the maximum single-machine surplus (since a machine with a large excess must personally push out that many dresses regardless of flow direction).

## C# Solution

```csharp
public class Solution
{
    public int FindMinMoves(int[] machines)
    {
        int total = machines.Sum();
        int n = machines.Length;

        if (total % n != 0) return -1;

        int target = total / n;
        int maxMoves = 0;
        int runningBalance = 0;

        foreach (var machine in machines)
        {
            int diff = machine - target;
            runningBalance += diff;

            maxMoves = Math.Max(maxMoves, Math.Max(Math.Abs(runningBalance), diff));
        }

        return maxMoves;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
