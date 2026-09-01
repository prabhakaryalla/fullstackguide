# 3621. Number of Integers With Popcount-Depth Equal to K I

**Difficulty:** Hard
**Category:** Bit Manipulation, Math, Memoization

## Problem

Define `popcount-depth(x)` recursively: if `x` has exactly one set bit (i.e. is a power of two), the depth is 0; otherwise it is `1 + popcount-depth(popcount(x))`, where `popcount(x)` is the number of set bits in `x`. Given integers `n` and `k`, count how many integers in `[1, n]` have `popcount-depth` equal to `k`.

### Example

For `n = 7`: depths are `1→0, 2→0, 3→1, 4→0, 5→1, 6→1, 7→2`. So for `k = 1` the answer is 3 (values 3, 5, 6).

## Approach

Since `popcount(x)` shrinks extremely fast (at most ~60 for 64-bit values), the recursion depth is tiny. Brute-force every integer from 1 to `n`, computing its depth recursively while memoizing depth-by-popcount-value results, and count matches for `k`.

## C# Solution

```csharp
public class Solution 
{
    private Dictionary<int, int> memo = new Dictionary<int, int>();

    public int PopcountDepth(int n, int k) 
    {
        int count = 0;
        for (int x = 1; x <= n; x++) 
        {
            if (Depth(x) == k) count++;
        }
        return count;
    }

    private int Depth(int x) 
    {
        int pc = System.Numerics.BitOperations.PopCount((uint)x);
        if (pc == 1) return 0;
        if (memo.TryGetValue(pc, out int cached)) return cached;
        int result = 1 + Depth(pc);
        memo[pc] = result;
        return result;
    }
}
```

## Complexity

- **Time:** O(n log log n)
- **Space:** O(log n) for the memo table
