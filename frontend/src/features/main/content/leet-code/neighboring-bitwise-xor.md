# 2683. Neighboring Bitwise XOR

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

A 0-indexed array `derived` with length `n` is derived from another 0-indexed binary array `original` with length `n` using the following operation:

`derived[i] = original[i] XOR original[(i + 1) % n]`

Given an array `derived`, your task is to determine whether there exists a valid binary array `original` that could have formed `derived`.

Return `true` if such an array exists, or `false` otherwise.

### Example

```
Input: derived = [1,1,0]
Output: true
Explanation: A valid original array could be [0,1,0]:
derived[0] = 0 XOR 1 = 1
derived[1] = 1 XOR 0 = 1
derived[2] = 0 XOR 0 = 0

Input: derived = [1,1]
Output: true
Explanation: A valid original array could be [0,1]:
derived[0] = 0 XOR 1 = 1
derived[1] = 1 XOR 0 = 1

Input: derived = [1,0]
Output: false
```

## Approach

The key observation is that the XOR of all elements in `derived` must equal 0 for a valid `original` to exist. This is because each element in `original` appears exactly twice in the XOR chain (once at position i and once at position i-1), so they cancel out if the array is valid.

## C# Solution

```csharp
public class Solution
{
    public bool DoesValidArrayExist(int[] derived)
    {
        int xorSum = 0;
        
        foreach (int val in derived)
        {
            xorSum ^= val;
        }
        
        return xorSum == 0;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
