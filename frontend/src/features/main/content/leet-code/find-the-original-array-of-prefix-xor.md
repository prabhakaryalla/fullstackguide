# 2433. Find The Original Array of Prefix Xor

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

You are given an integer array `pref` of size `n`. Find and return the array `arr` of size `n` that satisfies:

- `pref[i] = arr[0] ^ arr[1] ^ ... ^ arr[i]`

Note that `^` denotes the bitwise XOR operation. It can be proven that the answer is unique.

### Example

```
Input: pref = [5,2,0,3,1]
Output: [5,7,2,3,2]
Explanation: From the array [5,7,2,3,2] we have:
- pref[0] = 5.
- pref[1] = 5 ^ 7 = 2.
- pref[2] = 5 ^ 7 ^ 2 = 0.
- pref[3] = 5 ^ 7 ^ 2 ^ 3 = 3.
- pref[4] = 5 ^ 7 ^ 2 ^ 3 ^ 2 = 1.
```

## Approach

Since `pref[i] = arr[0] ^ arr[1] ^ ... ^ arr[i]` and `pref[i-1] = arr[0] ^ arr[1] ^ ... ^ arr[i-1]`, we can derive that `arr[i] = pref[i] ^ pref[i-1]` for `i > 0`. The first element `arr[0] = pref[0]`. Use the property that XOR is self-inverse.

## C# Solution

```csharp
public class Solution
{
    public int[] FindArray(int[] pref)
    {
        int n = pref.Length;
        int[] arr = new int[n];
        arr[0] = pref[0];
        
        for (int i = 1; i < n; i++)
        {
            arr[i] = pref[i] ^ pref[i - 1];
        }
        
        return arr;
    }
}
```

## Complexity

- **Time:** O(n) — single pass through the array
- **Space:** O(1) — excluding the output array
