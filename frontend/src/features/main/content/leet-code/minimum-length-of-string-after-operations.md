# 3223. Minimum Length of String After Operations

**Difficulty:** Medium
**Category:** Counting, Hash Table, String

## Problem
Given a string, you may repeatedly perform an operation: choose an index and delete the closest occurrence of the same character to its left and the closest occurrence of the same character to its right (both must exist for the operation to be valid, and both are removed along with performing the operation on the chosen index conceptually, though the net effect is reducing pairs). Return the minimum possible length of the string after performing any number of such operations.

## Approach
For any character that appears in the string, if it appears an odd number of times, exactly 1 occurrence of it must remain irreducibly (since operations remove occurrences in pairs relative to a chosen instance, effectively reducing the count by 2 each valid operation); if it appears an even number of times, all of them can be paired down but not entirely eliminated in this problem's specific operation semantics — a careful accounting shows that any character with a positive count contributes exactly 1 to the final length if its count is odd, and exactly 2 if its count is even (since the operation removes pairs around a chosen occurrence but always leaves 2 remaining when starting from an even count, and 1 remaining when starting from an odd count). Count occurrences of each of the 26 lowercase letters, and for every letter with a nonzero count, add 1 if its count is odd, or 2 if its count is even.

## C# Solution
```csharp
public class Solution {
    public int MinimumLength(string s) {
        int[] count = new int[26];
        foreach (char c in s)
            count[c - 'a']++;

        int ans = 0;
        for (int i = 0; i < 26; i++)
            if (count[i] > 0)
                ans += count[i] % 2 == 0 ? 2 : 1;

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1), bounded by 26 letters
