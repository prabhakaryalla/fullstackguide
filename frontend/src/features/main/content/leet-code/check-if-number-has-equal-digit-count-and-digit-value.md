# 2283. Check if Number Has Equal Digit Count and Digit Value

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

You are given a 0-indexed string `num` of length `n` consisting of digits. Return `true` if for every index `i` in the range `0 <= i < n`, the digit `i` occurs exactly `num[i]` times in `num`, otherwise return `false`.

### Example

```
Input: num = "1210"
Output: true
Explanation:
- digit 0 appears 1 time (num[0] = '1') ✓
- digit 1 appears 2 times (num[1] = '2') ✓
- digit 2 appears 1 time (num[2] = '1') ✓
- digit 3 appears 0 times (num[3] = '0') ✓
```

## Approach

Count the frequency of each digit. Then check if for every index `i`, the expected count (from `num[i]`) matches the actual count of digit `i`.

## C# Solution

```csharp
public class Solution
{
    public bool DigitCount(string num)
    {
        int[] count = new int[10];
        
        foreach (char c in num)
        {
            count[c - '0']++;
        }
        
        for (int i = 0; i < num.Length; i++)
        {
            if (count[i] != (num[i] - '0'))
            {
                return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1) since we only track 10 digits.
