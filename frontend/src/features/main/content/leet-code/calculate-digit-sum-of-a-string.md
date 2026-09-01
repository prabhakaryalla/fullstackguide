# 2243. Calculate Digit Sum of a String

**Difficulty:** Easy
**Category:** String, Simulation

## Problem

You are given a string `s` consisting of digits and an integer `k`. Repeatedly perform the following operation until `s` has length at most `k`:
1. Divide `s` into consecutive groups of size `k` (the last group may be smaller).
2. Replace each group with the sum of its digits.
3. Concatenate the results to form a new string.

Return the final string after all operations.

### Example

```
Input: s = "11111222223", k = 3
Output: "135"
Explanation:
- First round: "111", "112", "222", "23" → "3", "4", "6", "5" → "3465"
- Second round: "346", "5" → "13", "5" → "135"
- Length is 3, which is ≤ k, so we stop.
```

## Approach

Simulate the process: repeatedly split the string into chunks of size `k`, compute the digit sum for each chunk, concatenate them, and check if the length is at most `k`.

## C# Solution

```csharp
public class Solution
{
    public string DigitSum(string s, int k)
    {
        while (s.Length > k)
        {
            StringBuilder sb = new StringBuilder();
            
            for (int i = 0; i < s.Length; i += k)
            {
                int sum = 0;
                for (int j = i; j < Math.Min(i + k, s.Length); j++)
                {
                    sum += s[j] - '0';
                }
                sb.Append(sum);
            }
            
            s = sb.ToString();
        }
        
        return s;
    }
}
```

## Complexity

- **Time:** O(n log n) where n is the initial length.
- **Space:** O(n) for building new strings.
