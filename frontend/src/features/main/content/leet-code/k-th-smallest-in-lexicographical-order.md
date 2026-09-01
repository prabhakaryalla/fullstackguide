# 440. K-th Smallest in Lexicographical Order

**Difficulty:** Hard
**Category:** Trie, Math

## Problem

Given two integers `n` and `k`, return the `k`th lexicographically smallest integer in the range `[1, n]`.

### Example

```
Input: n = 13, k = 2
Output: 10
```

### Constraints

- `1 <= k <= n <= 10^9`

## Approach

Think of the numbers as a 10-ary trie where lexicographic order is a pre-order traversal (as in "Lexicographical Numbers"). Starting from `1`, repeatedly count how many numbers lie in the subtree rooted at the current prefix (using the range `[prefix, prefix+1)` scaled by powers of ten, capped at `n`). If that count is `<= k`, the target is not within this subtree, so skip past it by moving to the next sibling prefix; otherwise, descend into the subtree by appending a `0` digit, consuming one step from `k`.

## C# Solution

```csharp
public class Solution
{
    public int FindKthNumber(int n, int k)
    {
        long current = 1;
        k--;

        while (k > 0)
        {
            long steps = CountSteps(n, current, current + 1);

            if (steps <= k)
            {
                current++;
                k -= (int)steps;
            }
            else
            {
                current *= 10;
                k--;
            }
        }

        return (int)current;
    }

    private long CountSteps(int n, long first, long second)
    {
        long steps = 0;

        while (first <= n)
        {
            steps += Math.Min(n + 1L, second) - first;
            first *= 10;
            second *= 10;
        }

        return steps;
    }
}
```

## Complexity

- **Time:** `O(log^2 n)`.
- **Space:** `O(1)`.
