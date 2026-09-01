# 2264. Largest 3-Same-Digit Number in String

**Difficulty:** Easy
**Category:** String

## Problem

You are given a string `num` representing a large integer. Return the largest-valued odd-length substring of `num` that consists of exactly three identical digits, or an empty string if no such substring exists.

### Example

```
Input: num = "6777133339"
Output: "777"
Explanation: "777" and "333" and "999" are 3-same-digit substrings. "999" is largest.
Wait - let me re-check: "777" < "999", so "999" would be larger. But looking at input "6777133339", there's only "777" and "333". So "777" is largest.

Actually, the problem asks for the largest 3-same-digit substring. In "6777133339", we have "777" and "333". "777" > "333", so return "777".
```

## Approach

Scan through the string looking for three consecutive identical digits. Track the maximum such substring found.

## C# Solution

```csharp
public class Solution
{
    public string LargestGoodInteger(string num)
    {
        string max = "";
        
        for (int i = 0; i <= num.Length - 3; i++)
        {
            if (num[i] == num[i + 1] && num[i] == num[i + 2])
            {
                string candidate = num.Substring(i, 3);
                if (string.Compare(candidate, max) > 0)
                {
                    max = candidate;
                }
            }
        }
        
        return max;
    }
}
```

## Complexity

- **Time:** O(n).
- **Space:** O(1).
