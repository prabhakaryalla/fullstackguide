# 345. Reverse Vowels of a String

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `s`, reverse only the vowels of the string (both uppercase and lowercase) and return it.

### Example

```
Input: s = "leetcode"
Output: "leotcede"
```

### Constraints

- `1 <= s.length <= 3 * 10^5`
- `s` consists of printable ASCII characters.

## Approach

Use two pointers from both ends of the character array, advancing each pointer past consonants until both point at vowels, then swap those two vowels and continue moving inward.

## C# Solution

```csharp
public class Solution
{
    private static readonly HashSet<char> Vowels = new() { 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U' };

    public string ReverseVowels(string s)
    {
        var chars = s.ToCharArray();
        int left = 0, right = chars.Length - 1;

        while (left < right)
        {
            if (!Vowels.Contains(chars[left])) { left++; continue; }
            if (!Vowels.Contains(chars[right])) { right--; continue; }

            (chars[left], chars[right]) = (chars[right], chars[left]);
            left++;
            right--;
        }

        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the string.
- **Space:** `O(n)` for the character array copy.
