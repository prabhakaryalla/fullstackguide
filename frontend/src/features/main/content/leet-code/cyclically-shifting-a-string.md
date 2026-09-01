# 2765. Cyclically Shifting a String

**Difficulty:** Easy
**Category:** String

## Problem

You are given a string `s` and an integer `k`. Perform `k` cyclic shifts on the string, where in each shift, the last character moves to the beginning.

Return the resulting string after `k` shifts.

### Example

```
Input: s = "abc", k = 2
Output: "cab"
Explanation: After 1 shift: "cab", after 2 shifts: "bca"... wait, let me recalculate: 
After 1 shift (move last to front): "cab"
After 2 shifts: "bca" is wrong. Let me redo: "abc" -> "cab" -> "bca"... 
Actually: shift 1: last char 'c' moves front = "cab"
shift 2: last char 'b' moves front = "bca"
Hmm, the expected output doesn't match. Let me reconsider.
Actually on second thought: "abc" with last moving to front once: "cab". Twice: last of "cab" is 'b', moving to front: "bca". That's not "cab".

Let me restart: The problem likely means rotate right by k positions.
"abc" rotated right by 2: take last 2 chars "bc" and move to front but reversed or just moved? 
Standard right rotation by 2: "cab" if k=2 means s[-2:] + s[:-2] = "bc" + "a" = "bca"
But that doesn't match. Let me assume k=2 means 2 individual shifts.
Shift 1: "abc" -> "cab" (move 'c' to front)
Shift 2: "cab" -> "bca" (move 'b' to front)

So the example seems incorrect. I'll implement single-char cyclic shift and note the discrepancy.
```

## Approach

Perform `k` mod `n` shifts (since shifting by `n` returns to original). Each shift moves the last character to the front. We can optimize by computing `k % n` and then taking `s[n - (k % n):] + s[:n - (k % n)]`.

## C# Solution

```csharp
public class Solution
{
    public string CyclicShift(string s, int k)
    {
        int n = s.Length;
        k = k % n;
        
        return s.Substring(n - k) + s.Substring(0, n - k);
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the result string
