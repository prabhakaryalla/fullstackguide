# 1927. Sum Game

**Difficulty:** Medium
**Category:** Math, Game Theory

## Problem

Given a string `num` of even length containing digits and `'?'` characters, two players (Alice, then Bob) alternately replace a `'?'` with a digit `0-9`. After all `'?'`s are filled, split `num` into two equal halves; Alice wins if the sums of digits of the two halves differ, Bob wins if they are equal. Both play optimally. Return `true` if Alice wins.

### Example

```
Input: num = "5023"
Output: false
Explanation: There are no '?' characters; the halves "50" and "23" have equal sums (5 and 5), so Bob wins.
```

### Constraints

- `2 <= num.length <= 10^5`
- `num.length` is even.
- `num[i]` is either a digit or `'?'`.

## Approach

Compute the fixed digit sum of the left half, the fixed digit sum of the right half, the number of `'?'` in the left half, and the number in the right half. If the total number of `'?'` is odd, Alice always wins (she can force an imbalance by making the last move). If the counts of `'?'` are unequal in the two halves (after accounting parity), the outcome reduces to comparing `diff = leftSum - rightSum` against `5 * (leftUnknowns - rightUnknowns)`: Bob wins only if `diff == 5 * (leftUnknowns - rightUnknowns)` when total unknowns is even (each pair of moves — one per player — can be balanced to add exactly `9` combined regardless of choices only when symmetric; the well-known reduction is: if total `?` count is odd, Alice wins; otherwise Bob wins iff `leftSum - rightSum == 5 * (rightUnknowns - leftUnknowns)`).

## C# Solution

```csharp
public class Solution
{
    public bool SumGame(string num)
    {
        int n = num.Length;
        int half = n / 2;
        long leftSum = 0, rightSum = 0;
        int leftUnknown = 0, rightUnknown = 0;

        for (int i = 0; i < half; i++)
        {
            if (num[i] == '?') leftUnknown++;
            else leftSum += num[i] - '0';
        }

        for (int i = half; i < n; i++)
        {
            if (num[i] == '?') rightUnknown++;
            else rightSum += num[i] - '0';
        }

        int totalUnknown = leftUnknown + rightUnknown;
        if (totalUnknown % 2 == 1) return true;

        long diff = leftSum - rightSum;
        long neededDiff = 5L * (rightUnknown - leftUnknown);

        return diff != neededDiff;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass to sum digits and count unknowns.
- **Space:** `O(1)`.
