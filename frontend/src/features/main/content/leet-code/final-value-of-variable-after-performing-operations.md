# 2011. Final Value of Variable After Performing Operations

**Difficulty:** Easy
**Category:** Array, String, Simulation

## Problem

There is a variable `X` starting at `0`. You are given an array of strings `operations`, where each operation is one of `"++X"`, `"X++"`, `"--X"`, or `"X--"`. Return *the final value of `X` after performing all the operations*.

### Example

```
Input: operations = ["--X","X++","X++"]
Output: 1
Explanation: The operations decrement, then increment, then increment X: 0 - 1 + 1 + 1 = 1.
```

## Approach

Every operation either increments or decrements `X` by exactly `1`. The direction can be determined just by checking whether the operation string contains a `'+'` or a `'-'`; the position of `X` relative to the symbol doesn't matter for the result.

## C# Solution

```csharp
public class Solution
{
    public int FinalValueAfterOperations(string[] operations)
    {
        int x = 0;
        foreach (var op in operations)
            x += op.Contains('+') ? 1 : -1;

        return x;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
