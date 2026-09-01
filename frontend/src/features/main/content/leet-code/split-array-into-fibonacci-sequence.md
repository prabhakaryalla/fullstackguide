# 842. Split Array into Fibonacci Sequence

**Difficulty:** Medium
**Category:** Array, String, Backtracking

## Problem

Given a string `num` of digits, return any list of integers that forms a valid Fibonacci-like sequence (at least 3 numbers, each equal to the sum of the two preceding ones, no leading zeros except the single digit `0`, and every value fits in a 32-bit signed integer) obtained by splitting `num` into consecutive pieces, or an empty list if impossible.

### Example

```
Input: num = "123456579"
Output: [123,456,579]
```

## Approach

Use backtracking to try every possible length for the next number starting at the current position. Skip lengths that would create an invalid leading zero or that overflow a 32-bit integer (and stop growing the length further once overflow occurs, since more digits only increase the value). Once at least two numbers have been chosen, the next number's value is constrained to be exactly the sum of the previous two — skip candidates smaller than the required sum and stop trying longer ones once the candidate exceeds it. When the entire string has been consumed and at least 3 numbers have been chosen, a valid split has been found.

## C# Solution

```csharp
public class Solution
{
    public IList<int> SplitIntoFibonacci(string num)
    {
        var result = new List<int>();
        if (Backtrack(num, 0, result)) return result;
        return new List<int>();
    }

    private bool Backtrack(string num, int start, List<int> path)
    {
        if (start == num.Length && path.Count >= 3) return true;

        for (int len = 1; len <= 10 && start + len <= num.Length; len++)
        {
            if (len > 1 && num[start] == '0') break;

            string segment = num.Substring(start, len);
            long value = long.Parse(segment);

            if (value > int.MaxValue) break;

            int count = path.Count;

            if (count >= 2)
            {
                long expected = (long)path[count - 1] + path[count - 2];
                if (value > expected) break;
                if (value < expected) continue;
            }

            path.Add((int)value);

            if (Backtrack(num, start + len, path)) return true;

            path.RemoveAt(path.Count - 1);
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in practice, bounded by the small maximum number length (10 digits).
- **Space:** `O(n)` for the recursion stack and path.
