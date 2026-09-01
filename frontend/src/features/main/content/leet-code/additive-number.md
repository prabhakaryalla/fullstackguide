# 306. Additive Number

**Difficulty:** Medium
**Category:** String, Backtracking, Math

## Problem

An additive number is a string whose digits can form an additive sequence, where each number (except the first two) equals the sum of the preceding two numbers, and no number in the sequence has leading zeros (unless the number itself is `0`). Given a string `num` containing only digits, return `true` if it is an additive number.

### Example

```
Input: num = "112358"
Output: true
Explanation: 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
```

### Constraints

- `1 <= num.length <= 35`
- `num` consists only of digits.

## Approach

Try every split of the first two numbers (`i` and `j` characters respectively), rejecting splits with invalid leading zeros. For each candidate pair, repeatedly compute the next expected number as a big-number string addition and check whether the remaining suffix starts with it, advancing until the whole string is consumed.

## C# Solution

```csharp
public class Solution
{
    public bool IsAdditiveNumber(string num)
    {
        int n = num.Length;
        for (int i = 1; i <= n / 2; i++)
        {
            for (int j = 1; Math.Max(i, j) <= n - i - j; j++)
            {
                if (IsValidSplit(num, i, j)) return true;
            }
        }

        return false;
    }

    private bool IsValidSplit(string num, int i, int j)
    {
        if ((num[0] == '0' && i > 1) || (num[i] == '0' && j > 1)) return false;

        var first = num.Substring(0, i);
        var second = num.Substring(i, j);
        int start = i + j;

        while (start < num.Length)
        {
            var sum = AddStrings(first, second);
            if (!num.Substring(start).StartsWith(sum)) return false;

            start += sum.Length;
            first = second;
            second = sum;
        }

        return true;
    }

    private string AddStrings(string a, string b)
    {
        var sb = new System.Text.StringBuilder();
        int i = a.Length - 1, j = b.Length - 1, carry = 0;

        while (i >= 0 || j >= 0 || carry > 0)
        {
            int sum = carry;
            if (i >= 0) sum += a[i--] - '0';
            if (j >= 0) sum += b[j--] - '0';
            sb.Insert(0, (char)(sum % 10 + '0'));
            carry = sum / 10;
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n^3)` — `O(n^2)` splits, each verified in `O(n)`.
- **Space:** `O(n)` for the intermediate sum strings.
