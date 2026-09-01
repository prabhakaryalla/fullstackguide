# 2019. The Score of Students Solving Math Expression

**Difficulty:** Hard
**Category:** String, Dynamic Programming, Stack, Recursion, Memoization

## Problem

You are given a string `s` representing a math expression consisting of single digits `0-9` and the operators `'+'` and `'*'`, using standard operator precedence (multiplication before addition). You are also given an integer array `answers` representing each student's submitted answer.

Grading rules:
- A student receives `5` points if their answer equals the **correct** value of the expression (using proper precedence).
- A student receives `2` points if their answer doesn't match the correct value, but is `<= 1000` and can be obtained by evaluating the expression using **some** order of operations (ignoring precedence, e.g. left to right or any parenthesization).
- Otherwise, `0` points.

Return *the sum of the points scored by all students*.

## Approach

Split the expression into a list of `numbers` and a list of `ops` between them. Compute the `correct` answer directly with a simple stack-based evaluator honoring precedence (push numbers, and when the operator is `*`, immediately multiply into the top of the stack instead of pushing a new value; the final answer is the sum of the stack).

Then compute the set of **all** achievable values by interval dynamic programming: `dp[l][r]` is the set of distinct values achievable from combining `numbers[l..r]` with `ops[l..r-1]` in every possible order. The base case `dp[l][l] = { numbers[l] }`. For the general case, try every split point `k` between `l` and `r`, combine every value from `dp[l][k]` with every value from `dp[k+1][r]` using `ops[k]`, and keep only values `<= 1000` (matching the scoring rule and keeping the state space bounded). Memoize by `(l, r)`.

Finally, score each student's answer by comparing it to `correct`, then checking membership in the full achievable set `dp[0][numbers.Count - 1]`.

## C# Solution

```csharp
public class Solution
{
    public int ScoreOfStudents(string s, int[] answers)
    {
        var numbers = new List<int>();
        var ops = new List<char>();

        foreach (var ch in s)
        {
            if (char.IsDigit(ch)) numbers.Add(ch - '0');
            else if (ch == '+' || ch == '*') ops.Add(ch);
        }

        int correct = Evaluate(numbers, ops);

        int m = numbers.Count;
        var memo = new HashSet<int>[m, m];
        var possible = Solve(0, m - 1, numbers, ops, memo);

        int score = 0;
        foreach (var answer in answers)
        {
            if (answer == correct) score += 5;
            else if (answer <= 1000 && possible.Contains(answer)) score += 2;
        }

        return score;
    }

    private int Evaluate(List<int> numbers, List<char> ops)
    {
        var stack = new Stack<int>();
        stack.Push(numbers[0]);

        for (int i = 0; i < ops.Count; i++)
        {
            if (ops[i] == '+')
                stack.Push(numbers[i + 1]);
            else
                stack.Push(stack.Pop() * numbers[i + 1]);
        }

        return stack.Sum();
    }

    private HashSet<int> Solve(int l, int r, List<int> numbers, List<char> ops, HashSet<int>[,] memo)
    {
        if (memo[l, r] != null) return memo[l, r];

        var result = new HashSet<int>();
        if (l == r)
        {
            result.Add(numbers[l]);
            memo[l, r] = result;
            return result;
        }

        for (int k = l; k < r; k++)
        {
            var left = Solve(l, k, numbers, ops, memo);
            var right = Solve(k + 1, r, numbers, ops, memo);
            char op = ops[k];

            foreach (var lv in left)
            {
                foreach (var rv in right)
                {
                    int value = op == '+' ? lv + rv : lv * rv;
                    if (value <= 1000)
                        result.Add(value);
                }
            }
        }

        memo[l, r] = result;
        return result;
    }
}
```

## Complexity

- **Time:** `O(m^3 * V^2)` in the worst case, where `m` is the number of operands and `V` is the bounded number of distinct achievable values per interval (capped by the `<= 1000` rule).
- **Space:** `O(m^2 * V)` for the memoized interval sets.
