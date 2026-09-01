# 2408. Split Message Based on Limit

**Difficulty:** Hard
**Category:** String, Binary Search

## Problem

You are given a string `message` and a positive integer `limit`. You must split `message` into one or more parts based on `limit`. Each resulting part should have the suffix `"<a/b>"`, where `"b"` is the total number of parts and `"a"` is the part number (1-indexed).

Each part's length must not exceed `limit`, including the suffix. Return an array of strings representing the parts in order. If it's impossible to split the message, return an empty array.

### Example

```
Input: message = "this is really a very awesome message", limit = 9
Output: ["thi<1/14>","s i<2/14>","s r<3/14>","eal<4/14>","ly <5/14>","a v<6/14>","ery<7/14>"," aw<8/14>","eso<9/14>","me<10/14>"," m<11/14>","es<12/14>","sa<13/14>","ge<14/14>"]
```

## Approach

Use binary search on the number of parts. For each candidate, calculate how much space the suffix takes and whether the message can fit. Once we find the minimum valid number of parts, distribute the message characters across them.

## C# Solution

```csharp
public class Solution
{
    public string[] SplitMessage(string message, int limit)
    {
        int n = message.Length;
        
        for (int parts = 1; parts <= n; parts++)
        {
            int bLen = parts.ToString().Length;
            int totalSuffixLen = 0;
            int currentParts = parts;
            
            for (int digits = 1; digits <= bLen; digits++)
            {
                int count = digits == bLen ? parts - (int)Math.Pow(10, digits - 1) + 1 : (int)Math.Pow(10, digits) - (int)Math.Pow(10, digits - 1);
                totalSuffixLen += count * (digits + bLen + 3);
            }
            
            int availableSpace = limit * parts - totalSuffixLen;
            
            if (availableSpace >= n && limit >= bLen + 5)
            {
                var result = new List<string>();
                int idx = 0;
                
                for (int i = 1; i <= parts; i++)
                {
                    string suffix = $"<{i}/{parts}>";
                    int space = limit - suffix.Length;
                    int len = Math.Min(space, n - idx);
                    result.Add(message.Substring(idx, len) + suffix);
                    idx += len;
                }
                
                return result.ToArray();
            }
        }
        
        return new string[0];
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the message
- **Space:** O(n) for the result
