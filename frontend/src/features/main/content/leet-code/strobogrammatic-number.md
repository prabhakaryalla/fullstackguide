# 246. Strobogrammatic Number

**Difficulty:** Easy
**Category:** Hash Table, Two Pointers, String

## Problem

A strobogrammatic number is a number that looks the same when rotated 180 degrees (viewed upside down). Given a string `num`, return `true` if it is a strobogrammatic number.

### Example

```
Input: num = "69"
Output: true
```

### Constraints

- `1 <= num.length <= 50`
- `num` consists only of digits, and may contain leading zeros.

## Approach

Only the digits `0`, `1`, `6`, `8`, `9` remain valid digits when rotated, and each maps to a specific counterpart (`6` <-> `9`, others map to themselves). Use two pointers from both ends, verifying that the digit at the left pointer, when rotated, equals the digit at the right pointer.

## C# Solution

```csharp
public class Solution
{
    public bool IsStrobogrammatic(string num)
    {
        var rotation = new Dictionary<char, char>
        {
            ['0'] = '0', ['1'] = '1', ['6'] = '9', ['8'] = '8', ['9'] = '6'
        };

        int left = 0, right = num.Length - 1;
        while (left <= right)
        {
            if (!rotation.TryGetValue(num[left], out var rotated) || rotated != num[right])
                return false;

            left++;
            right--;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass with two pointers.
- **Space:** `O(1)`.
