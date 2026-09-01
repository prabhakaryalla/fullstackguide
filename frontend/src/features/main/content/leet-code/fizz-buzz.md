# 412. Fizz Buzz

**Difficulty:** Easy
**Category:** Math, String, Simulation

## Problem

Given an integer `n`, return a string array `answer` (1-indexed) where `answer[i] == "FizzBuzz"` if `i` is divisible by 3 and 5, `answer[i] == "Fizz"` if divisible by 3 only, `answer[i] == "Buzz"` if divisible by 5 only, or `answer[i] == i` (as a string) otherwise.

### Example

```
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
```

### Constraints

- `1 <= n <= 10^4`

## Approach

Iterate from `1` to `n`, checking divisibility by 15 first (to cover both 3 and 5), then by 3 alone, then by 5 alone, defaulting to the number itself otherwise.

## C# Solution

```csharp
public class Solution
{
    public IList<string> FizzBuzz(int n)
    {
        var result = new List<string>(n);
        for (int i = 1; i <= n; i++)
        {
            if (i % 15 == 0) result.Add("FizzBuzz");
            else if (i % 3 == 0) result.Add("Fizz");
            else if (i % 5 == 0) result.Add("Buzz");
            else result.Add(i.ToString());
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra, excluding the output list.
