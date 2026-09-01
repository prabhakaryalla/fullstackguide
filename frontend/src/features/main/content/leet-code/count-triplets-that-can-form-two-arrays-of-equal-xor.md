# 1442. Count Triplets That Can Form Two Arrays of Equal XOR

**Difficulty:** Medium
**Category:** Array, Math, Bit Manipulation, Prefix Sum

## Problem

Given an array `arr`, count the number of triplets `(i, j, k)` with `0 <= i < j <= k < arr.length` such that the XOR of `arr[i..j-1]` equals the XOR of `arr[j..k]`.

### Example

```
Input: arr = [2,3,1,6,7]
Output: 4
```

## Approach

The XOR of `arr[i..j-1]` equals the XOR of `arr[j..k]` exactly when the XOR of the whole range `arr[i..k]` is `0` (since XOR-ing two equal values cancels to zero). Whenever the running XOR from a starting index `i` returns to `0` at some ending index `k`, every split point `j` strictly between `i` and `k` produces a valid pair of equal-XOR halves, contributing `k - i` triplets. Enumerate all `(i, k)` pairs directly, since `arr.length <= 300` keeps the quadratic approach fast.

## C# Solution

```csharp
public class Solution
{
    public int CountTriplets(int[] arr)
    {
        int n = arr.Length;
        int count = 0;

        for (int i = 0; i < n; i++)
        {
            int xorVal = 0;
            for (int k = i; k < n; k++)
            {
                xorVal ^= arr[k];
                if (xorVal == 0) count += k - i;
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)`.
