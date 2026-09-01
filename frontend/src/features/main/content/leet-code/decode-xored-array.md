# 1720. Decode XORed Array

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

An integer array `arr` of even length was encoded as `encoded[i] = arr[i] XOR arr[i + 1]`. Given `encoded` and `first` (the value of `arr[0]`), return the original array `arr`.

### Example

```
Input: encoded = [1,2,3], first = 1
Output: [1,0,2,1]
```

## Approach

Since `encoded[i] = arr[i] XOR arr[i+1]`, it follows that `arr[i+1] = arr[i] XOR encoded[i]`. Reconstruct the array iteratively starting from `first`.

## C# Solution

```csharp
public class Solution
{
    public int[] Decode(int[] encoded, int first)
    {
        int[] arr = new int[encoded.Length + 1];
        arr[0] = first;
        for (int i = 0; i < encoded.Length; i++)
            arr[i + 1] = arr[i] ^ encoded[i];

        return arr;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output (excluding it, `O(1)` extra).
