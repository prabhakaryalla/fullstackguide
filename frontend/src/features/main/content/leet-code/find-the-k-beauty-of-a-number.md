# 2269. Find the K-Beauty of a Number

**Difficulty:** Easy
**Category:** Math, String, Sliding Window

## Problem

The k-beauty of an integer `num` is defined as the number of substrings of `num` when it is read as a string that meet the following conditions:
- It has a length of `k`.
- It is a divisor of `num`.

Given integers `num` and `k`, return the k-beauty of `num`.

### Example

```
Input: num = 240, k = 2
Output: 2
Explanation: Substrings of "240" with length 2: "24", "40".
- 24 divides 240 ✓
- 40 divides 240 ✓
Answer: 2
```

## Approach

Extract all substrings of length `k`, convert each to an integer, and check if it divides `num` (and is not zero). Count how many satisfy both conditions.

## C# Solution

```csharp
public class Solution
{
    public int DivisorSubstrings(int num, int k)
    {
        string s = num.ToString();
        int count = 0;
        
        for (int i = 0; i <= s.Length - k; i++)
        {
            int sub = int.Parse(s.Substring(i, k));
            if (sub != 0 && num % sub == 0)
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of digits.
- **Space:** O(1).
