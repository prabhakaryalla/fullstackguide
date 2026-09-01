# 1916. Count Ways to Build Rooms in an Ant Colony

**Difficulty:** Hard
**Category:** Tree, Graph, Math, Dynamic Programming, Combinatorics

## Problem

There are `n` rooms labeled `0` to `n-1`. Room `0` is the base and has no prerequisite; each other room `i` has `prevRoom[i]`, the room that must be built before room `i` (forming a tree rooted at `0`). Return the number of distinct valid orders to build all rooms such that a room is built only after its prerequisite, modulo `10^9 + 7`.

### Example

```
Input: prevRoom = [-1,0,1]
Output: 1
Explanation: The only valid build order is 0, 1, 2.
```

### Constraints

- `n == prevRoom.length`
- `2 <= n <= 10^5`
- `prevRoom[0] == -1`
- `0 <= prevRoom[i] < n` for all `i != 0`
- The prerequisite graph forms a valid tree rooted at room 0.

## Approach

This is the classic "number of topological orderings of a tree" problem, solved bottom-up via a combinatorial formula: for a subtree rooted at `v` with size `s(v)`, the number of valid orderings is `(s(v) - 1)! / (product over children c of s(c)!)` multiplied by the product of each child's own ordering count. Compute subtree sizes and ordering counts post-order (children before parents), using precomputed factorials and modular inverses to divide modulo `10^9 + 7`.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;
    private List<int>[] _children;
    private long[] _factorial;
    private long[] _invFactorial;

    public int WaysToBuildRooms(int[] prevRoom)
    {
        int n = prevRoom.Length;
        _children = new List<int>[n];
        for (int i = 0; i < n; i++) _children[i] = new List<int>();
        for (int i = 1; i < n; i++) _children[prevRoom[i]].Add(i);

        _factorial = new long[n + 1];
        _invFactorial = new long[n + 1];
        _factorial[0] = 1;
        for (int i = 1; i <= n; i++) _factorial[i] = _factorial[i - 1] * i % Mod;
        _invFactorial[n] = ModPow(_factorial[n], Mod - 2, Mod);
        for (int i = n; i > 0; i--) _invFactorial[i - 1] = _invFactorial[i] * i % Mod;

        var (ways, _) = Dfs(0);
        return (int)ways;
    }

    private (long ways, long size) Dfs(int node)
    {
        long size = 1;
        long ways = 1;

        foreach (int child in _children[node])
        {
            var (childWays, childSize) = Dfs(child);
            ways = ways * childWays % Mod;
            ways = ways * _invFactorial[childSize] % Mod;
            size += childSize;
        }

        ways = ways * _factorial[size - 1] % Mod;
        return (ways, size);
    }

    private long ModPow(long baseValue, long exp, long mod)
    {
        long result = 1;
        baseValue %= mod;
        while (exp > 0)
        {
            if ((exp & 1) == 1) result = result * baseValue % mod;
            baseValue = baseValue * baseValue % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O(n log Mod)` — linear tree traversal plus a logarithmic modular exponentiation for the inverse factorial.
- **Space:** `O(n)` for the children lists and factorial tables.
