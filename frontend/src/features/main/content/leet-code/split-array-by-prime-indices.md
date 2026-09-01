# 3618. Split Array by Prime Indices

**Difficulty:** Medium
**Category:** Array, Math, Number Theory

## Problem
You are given an integer array `nums`. Split `nums` into two arrays `A` and `B`:
- Elements at prime indices go into `A`.
- All other elements go into `B`.

Return `|sum(A) - sum(B)|`. An empty array has a sum of 0.

### Example
Input: `nums = [2,3,4]`
Output: `1`
Explanation: Index 2 is the only prime index, so `A = [4]` and `B = [2,3]`. `|4 - 5| = 1`.

Constraints:
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Approach
Use a sieve of Eratosthenes to mark which indices (0-indexed) are prime. Then sum the elements at prime indices into `sumA` and the rest into `sumB`, and return the absolute difference.

## C# Solution

```csharp
public class Solution {
    public long SplitArray(int[] nums) {
        int n = nums.Length;
        bool[] isComposite = new bool[n];
        if (n > 0) isComposite[0] = true;
        if (n > 1) isComposite[1] = true;

        for (long i = 2; i * i < n; i++) {
            if (!isComposite[i]) {
                for (long j = i * i; j < n; j += i) {
                    isComposite[j] = true;
                }
            }
        }

        long sumA = 0, sumB = 0;
        for (int i = 0; i < n; i++) {
            if (i >= 2 && !isComposite[i]) {
                sumA += nums[i];
            } else {
                sumB += nums[i];
            }
        }

        return Math.Abs(sumA - sumB);
    }
}
```

## Complexity

- **Time:** O(n log log n)
- **Space:** O(n)
