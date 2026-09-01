# 914. X of a Kind in a Deck of Cards

**Difficulty:** Easy
**Category:** Array, Hash Table, Math, Counting, Number Theory

## Problem

Given an array `deck` of card integers, return `true` if you can choose an integer `x >= 2` such that every group of `x` cards you deal has all cards of the same value (grouping partitions the whole deck).

### Example

```
Input: deck = [1,2,3,4,4,3,2,1]
Output: true
Explanation: Groups of size 2 work, e.g. [1,1],[2,2],[3,3],[4,4].
```

## Approach

Count occurrences of each value. Any valid `x` must divide every one of those counts, so the answer is `true` exactly when the greatest common divisor of all counts is `>= 2`.

## C# Solution

```csharp
public class Solution
{
    public bool HasGroupsSizeX(int[] deck)
    {
        var count = new Dictionary<int, int>();
        foreach (var d in deck) count[d] = count.GetValueOrDefault(d) + 1;

        int g = 0;
        foreach (var c in count.Values) g = Gcd(g, c);

        return g >= 2;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the frequency map.
