# 744. Find Smallest Letter Greater Than Target

**Difficulty:** Easy
**Category:** Array, Binary Search

## Problem

Given a sorted array of lowercase `letters` (which is circular — after the last letter comes the first again) and a `target` character, return the smallest letter strictly greater than `target`, wrapping around to the first letter if necessary.

### Example

```
Input: letters = ["c","f","j"], target = "a"
Output: "c"
```

## Approach

Binary search for the leftmost letter strictly greater than `target`. If every letter is `<= target`, the search converges to an index equal to the array length, so use modulo to wrap around to the first letter, correctly handling the circular requirement.

## C# Solution

```csharp
public class Solution
{
    public char NextGreatestLetter(char[] letters, char target)
    {
        int left = 0, right = letters.Length;

        while (left < right)
        {
            int mid = left + (right - left) / 2;

            if (letters[mid] <= target)
                left = mid + 1;
            else
                right = mid;
        }

        return letters[left % letters.Length];
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
