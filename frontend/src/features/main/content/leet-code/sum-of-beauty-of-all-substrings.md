# 1781. Sum of Beauty of All Substrings

**Difficulty:** Medium
**Category:** Hash Table, String, Prefix Sum, Counting

## Problem

The beauty of a string is the difference between the frequency of its most frequent character and its least frequent character. Given a string `s`, return the sum of beauty values over all of its substrings.

### Example

```
Input: s = "aabcb"
Output: 5
```

## Approach

For each starting index, extend the substring one character at a time while maintaining a running frequency count of the 26 lowercase letters. At each extension, scan the frequency array to find the current max and min non-zero counts and add their difference to the running total.

## C# Solution

```csharp
public class Solution
{
    public int BeautySum(string s)
    {
        int n = s.Length;
        int total = 0;

        for (int i = 0; i < n; i++)
        {
            int[] freq = new int[26];
            for (int j = i; j < n; j++)
            {
                freq[s[j] - 'a']++;

                int max = 0, min = int.MaxValue;
                foreach (int f in freq)
                {
                    if (f == 0) continue;
                    max = Math.Max(max, f);
                    min = Math.Min(min, f);
                }

                total += max - min;
            }
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n^2)` (each extension scans a fixed 26-entry array).
- **Space:** `O(1)` extra (fixed-size frequency array).
