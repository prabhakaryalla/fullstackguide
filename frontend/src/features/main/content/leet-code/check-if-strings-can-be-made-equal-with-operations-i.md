# 2821. Check if Strings Can Be Made Equal With Operations I

**Difficulty:** Easy
**Category:** String, Sorting

## Problem

You are given two strings s1 and s2, both of length 4. You can apply the following operation on either string any number of times:
- Choose two indices i and j such that j - i = 2, then swap the characters at positions i and j.

Return true if you can make s1 equal to s2, otherwise return false.

### Example

```
Input: s1 = "abcd", s2 = "cdab"
Output: true
Explanation: Apply the operation on s1 at indices (0, 2), getting "cbad"
Then apply at indices (1, 3), getting "cdab" which equals s2
```

## Approach

The key observation is that you can only swap characters at even indices with each other (positions 0 and 2), and characters at odd indices with each other (positions 1 and 3).

Therefore, the strings can be made equal if and only if:
- The sorted characters at even positions (0, 2) are the same in both strings
- The sorted characters at odd positions (1, 3) are the same in both strings

We can simply extract characters at even and odd positions, sort them, and compare.

## C# Solution

```csharp
public class Solution
{
    public bool CanBeEqual(string s1, string s2)
    {
        char[] even1 = new char[] { s1[0], s1[2] };
        char[] even2 = new char[] { s2[0], s2[2] };
        char[] odd1 = new char[] { s1[1], s1[3] };
        char[] odd2 = new char[] { s2[1], s2[3] };
        
        Array.Sort(even1);
        Array.Sort(even2);
        Array.Sort(odd1);
        Array.Sort(odd2);
        
        return even1[0] == even2[0] && even1[1] == even2[1] &&
               odd1[0] == odd2[0] && odd1[1] == odd2[1];
    }
}
```

## Complexity

- **Time:** O(1) since the string length is fixed at 4
- **Space:** O(1) for auxiliary arrays
