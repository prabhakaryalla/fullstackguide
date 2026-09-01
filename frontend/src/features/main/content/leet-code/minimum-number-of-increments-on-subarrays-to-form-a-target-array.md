# 1526. Minimum Number of Increments on Subarrays to Form a Target Array

**Difficulty:** Hard
**Category:** Array, Stack, Greedy

## Problem

Given a `target` array, starting from an all-zero array `initial` of the same length, each operation lets you choose a subarray and increment every element in it by 1. Return the minimum number of operations needed to transform `initial` into `target`.

### Example

```
Input: target = [1,2,3,2,1]
Output: 3
```

## Approach

Think of the problem as building the array with horizontal "layers" of increments. Whenever the target value rises from one position to the next, that rise must start a certain number of *new* layers (operations); whenever it falls, no new operations are needed (existing layers simply end). Formally, the answer is `target[0]` plus the sum of `max(0, target[i] - target[i - 1])` for every `i` from `1` to `n - 1`.

## C# Solution

```csharp
public class Solution
{
    public int MinNumberOperations(int[] target)
    {
        int operations = target[0];

        for (int i = 1; i < target.Length; i++)
        {
            if (target[i] > target[i - 1])
            {
                operations += target[i] - target[i - 1];
            }
        }

        return operations;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
