# 386. Lexicographical Numbers

**Difficulty:** Medium
**Category:** Depth-First Search, Trie

## Problem

Given an integer `n`, return all the numbers in the range `[1, n]` sorted in lexicographical order.

### Example

```
Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
```

### Constraints

- `1 <= n <= 5 * 10^4`

## Approach

Think of the numbers as nodes in a 10-ary trie (digits `0`-`9` as children), where lexicographical order corresponds to a pre-order traversal. Simulate this traversal iteratively: from the current number, prefer descending into `current * 10` (append a `0` digit) if it's `<= n`; otherwise, backtrack by trimming trailing `9`s (and stop if going further would exceed `n`) before incrementing.

## C# Solution

```csharp
public class Solution
{
    public IList<int> LexicalOrder(int n)
    {
        var result = new List<int>(n);
        int current = 1;

        for (int i = 0; i < n; i++)
        {
            result.Add(current);

            if (current * 10 <= n)
            {
                current *= 10;
            }
            else
            {
                while (current % 10 == 9 || current + 1 > n)
                    current /= 10;

                current++;
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — each of the `n` numbers is produced in constant amortized time.
- **Space:** `O(1)` extra, excluding the output list.
