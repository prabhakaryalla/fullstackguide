# 1441. Build an Array With Stack Operations

**Difficulty:** Easy
**Category:** Array, Stack, Simulation

## Problem

Given a `target` array and an integer `n`, you have a stream of numbers from `1` to `n` and an empty stack, with operations `Push` (push the next number) and `Pop` (discard the top of the stack). Return a sequence of `Push`/`Pop` operations that builds the `target` array on the stack (in order), using only numbers `1` through `n`, stopping as soon as `target` is built.

### Example

```
Input: target = [1,3], n = 3
Output: ["Push","Push","Pop","Push"]
```

## Approach

Walk through numbers `1` to `n`. For each number, always `Push` it. If it matches the next needed value in `target`, advance the target pointer; otherwise, immediately `Pop` it since it's not part of the target. Stop once the entire target has been matched.

## C# Solution

```csharp
public class Solution
{
    public IList<string> BuildArray(int[] target, int n)
    {
        var result = new List<string>();
        int idx = 0;

        for (int num = 1; num <= n && idx < target.Length; num++)
        {
            result.Add("Push");

            if (target[idx] == num)
                idx++;
            else
                result.Add("Pop");
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result list.
