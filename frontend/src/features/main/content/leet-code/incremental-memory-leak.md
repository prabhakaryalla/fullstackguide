# 1860. Incremental Memory Leak

**Difficulty:** Medium
**Category:** Simulation, Array

## Problem

Two memory sticks start with `memory1` and `memory2` bits available. At the `i`-th second (starting at `1`), `i` bits are requested from whichever stick currently has more available memory (ties go to the first stick); if neither stick has enough, the program crashes. Return `[crashTime, remaining1, remaining2]`.

### Example

```
Input: memory1 = 2, memory2 = 2
Output: [3,1,0]
```

## Approach

Simulate second by second: at each second `t`, compare the two remaining memory amounts and pick the larger (favoring stick 1 on ties). If that stick doesn't have at least `t` bits available, the crash happens at second `t`, so return the current state. Otherwise deduct `t` bits from it and move to the next second.

## C# Solution

```csharp
public class Solution
{
    public int[] MemLeak(int memory1, int memory2)
    {
        int time = 1;

        while (true)
        {
            if (memory1 >= memory2)
            {
                if (memory1 < time) break;
                memory1 -= time;
            }
            else
            {
                if (memory2 < time) break;
                memory2 -= time;
            }
            time++;
        }

        return new[] { time, memory1, memory2 };
    }
}
```

## Complexity

- **Time:** `O(sqrt(memory1 + memory2))` since the memory drains roughly quadratically in time.
- **Space:** `O(1)`.
