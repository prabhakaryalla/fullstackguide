# 3266. Final Array State After K Multiplication Operations II

**Difficulty:** Hard
**Category:** Array, Heap (Priority Queue), Math, Simulation, Binary Search

## Problem
You are given an integer array `nums`, an integer `k`, and an integer `multiplier`. In one operation, find the smallest value in `nums` (breaking ties by the leftmost occurrence) and multiply it by `multiplier`. Perform this operation exactly `k` times, then return the final array, with every value taken modulo `10^9 + 7`.

Unlike the easier version of this problem, `k` can be as large as `10^15`, `nums.length` up to `10^5`, and `nums[i]`/`multiplier` up to `10^9` and `10^5` respectively — far too large to simulate one operation at a time.

## Approach
If `multiplier` is `1`, the array never changes, so return it directly.

Otherwise, note that the heap always multiplies the current minimum, so after enough operations the smallest and largest values converge to within a factor of `multiplier` of each other; from that point on, every element is "due" for roughly the same number of future multiplications. Exploit this in two phases:

1. **Phase 1 (exact simulation):** Use a min-heap of `(value, originalIndex)` pairs and simulate operations one at a time using exact (unmodded) `long` arithmetic, stopping as soon as continuing would risk overflow (i.e. the current minimum times `multiplier` would exceed a safe threshold). This naturally happens after at most `O(n log(max/min))` operations.
2. **Phase 2 (bulk math):** For the remaining operations, drain the heap (now sorted by true value) and distribute the remaining `k` operations round-robin: the smallest `k % n` values get one extra multiplication compared to the rest. Compute each element's final value with modular exponentiation (`multiplier^exponent mod (10^9+7)`).

## C# Solution

```csharp
public class Solution 
{
    private const long MOD = 1_000_000_007;

    public int[] GetFinalState(int[] nums, long k, int multiplier) 
    {
        int n = nums.Length;

        if (multiplier == 1) 
        {
            return nums;
        }

        var heap = new PriorityQueue<(long val, int idx), (long, int)>();
        for (int i = 0; i < n; i++) 
        {
            heap.Enqueue((nums[i], i), (nums[i], i));
        }

        const long SafeLimit = (long)4e18;

        // Phase 1: simulate exactly while values stay small enough to avoid overflow.
        while (k > 0) 
        {
            var (val, idx) = heap.Peek();
            if (val > SafeLimit / multiplier) 
            {
                break;
            }

            heap.Dequeue();
            long newVal = val * multiplier;
            heap.Enqueue((newVal, idx), (newVal, idx));
            k--;
        }

        // Drain the heap; the extraction order reflects true ascending value order.
        var extracted = new List<(long val, int idx)>(n);
        while (heap.Count > 0) 
        {
            extracted.Add(heap.Dequeue());
        }

        if (k > 0) 
        {
            // Phase 2: remaining operations distribute evenly (round-robin) over the sorted values.
            long q = k / n;
            long r = k % n;

            for (int pos = 0; pos < n; pos++) 
            {
                long exponent = q + (pos < r ? 1 : 0);
                long baseVal = extracted[pos].val % MOD;
                long factor = ModPow(multiplier, exponent, MOD);
                extracted[pos] = (baseVal * factor % MOD, extracted[pos].idx);
            }
        }

        int[] result = new int[n];
        foreach (var (val, idx) in extracted) 
        {
            result[idx] = (int)(val % MOD);
        }

        return result;
    }

    private long ModPow(long b, long e, long mod) 
    {
        b %= mod;
        long result = 1;

        while (e > 0) 
        {
            if ((e & 1) == 1) 
            {
                result = result * b % mod;
            }
            b = b * b % mod;
            e >>= 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n log(max/min) * log n) for Phase 1 (heap operations), plus O(n log k) for the modular exponentiations in Phase 2.
- **Space:** O(n) for the heap and extracted list.
