# 38. Count and Say

**Difficulty:** Medium
**Category:** String

## Problem

The "count-and-say" sequence is defined by the recursive formula:

- `countAndSay(1) = "1"`
- `countAndSay(n)` is the way you would "say" the digit string from `countAndSay(n - 1)`, which is then converted into a different digit string.

To determine how to "say" a digit string, split it into the minimal number of runs of the same character, and for each run, say the number of characters, then say the character. Given a positive integer `n`, return the `n`-th element of the count-and-say sequence.

### Example 1

```
Input: n = 1
Output: "1"
Explanation: This is the base case.
```

### Example 2

```
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = say "1" = one 1 = "11"
countAndSay(3) = say "11" = two 1's = "21"
countAndSay(4) = say "21" = one 2 + one 1 = "1211"
```

### Constraints

- `1 <= n <= 30`

## Approach

Start from `"1"` and iteratively build the next term `n - 1` times. To build the next term, scan the current string in runs of identical consecutive digits, appending `count + digit` for each run.

## C# Solution

```csharp
public class Solution
{
    public string CountAndSay(int n)
    {
        string result = "1";

        for (int i = 1; i < n; i++)
        {
            result = NextTerm(result);
        }

        return result;
    }

    private string NextTerm(string s)
    {
        var sb = new StringBuilder();
        int i = 0;

        while (i < s.Length)
        {
            char digit = s[i];
            int count = 0;

            while (i < s.Length && s[i] == digit)
            {
                count++;
                i++;
            }

            sb.Append(count).Append(digit);
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n * L)` — where `L` is the length of the longest generated term (grows exponentially but bounded for `n <= 30`).
- **Space:** `O(L)` — for the string being built at each step.
