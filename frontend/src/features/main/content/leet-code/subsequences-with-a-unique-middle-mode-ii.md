# 3416. Subsequences with a Unique Middle Mode II

**Difficulty:** Hard
**Category:** Array, Hash Table, Math, Combinatorics
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given an integer array `nums`, count the number of length-5 subsequences (indices `i0 < i1 < i2 < i3 < i4`) such that the middle element (the one at position `i2`) is the **unique mode** of the 5 chosen values — i.e., it appears strictly more often than every other value among the 5. Return the count modulo `1_000_000_007`.

## Approach
Fix the middle index `i` with value `v = nums[i]`. We must choose 2 elements from the left part (`nums[0..i-1]`) and 2 from the right part (`nums[i+1..n-1]`). Let `k` be how many of those 4 chosen elements equal `v`; the total occurrence count of `v` in the subsequence is `k + 1`.

- `k = 4` or `k = 3`: always a unique mode (the remaining 0 or 1 non-`v` picks can never tie).
- `k = 2`: total count of `v` is 3; the 2 remaining non-`v` picks can contribute at most a tie of 2, so always valid.
- `k = 1`: total count of `v` is 2; the 3 remaining non-`v` picks must be **pairwise distinct** in value, otherwise some other value reaches count 2 and ties.
- `k = 0`: total count of `v` is 1, which can never be a strict unique mode against the other 4 picks — skip.

For each `i`, maintain incrementally-updated frequency maps `leftFreq` / `rightFreq` (sliding the middle pointer left→right, moving `nums[i]` from the right map into the left map after processing it). Using `l = leftFreq[v]`, `r = rightFreq[v]`, `L = i`, `R = n-1-i`, `LNV = L-l`, `RNV = R-r`, each case reduces to combinatorial counting (`C(x,2)`, products of frequencies) summed with modular arithmetic. The `k = 1` case additionally requires, for each candidate "extra" value `x`, counting right-side (or left-side) pairs of distinct values that avoid `x` — computed via a distinct-value-pair total minus a per-value cross term.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;

    public int SubsequencesWithMiddleMode(int[] nums) 
    {
        int n = nums.Length;
        if (n < 5) return 0;

        var rightFreq = new Dictionary<int, long>();
        foreach (var x in nums) 
        {
            rightFreq[x] = rightFreq.GetValueOrDefault(x) + 1;
        }

        var leftFreq = new Dictionary<int, long>();
        long answer = 0;

        for (int i = 0; i < n; i++) 
        {
            int v = nums[i];
            rightFreq[v]--;
            if (rightFreq[v] == 0) rightFreq.Remove(v);

            long L = i;
            long R = n - 1 - i;
            long l = leftFreq.GetValueOrDefault(v);
            long r = rightFreq.GetValueOrDefault(v);
            long lnv = L - l;
            long rnv = R - r;

            // k = 4 and k = 3: unconditionally valid.
            answer = (answer + C2(l) * C2(r)) % MOD;
            answer = (answer + C2(l) * (r * rnv % MOD)) % MOD;
            answer = (answer + (l * lnv % MOD) * C2(r)) % MOD;

            // k = 2: unconditionally valid.
            answer = (answer + C2(l) * C2(rnv)) % MOD;
            answer = (answer + (l * lnv % MOD) * (r * rnv % MOD)) % MOD;
            answer = (answer + C2(lnv) * C2(r)) % MOD;

            // k = 1: remaining 3 non-v picks must be pairwise distinct.
            long distinctPairsRight = DistinctValuePairs(rightFreq, v, rnv);
            long distinctPairsLeft = DistinctValuePairs(leftFreq, v, lnv);
            long crossViaRight = CrossSum(leftFreq, rightFreq, v, rnv);
            long crossViaLeft = CrossSum(rightFreq, leftFreq, v, lnv);

            long term1 = ((lnv % MOD) * distinctPairsRight - crossViaRight % MOD + MOD) % MOD;
            answer = (answer + l * term1) % MOD;

            long term2 = ((rnv % MOD) * distinctPairsLeft - crossViaLeft % MOD + MOD) % MOD;
            answer = (answer + r * term2) % MOD;

            leftFreq[v] = leftFreq.GetValueOrDefault(v) + 1;
        }

        return (int)(answer % MOD);
    }

    private static long C2(long x) => x >= 2 ? (x * (x - 1) / 2) % MOD : 0;

    // Number of unordered pairs of elements (excluding value `skip`) with different values.
    private static long DistinctValuePairs(Dictionary<int, long> freq, int skip, long total) 
    {
        long same = 0;
        foreach (var kvp in freq) 
        {
            if (kvp.Key == skip) continue;
            same = (same + C2(kvp.Value)) % MOD;
        }
        return ((C2(total) - same) % MOD + MOD) % MOD;
    }

    // Sum over values w != skip present in both maps: freqA[w] * freqB[w] * (totalB - freqB[w]).
    private static long CrossSum(Dictionary<int, long> freqA, Dictionary<int, long> freqB, int skip, long totalB) 
    {
        long sum = 0;
        foreach (var kvp in freqA) 
        {
            if (kvp.Key == skip) continue;
            if (!freqB.TryGetValue(kvp.Key, out long b)) continue;
            sum = (sum + (kvp.Value % MOD) * (b % MOD) % MOD * ((totalB - b) % MOD + MOD) % MOD) % MOD;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n²) in the worst case (each middle index re-scans the current distinct-value frequency maps); can be optimized to O(n log n) with Fenwick trees over value ranks.
- **Space:** O(n) for the frequency maps.
