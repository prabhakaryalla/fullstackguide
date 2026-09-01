# 2709. Greatest Common Divisor Traversal

**Difficulty:** Hard
**Category:** Array, Math, Union Find, Number Theory

## Problem

You are given a 0-indexed integer array `nums`. Two indices `i` and `j` are said to be *connected* if `gcd(nums[i], nums[j]) > 1`. Determine whether, for every pair of indices `i` and `j` in the array, there exists a sequence of connected indices linking `i` to `j` (a traversal that moves only between indices whose values share a common factor greater than 1). Return `true` if every pair of indices is reachable from each other this way, otherwise return `false`.

### Example

Input: nums = [2,3,6]
Output: true
Explanation: 2 and 6 share the factor 2, and 6 and 3 share the factor 3, so index 0 can reach index 2, which can reach index 1. All indices are connected.

## Approach

Two indices are connected (directly or transitively) if their values share a prime factor. Factorize every number by trial division up to its square root and, for each prime factor found, union its index with the index of the last number seen that shared the same prime factor (tracked in a dictionary mapping prime -> index). After processing all numbers, check whether every index belongs to the same connected component using union-find (disjoint set union). If any number is `1`, it has no prime factors and stays isolated, which correctly makes the array non-traversable whenever there is more than one element.

## C# Solution

```csharp
public class Solution 
{
    private int[] parent;

    public bool CanTraverseAllPairs(int[] nums)
    {
        int n = nums.Length;
        if (n == 1)
        {
            return true;
        }

        parent = new int[n];
        for (int i = 0; i < n; i++)
        {
            parent[i] = i;
        }

        Dictionary<int, int> primeToNode = new Dictionary<int, int>();

        for (int i = 0; i < n; i++)
        {
            int value = nums[i];
            if (value == 1)
            {
                continue;
            }

            for (int p = 2; (long)p * p <= value; p++)
            {
                if (value % p == 0)
                {
                    if (primeToNode.TryGetValue(p, out int other))
                    {
                        Union(i, other);
                    }
                    else
                    {
                        primeToNode[p] = i;
                    }

                    while (value % p == 0)
                    {
                        value /= p;
                    }
                }
            }

            if (value > 1)
            {
                if (primeToNode.TryGetValue(value, out int other))
                {
                    Union(i, other);
                }
                else
                {
                    primeToNode[value] = i;
                }
            }
        }

        int root0 = Find(0);
        for (int i = 1; i < n; i++)
        {
            if (Find(i) != root0)
            {
                return false;
            }
        }

        return true;
    }

    private int Find(int x)
    {
        if (parent[x] != x)
        {
            parent[x] = Find(parent[x]);
        }
        return parent[x];
    }

    private void Union(int a, int b)
    {
        int ra = Find(a);
        int rb = Find(b);
        if (ra != rb)
        {
            parent[ra] = rb;
        }
    }
}
```

## Complexity

- **Time:** O(n * sqrt(max(nums))) for factorizing every number, plus nearly O(n) for the union-find operations.
- **Space:** O(n) for the union-find structure and the prime-to-index map.
