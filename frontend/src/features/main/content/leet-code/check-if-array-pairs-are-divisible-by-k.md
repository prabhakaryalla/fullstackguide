# 1497. Check If Array Pairs Are Divisible by k

**Difficulty:** Medium
**Category:** Array, Hash Table, Counting

## Problem

Given an even-length integer array `arr` and an integer `k`, determine whether `arr` can be divided into pairs such that the sum of each pair is divisible by `k`.

### Example

```
Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
Output: true
```

## Approach

Count how many elements fall into each remainder class `0` to `k-1` (normalizing negative remainders into the same range). For two numbers to pair up with a sum divisible by `k`, their remainders must add up to `0` or `k`. This means: the count of remainder `0` must be even (they can only pair with each other), and for every other remainder `r`, the count of remainder `r` must exactly equal the count of remainder `k - r`. If `k` is even, the special case `r = k/2` must itself have an even count (since it can only pair with itself).

## C# Solution

```csharp
public class Solution
{
    public bool CanArrange(int[] arr, int k)
    {
        var count = new int[k];
        foreach (var x in arr)
        {
            int r = ((x % k) + k) % k;
            count[r]++;
        }

        if (count[0] % 2 != 0) return false;
        if (k % 2 == 0 && count[k / 2] % 2 != 0) return false;

        for (int r = 1; r < k - r; r++)
        {
            if (count[r] != count[k - r]) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n + k)`.
- **Space:** `O(k)` for the remainder counts.
