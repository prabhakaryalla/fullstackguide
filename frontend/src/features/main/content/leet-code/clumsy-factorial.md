# 1006. Clumsy Factorial

**Difficulty:** Medium
**Category:** Math, Stack, Simulation

## Problem

The factorial of a positive integer can normally be written as a product `n * (n-1) * ... * 1`. Instead, implement a "clumsy" factorial that alternates between multiply, divide, add, and subtract operations, in that fixed order and repeating, using integer division: `n * (n-1) / (n-2) + (n-3) * (n-4) / (n-5) + ...`. Return the result of the clumsy factorial of `n`.

### Example

```
Input: n = 4
Output: 7
Explanation: 4 * 3 / 2 + 1 = 6 + 1 = 7
```

## Approach

Simulate the expression left to right with a stack, since multiplication and division bind tighter than addition/subtraction. Push `n` first. Then, cycling through `*`, `/`, `+`, `-` for each subsequent number: for `*`/`/`, pop the top and push the combined result immediately; for `+`, push the number as-is; for `-`, push its negation. Finally, sum everything left on the stack.

## C# Solution

```csharp
public class Solution
{
    public int Clumsy(int n)
    {
        var stack = new Stack<int>();
        stack.Push(n);
        int index = n - 1;
        int op = 0; // cycles through *, /, +, -

        while (index > 0)
        {
            switch (op % 4)
            {
                case 0:
                    stack.Push(stack.Pop() * index);
                    break;
                case 1:
                    stack.Push(stack.Pop() / index);
                    break;
                case 2:
                    stack.Push(index);
                    break;
                default:
                    stack.Push(-index);
                    break;
            }

            op++;
            index--;
        }

        int result = 0;
        while (stack.Count > 0) result += stack.Pop();
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass down to `1`.
- **Space:** `O(n)` for the stack.
