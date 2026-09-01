# 3334. Find the Maximum Factor Score of Array

**Difficulty:** Medium
**Category:** Array, Math, Number Theory, Least Common Multiple

## Problem

The factor score of an array is the product of the LCM and GCD of all its elements (both LCM and GCD of a single element are the element itself; the factor score of an empty array is 0).

Return the maximum factor score of `nums` after removing **at most one** element.

### Example

Input: `nums = [2,4,8,16]`

Output: `64`

Explanation: Removing 2 leaves GCD 4 and LCM 16, giving a factor score of 64.

## Approach

Compute prefix GCD/LCM arrays and suffix GCD/LCM arrays over `nums`. The baseline candidate (removing nothing) is `gcd(all) * lcm(all)`.

For each index `i`, the GCD/LCM of the array excluding index `i` can be derived in O(1) by combining `prefix[i-1]` with `suffix[i+1]` (using only the prefix if `i` is the last index, or only the suffix if `i` is the first). Track the maximum factor score across the baseline and every single-removal candidate.

## C# Solution

```csharp
public class Solution 
{
    public long MaxScore(int[] nums) 
    {
        int n = nums.Length;
        long[] prefixGcd = new long[n];
        long[] prefixLcm = new long[n];
        long[] suffixGcd = new long[n];
        long[] suffixLcm = new long[n];

        prefixGcd[0] = nums[0];
        prefixLcm[0] = nums[0];
        for (int i = 1; i < n; i++)
        {
            prefixGcd[i] = Gcd(prefixGcd[i - 1], nums[i]);
            prefixLcm[i] = Lcm(prefixLcm[i - 1], nums[i]);
        }

        suffixGcd[n - 1] = nums[n - 1];
        suffixLcm[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--)
        {
            suffixGcd[i] = Gcd(suffixGcd[i + 1], nums[i]);
            suffixLcm[i] = Lcm(suffixLcm[i + 1], nums[i]);
        }

        long best = prefixGcd[n - 1] * prefixLcm[n - 1];

        for (int i = 0; i < n; i++)
        {
            long g, l;
            if (i == 0)
            {
                if (n == 1) continue;
                g = suffixGcd[1];
                l = suffixLcm[1];
            }
            else if (i == n - 1)
            {
                g = prefixGcd[n - 2];
                l = prefixLcm[n - 2];
            }
            else
            {
                g = Gcd(prefixGcd[i - 1], suffixGcd[i + 1]);
                l = Lcm(prefixLcm[i - 1], suffixLcm[i + 1]);
            }

            long score = g * l;
            if (score > best) best = score;
        }

        return best;
    }

    private long Gcd(long a, long b) => b == 0 ? a : Gcd(b, a % b);

    private long Lcm(long a, long b) => a / Gcd(a, b) * b;
}
```

## Complexity

- **Time:** O(n) for building prefix/suffix arrays plus O(n log(maxVal)) for the GCD calls.
- **Space:** O(n) for the prefix/suffix arrays.
