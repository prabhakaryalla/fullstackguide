# 1998. GCD Sort of an Array

**Difficulty:** Hard
**Category:** Array, Math, Union Find, Number Theory

## Problem

Given an integer array `nums`, you may swap `nums[i]` and `nums[j]` any number of times if `gcd(nums[i], nums[j]) > 1`. Return `true` if it is possible to sort the array in non-decreasing order using such swaps.

### Example

```
Input: nums = [7,21,3]
Output: true
Explanation: 21 and 3 share factor 3 (swappable), and 21 and 7 share factor 7 (swappable), connecting all three indirectly.
```

### Constraints

- `1 <= nums.length <= 3 * 10^4`
- `2 <= nums[i] <= 10^5`

## Approach

Two values can be swapped (possibly transitively through other values) if and only if they share a common prime factor, directly or via a chain of shared prime factors — so union-find each value with each of its prime factors (using primes as "virtual nodes" alongside value indices, unioning a number with each prime that divides it links all numbers sharing any prime together). After building this union-find over `[0, maxValue]` (using each value itself as a proxy since factoring each value into primes and unioning via the smallest prime factor works too), sort a copy of `nums`; the array can be fully sorted if and only if every position `i` in the original array has `nums[i]` and `sortedNums[i]` in the same connected component (they must be swappable to reach that position).

## C# Solution

```csharp
public class Solution
{
    private int[] _parent;

    public bool GcdSort(int[] nums)
    {
        int maxVal = nums.Max();
        _parent = new int[maxVal + 1];
        for (int i = 0; i <= maxVal; i++) _parent[i] = i;

        var smallestPrimeFactor = new int[maxVal + 1];
        for (int i = 2; i <= maxVal; i++)
        {
            if (smallestPrimeFactor[i] != 0) continue;
            for (int j = i; j <= maxVal; j += i)
            {
                if (smallestPrimeFactor[j] == 0) smallestPrimeFactor[j] = i;
            }
        }

        foreach (int num in nums)
        {
            int value = num;
            while (value > 1)
            {
                int prime = smallestPrimeFactor[value];
                Union(num, prime);
                while (value % prime == 0) value /= prime;
            }
        }

        var sorted = (int[])nums.Clone();
        Array.Sort(sorted);

        for (int i = 0; i < nums.Length; i++)
        {
            if (Find(nums[i]) != Find(sorted[i]))
            {
                return false;
            }
        }

        return true;
    }

    private int Find(int x)
    {
        if (_parent[x] != x)
        {
            _parent[x] = Find(_parent[x]);
        }
        return _parent[x];
    }

    private void Union(int a, int b)
    {
        int rootA = Find(a), rootB = Find(b);
        if (rootA != rootB)
        {
            _parent[rootA] = rootB;
        }
    }
}
```

## Complexity

- **Time:** `O((n + maxVal) log(maxVal) * alpha(maxVal))` — sieve construction plus union-find operations with path compression.
- **Space:** `O(maxVal)` for the parent and smallest-prime-factor arrays.
