# 134. Gas Station

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

There are `n` gas stations along a circular route, where `gas[i]` is the amount of gas at station `i`, and `cost[i]` is the gas needed to travel from station `i` to station `i + 1`. Return the starting gas station index from which you can travel around the circuit once in the clockwise direction without running out of gas, or `-1` if no such starting point exists (the answer, if it exists, is guaranteed to be unique).

### Example 1

```
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation: starting at station 3, the tank never goes negative around the full circuit.
```

### Example 2

```
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
```

### Constraints

- `n == gas.length == cost.length`
- `1 <= n <= 10^5`
- `0 <= gas[i], cost[i] <= 10^4`

## Approach

If the total gas is less than the total cost, no solution exists. Otherwise, a greedy single pass works: track a running tank balance while trying a candidate start of `0`; whenever the running balance goes negative at some station `i`, none of the stations from the current candidate start through `i` could have worked either (they'd run out even sooner), so reset the candidate start to `i + 1` and reset the running balance to `0`.

## C# Solution

```csharp
public class Solution
{
    public int CanCompleteCircuit(int[] gas, int[] cost)
    {
        int totalBalance = 0, runningBalance = 0, start = 0;

        for (int i = 0; i < gas.Length; i++)
        {
            int diff = gas[i] - cost[i];
            totalBalance += diff;
            runningBalance += diff;

            if (runningBalance < 0)
            {
                start = i + 1;
                runningBalance = 0;
            }
        }

        return totalBalance >= 0 ? start : -1;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
