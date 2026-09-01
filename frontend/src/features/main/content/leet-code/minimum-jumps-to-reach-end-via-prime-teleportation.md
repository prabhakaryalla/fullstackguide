# 3629. Minimum Jumps to Reach End via Prime Teleportation

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Breadth-First Search, Number Theory

## Problem
You are given an integer array `nums` of length `n`. Starting at index 0, you want to reach index `n - 1`. From any index `i`, you may:
- Take an adjacent step to index `i - 1` or `i + 1`, if within bounds.
- If `nums[i]` is a prime number `p`, teleport instantly to any index `j != i` such that `nums[j] % p == 0`.

Return the minimum number of jumps required to reach index `n - 1`.

### Example
Input: `nums = [1,2,4,6]`
Output: `2`
Explanation: Move from index 0 to index 1 (adjacent step). At index 1, `nums[1] = 2` is prime, so teleport to index 3 since `nums[3] = 6` is divisible by 2. Total jumps: 2.

Constraints:
- `1 <= n <= 10^5`
- `1 <= nums[i] <= 10^6`

## Approach
Run a BFS over indices where each index has two kinds of edges: adjacent steps (`i - 1`, `i + 1`) and, if `nums[i]` is prime, an edge to every index divisible by that prime. Precompute, for each distinct prime `p`, the bucket of indices whose value is divisible by `p` (built by factorizing every `nums[j]` with a smallest-prime-factor sieve and adding `j` to the bucket of each of its distinct prime factors). During BFS, after visiting all indices in a prime's bucket once, clear that bucket so it is never re-scanned, which keeps the total BFS work bounded by the total number of prime factors across all values.

## C# Solution

```csharp
public class Solution {
    public int MinJumps(int[] nums) {
        const int MaxVal = 1_000_000;
        int[] spf = new int[MaxVal + 1];
        for (int i = 2; i <= MaxVal; i++) {
            if (spf[i] == 0) {
                for (int j = i; j <= MaxVal; j += i) {
                    if (spf[j] == 0) spf[j] = i;
                }
            }
        }

        int n = nums.Length;
        var buckets = new Dictionary<int, List<int>>();
        for (int j = 0; j < n; j++) {
            int x = nums[j];
            int last = -1;
            while (x > 1) {
                int p = spf[x];
                if (p != last) {
                    if (!buckets.TryGetValue(p, out var list)) {
                        list = new List<int>();
                        buckets[p] = list;
                    }
                    list.Add(j);
                    last = p;
                }
                while (x % p == 0) x /= p;
            }
        }

        int[] dist = new int[n];
        Array.Fill(dist, -1);
        dist[0] = 0;
        var queue = new Queue<int>();
        queue.Enqueue(0);

        while (queue.Count > 0) {
            int u = queue.Dequeue();
            if (u == n - 1) return dist[u];

            if (u - 1 >= 0 && dist[u - 1] == -1) {
                dist[u - 1] = dist[u] + 1;
                queue.Enqueue(u - 1);
            }
            if (u + 1 < n && dist[u + 1] == -1) {
                dist[u + 1] = dist[u] + 1;
                queue.Enqueue(u + 1);
            }

            int val = nums[u];
            bool isPrime = val >= 2 && spf[val] == val;
            if (isPrime && buckets.TryGetValue(val, out var indices)) {
                foreach (int idx in indices) {
                    if (dist[idx] == -1) {
                        dist[idx] = dist[u] + 1;
                        queue.Enqueue(idx);
                    }
                }
                buckets.Remove(val);
            }
        }

        return dist[n - 1];
    }
}
```

## Complexity

- **Time:** O(V + n log(maxVal)), where V is the sieve bound (10^6), due to precomputing prime factors for all values.
- **Space:** O(V + n log(maxVal))
