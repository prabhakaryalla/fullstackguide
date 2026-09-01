# 3378. Count Connected Components in LCM Graph

**Difficulty:** Hard
**Category:** Union Find, Number Theory, Graph

## Problem

Given `n` and `threshold`, build a graph on nodes `1..n` where an edge connects `i` and `j` if `lcm(i, j) <= threshold`. Return the number of connected components.

### Example

Nodes sharing a common multiple `L <= threshold` (both divide `L`) end up in the same component, since `lcm(i,j) <= L <= threshold`.

## Approach

For each value `L` from 1 to `threshold`, gather all divisors of `L` that are `<= n` and union them together (any two divisors of `L` have `lcm <= L <= threshold`). Use Union-Find with union-by-rank/path compression; finally count distinct roots among nodes `1..n`.

## C# Solution

```csharp
public class Solution 
{
    private int[] parent;

    public int CountComponents(int n, int threshold) 
    {
        parent = new int[n + 1];
        for (int i = 0; i <= n; i++) parent[i] = i;

        for (int l = 1; l <= threshold; l++) 
        {
            int prevDivisor = -1;
            for (int d = 1; d * d <= l; d++) 
            {
                if (l % d != 0) continue;
                CheckUnion(ref prevDivisor, d, n);
                int other = l / d;
                if (other != d) CheckUnion(ref prevDivisor, other, n);
            }
        }

        int count = 0;
        for (int i = 1; i <= n; i++)
            if (Find(i) == i) count++;
        return count;
    }

    private void CheckUnion(ref int prevDivisor, int d, int n) 
    {
        if (d > n) return;
        if (prevDivisor != -1) Union(prevDivisor, d);
        prevDivisor = d;
    }

    private int Find(int x) 
    {
        while (parent[x] != x) 
        {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void Union(int a, int b) 
    {
        int ra = Find(a), rb = Find(b);
        if (ra != rb) parent[ra] = rb;
    }
}
```

## Complexity

- **Time:** O(threshold * sqrt(threshold) * α(n))
- **Space:** O(n)
