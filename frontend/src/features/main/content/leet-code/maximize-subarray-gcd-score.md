# 3574. Maximize Subarray GCD Score

**Difficulty:** Hard
**Category:** Array, Math, Enumeration, Number Theory

## Problem
You are given an array of positive integers `nums` and an integer `k`.

You may perform at most `k` operations. In each operation, you choose one element and double its value; each element can be doubled at most once.

The score of a contiguous subarray is the product of its length and the GCD of all its elements.

Return the maximum score achievable over any contiguous subarray of the modified array.

### Example

```
Input: nums = [2,4], k = 1
Output: 8
Explanation: Double nums[0] to 4. Array becomes [4,4]. GCD is 4, length is 2, score = 8.
```

```
Input: nums = [5,5,5], k = 1
Output: 15
Explanation: Doubling any element doesn't help (GCD would become 5 still, or drop). Score is 3 * 5 = 15.
```

**Constraints:**
- `1 <= n == nums.length <= 1500`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= n`

## Approach
Split each number into its odd part and its power of 2 (its count of trailing zero bits). Doubling a number never changes its odd part but increases its power-of-2 exponent by 1. For a fixed subarray, the final GCD equals `oddGcd * 2^finalMinExponent`, where `oddGcd` is the GCD of all odd parts (unaffected by doubling), and `finalMinExponent` is the minimum power-of-2 exponent across the subarray after optionally doubling some elements.

Since each element can be doubled **at most once**, if `c` elements share the current minimum exponent `m`, doubling all `c` of them raises the minimum by exactly one level to `m + 1` (as long as `c <= k`), but those elements can never be doubled again, so no further level-up is possible afterward. Thus the achievable exponent bump is binary: if `c <= k`, use `2^(m+1)`; otherwise use `2^m`.

Iterate over all subarrays, extending the right endpoint for each fixed left endpoint while maintaining a running odd-part GCD and the running minimum exponent with its count, giving an `O(n^2 log(max))` algorithm.

## C# Solution

```csharp
public class Solution 
{
    public long MaxGCDScore(int[] nums, int k) 
    {
        int n = nums.Length;
        long best = 0;

        for (int l = 0; l < n; l++)
        {
            long oddGcd = 0;
            int minExp = int.MaxValue;
            int cnt = 0;

            for (int r = l; r < n; r++)
            {
                int val = nums[r];
                int exp = 0;
                while (val % 2 == 0) { val /= 2; exp++; }
                int oddPart = val;

                oddGcd = Gcd(oddGcd, oddPart);

                if (exp < minExp) { minExp = exp; cnt = 1; }
                else if (exp == minExp) cnt++;

                long pow2 = cnt <= k ? (1L << (minExp + 1)) : (1L << minExp);
                long len = r - l + 1;
                long score = len * oddGcd * pow2;
                if (score > best) best = score;
            }
        }

        return best;
    }

    private long Gcd(long a, long b)
    {
        while (b != 0)
        {
            (a, b) = (b, a % b);
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n^2 log(max(nums))), for enumerating subarrays with incremental GCD.
- **Space:** O(1), excluding input/output.
