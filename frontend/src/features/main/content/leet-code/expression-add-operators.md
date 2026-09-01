# 282. Expression Add Operators

**Difficulty:** Hard
**Category:** Math, String, Backtracking

## Problem

Given a string `num` that contains only digits and an integer `target`, return all ways to add the binary operators `+`, `-`, or `*` between the digits of `num` so that the resulting expression evaluates to `target`. Numbers in the expression must not contain leading zeros unless the number itself is `"0"`.

### Example

```
Input: num = "123", target = 6
Output: ["1+2+3","1*2*3"]
```

### Constraints

- `1 <= num.length <= 10`
- `num` consists of only digits.

## Approach

Backtrack over every split point, building the expression as a string while tracking the running evaluated value and, separately, the value of the last operand (needed to correctly handle operator precedence for `*`, since it binds tighter than `+`/`-`). At each step: for `+`, add the operand; for `-`, subtract it; for `*`, undo the previous operand's addition/subtraction and instead add `lastOperand * currentOperand`. Skip any candidate number with a leading zero (unless the number is exactly `"0"`).

## C# Solution

```csharp
public class Solution
{
    public IList<string> AddOperators(string num, int target)
    {
        var result = new List<string>();
        Backtrack(num, target, 0, "", 0, 0, result);
        return result;
    }

    private void Backtrack(string num, int target, int index, string expr, long value, long lastOperand, List<string> result)
    {
        if (index == num.Length)
        {
            if (value == target) result.Add(expr);
            return;
        }

        for (int i = index; i < num.Length; i++)
        {
            if (i > index && num[index] == '0') break; // no leading zeros

            string part = num[index..(i + 1)];
            long operand = long.Parse(part);

            if (index == 0)
            {
                Backtrack(num, target, i + 1, part, operand, operand, result);
            }
            else
            {
                Backtrack(num, target, i + 1, expr + "+" + part, value + operand, operand, result);
                Backtrack(num, target, i + 1, expr + "-" + part, value - operand, -operand, result);
                Backtrack(num, target, i + 1, expr + "*" + part, value - lastOperand + lastOperand * operand, lastOperand * operand, result);
            }
        }
    }
}
```

## Complexity

- **Time:** `O(4^n)` worst case — at each digit boundary there are up to 3 operator choices plus extending the current number.
- **Space:** `O(n)` — recursion depth, plus output storage.
