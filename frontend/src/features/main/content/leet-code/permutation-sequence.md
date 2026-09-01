# 60. Permutation Sequence

**Difficulty:** Hard
**Category:** Math, Recursion

## Problem

The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations. Given `n` and `k`, return the `k`-th permutation sequence (1-indexed).

### Example 1

```
Input: n = 3, k = 3
Output: "213"
```

### Example 2

```
Input: n = 4, k = 9
Output: "2314"
```

### Constraints

- `1 <= n <= 9`
- `1 <= k <= n!`

## Approach

Rather than generating all permutations, use factorial number system logic: with `n` remaining digits, there are `(n-1)!` permutations for each choice of the first digit. Determine the index of the first digit as `(k - 1) / (n - 1)!`, remove that digit from the candidate list, reduce `k` to `(k - 1) % (n - 1)!  + 1`, and repeat for the remaining digits.

## C# Solution

```csharp
public class Solution
{
    public string GetPermutation(int n, int k)
    {
        var digits = new List<int>();
        var factorial = new int[n + 1];
        factorial[0] = 1;

        for (int i = 1; i <= n; i++)
        {
            digits.Add(i);
            factorial[i] = factorial[i - 1] * i;
        }

        k--; // switch to 0-indexed
        var sb = new StringBuilder();

        for (int i = n; i >= 1; i--)
        {
            int index = k / factorial[i - 1];
            k %= factorial[i - 1];

            sb.Append(digits[index]);
            digits.RemoveAt(index);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n^2)` — removing from the middle of the digits list costs `O(n)`, done `n` times.
- **Space:** `O(n)` — for the digits list and factorial table.
