# 3216. Lexicographically Smallest String After a Swap

**Difficulty:** Easy
**Category:** Greedy, String

## Problem
Given a string of digits, you may perform at most one swap of two adjacent digits, but only if both digits have the same parity (both even or both odd). Return the lexicographically smallest string achievable.

## Approach
Scan through the string from left to right looking for the first position where swapping the current character with the previous one would produce a smaller string: specifically, where the previous and current characters share the same parity, and the previous character is numerically larger than the current one. As soon as such a position is found, perform that single swap and stop immediately (since further swaps could only be suboptimal given the single-swap constraint, and this greedy leftmost-improving swap yields the lexicographically smallest result).

## C# Solution
```csharp
public class Solution {
    public string GetSmallestString(string s) {
        char[] arr = s.ToCharArray();
        for (int i = 1; i < arr.Length; i++) {
            if ((arr[i - 1] - '0') % 2 == (arr[i] - '0') % 2 && arr[i - 1] > arr[i]) {
                (arr[i - 1], arr[i]) = (arr[i], arr[i - 1]);
                break;
            }
        }
        return new string(arr);
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n) for the character array
