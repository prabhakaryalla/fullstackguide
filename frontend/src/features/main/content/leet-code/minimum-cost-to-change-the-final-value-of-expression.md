# 1896. Minimum Cost to Change the Final Value of Expression

**Difficulty:** Hard
**Category:** Stack, String, Dynamic Programming

## Problem

Given a boolean `expression` string built from `'0'`, `'1'`, `'&'`, `'|'`, and parentheses, return the minimum number of single-character edits (flipping a `'0'`/`'1'`, or swapping an `'&'`/`'|'`) needed to change the evaluated result of the expression from its current value to the opposite value.

### Example

```
Input: expression = "1&(0|1)"
Output: 1
```

## Approach

Evaluate the expression with a stack, but instead of tracking just a boolean value, track for every sub-expression a pair `(value, minCostToFlipItsValue)`. Pushing `'('`, `'&'`, `'|'` onto the stack are structural markers; a literal `'0'`/`'1'` starts with a flip cost of `1`. On `')'`, pop the completed sub-expression's pair. Whenever the top of the stack is an operator, pop the operator and its left operand pair, combine with the right operand (`lastPair`) using a case analysis on the four `(a, b)` value combinations for `&`/`|` to compute both the resulting value and the minimum cost to flip that combined value — considering that flipping just one operand, flipping the operator itself, or flipping one operand together with the operator can all be candidate strategies depending on the combination. The final answer is the flip cost stored for the whole expression at the end.

## C# Solution

```csharp
public class Solution
{
    public int MinOperationsToFlip(string expression)
    {
        var stack = new Stack<(char ch, int cost)>();
        (char ch, int cost) lastPair = default;

        foreach (char e in expression)
        {
            if (e == '(' || e == '&' || e == '|')
            {
                stack.Push((e, 0));
                continue;
            }

            if (e == ')')
            {
                lastPair = stack.Pop();
                stack.Pop();
            }
            else
            {
                lastPair = (e, 1);
            }

            if (stack.Count > 0 && (stack.Peek().ch == '&' || stack.Peek().ch == '|'))
            {
                char op = stack.Pop().ch;
                var (a, costA) = stack.Pop();
                var (b, costB) = lastPair;

                if (op == '&')
                {
                    if (a == '0' && b == '0')
                        lastPair = ('0', 1 + Math.Min(costA, costB));
                    else if (a == '0' && b == '1')
                        lastPair = ('0', 1);
                    else if (a == '1' && b == '0')
                        lastPair = ('0', 1);
                    else
                        lastPair = ('1', Math.Min(costA, costB));
                }
                else
                {
                    if (a == '0' && b == '0')
                        lastPair = ('0', Math.Min(costA, costB));
                    else if (a == '0' && b == '1')
                        lastPair = ('1', 1);
                    else if (a == '1' && b == '0')
                        lastPair = ('1', 1);
                    else
                        lastPair = ('1', 1 + Math.Min(costA, costB));
                }
            }

            stack.Push(lastPair);
        }

        return stack.Peek().cost;
    }
}
```

## Complexity

- **Time:** `O(n)` where `n` is the length of `expression`.
- **Space:** `O(n)` for the stack.
