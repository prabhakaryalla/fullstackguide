# 1238. Circular Permutation in Binary Representation

**Difficulty:** Medium
**Category:** Math, Backtracking, Bit Manipulation

## Problem

Given integers `n` and `start`, return a permutation `p` of the integers in `[0, 2^n - 1]` such that `p[0] == start`, and every pair of adjacent elements (including the wraparound pair `p[0]` and `p[last]`) differ in exactly one bit.

### Example

```
Input: n = 2, start = 3
Output: [3,2,0,1]
```

## Approach

The classic reflected binary Gray code sequence `g[i] = i XOR (i >> 1)` for `i` in `[0, 2^n - 1]` already satisfies the adjacent-single-bit-difference property (including wraparound), with `g[0] = 0`. XOR-ing every element of a Gray code sequence by the same constant preserves that property, since XOR-ing two adjacent Gray values with the same constant doesn't change how many bits differ between them. So XOR-ing the whole sequence by `start` shifts the sequence's starting point to `start` (because `g[0] XOR start = start`) while keeping it a valid circular Gray code.

## C# Solution

```csharp
public class Solution
{
    public IList<int> CircularPermutation(int n, int start)
    {
        var result = new List<int>();
        int size = 1 << n;

        for (int i = 0; i < size; i++)
            result.Add((i ^ (i >> 1)) ^ start);

        return result;
    }
}
```

## Complexity

- **Time:** `O(2^n)`.
- **Space:** `O(2^n)` for the output.
