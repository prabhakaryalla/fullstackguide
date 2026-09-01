# 3271. Hash Divided String

**Difficulty:** Medium
**Category:** String, Hash Function, Simulation

## Problem
You are given a string `s` consisting of lowercase English letters and an integer `k`, where `s.length` is divisible by `k`. Divide `s` into contiguous substrings of length `k`. The hash value of each substring is computed by summing `(character - 'a')` for every character in it, then taking the result modulo `26`, and mapping that number back to a lowercase letter (`0 -> 'a'`, `1 -> 'b'`, ..., `25 -> 'z'`). Return the string formed by concatenating the hash value of every substring, in order.

### Example

```
Input: s = "abcd", k = 2
Output: "bf"
Explanation: "ab" -> (0 + 1) % 26 = 1 -> 'b'. "cd" -> (2 + 3) % 26 = 5 -> 'f'. Result: "bf".
```

## Approach
Iterate through `s` in blocks of `k` characters. For each block, accumulate the sum of `(char - 'a')`, reduce modulo `26`, and append the corresponding letter to the result.

## C# Solution

```csharp
public class Solution 
{
    public string StringHash(string s, int k) 
    {
        var result = new StringBuilder();

        for (int i = 0; i < s.Length; i += k) 
        {
            int sum = 0;
            for (int j = i; j < i + k; j++) 
            {
                sum += s[j] - 'a';
            }

            result.Append((char)('a' + sum % 26));
        }

        return result.ToString();
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `s`.
- **Space:** O(n / k) for the resulting string.
