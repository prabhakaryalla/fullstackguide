# 3340. Check Balanced String

**Difficulty:** Easy
**Category:** String

## Problem

Given a string `num` of digits, return `true` if the sum of digits at even indices equals the sum of digits at odd indices, otherwise `false`.

### Example

Input: `num = "24123"`

Output: `true`

Explanation: `2 + 1 + 3 == 6` and `4 + 2 == 6`.

## Approach

Iterate through the string once, adding each digit to either an "even" or "odd" running total based on its index, then compare the two totals.

## C# Solution

```csharp
public class Solution 
{
    public bool IsBalanced(string num) 
    {
        int even = 0, odd = 0;
        for (int i = 0; i < num.Length; i++)
        {
            int d = num[i] - '0';
            if (i % 2 == 0) even += d;
            else odd += d;
        }
        return even == odd;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1).
