# 3630. Partition Array for Maximum XOR and AND

**Difficulty:** Hard
**Category:** Array, Math, Greedy, Bit Manipulation, Enumeration

## Problem
You are given an integer array `nums`. Partition the array into three (possibly empty) subsequences `A`, `B`, and `C` such that every element belongs to exactly one subsequence. Maximize `XOR(A) + AND(B) + XOR(C)`, where `XOR` and `AND` of an empty subsequence are defined as 0.

Return the maximum achievable value.

### Example
Input: `nums = [2,3,6,7]`
Output: `15`
Explanation: `A = [7]` (XOR = 7), `B = [2,3]` (AND = 2), `C = [6]` (XOR = 6). Total: `7 + 2 + 6 = 15`.

Constraints:
- `1 <= nums.length <= 19`
- `1 <= nums[i] <= 10^9`

## Approach
Brute-force every subset `B` (up to `2^19` subsets). For a fixed `B`, let `s` be the XOR of all elements **not** in `B`; those remaining elements are split between `A` and `C`, and since `XOR(A) XOR XOR(C) = s` always, if `x = XOR(A)` then `XOR(C) = s XOR x`. Using the identity `x + (s XOR x) = s + 2 * (x AND ~s)`, the goal becomes maximizing `x AND ~s` over every `x` achievable as an XOR of a subset of the remaining elements (i.e., every `x` in their linear XOR span).

Because ANDing with the fixed mask `~s` distributes over XOR, the achievable values of `x AND ~s` are exactly the span of `{e AND ~s : e is a remaining element}`. Build a linear XOR basis from these masked values, then greedily extract the maximum representable value from that basis. The candidate total for this `B` is `AND(B) + s + 2 * maxVal`, and the answer is the best candidate over all `2^n` subsets `B`.

## C# Solution

```csharp
public class Solution {
    public long MaximumValue(int[] nums) {
        int n = nums.Length;
        long best = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            long andB = 0;
            long s = 0;
            bool hasB = false;

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    andB = hasB ? (andB & nums[i]) : nums[i];
                    hasB = true;
                } else {
                    s ^= nums[i];
                }
            }

            long[] basis = new long[32];
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) continue;
                long v = nums[i] & ~s;
                for (int b = 31; b >= 0; b--) {
                    if (((v >> b) & 1) == 0) continue;
                    if (basis[b] == 0) {
                        basis[b] = v;
                        break;
                    }
                    v ^= basis[b];
                }
            }

            long maxVal = 0;
            for (int b = 31; b >= 0; b--) {
                if (basis[b] != 0 && (maxVal ^ basis[b]) > maxVal) {
                    maxVal ^= basis[b];
                }
            }

            long candidate = andB + s + 2 * maxVal;
            best = Math.Max(best, candidate);
        }

        return best;
    }
}
```

## Complexity

- **Time:** O(2^n * n * log(maxVal))
- **Space:** O(log(maxVal))
