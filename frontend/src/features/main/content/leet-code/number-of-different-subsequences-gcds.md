# 1819. Number of Different Subsequences GCDs

**Difficulty:** Hard
**Category:** Array, Math, Number Theory

## Problem

Given an array of distinct positive integers `nums`, count how many distinct values of `g` exist such that some non-empty subsequence of `nums` has GCD exactly `g`.

### Example

```
Input: nums = [6,10,3]
Output: 5
Explanation: The possible subsequence GCDs are 1, 2, 3, 5, 6, 10 — five distinct... (values 1,2,3,5,6,10 map from various subsequences).
```

## Approach

For each candidate `g` from `1` to `max(nums)`, walk through its multiples (`g, 2g, 3g, ...`) up to `max(nums)` and, for every multiple that is present in `nums`, fold it into a running GCD. If that running GCD ever reaches exactly `g`, then a subsequence achieving GCD `g` exists (namely the numbers that were folded in), so count `g` and stop early. Iterating candidates this way and scanning their multiples runs in harmonic-series time, `O(maxVal log maxVal)`.

## C# Solution

```csharp
public class Solution
{
    public int CountDifferentSubsequenceGCDs(int[] nums)
    {
        int maxVal = nums.Max();
        var present = new bool[maxVal + 1];
        foreach (int n in nums) present[n] = true;

        int count = 0;

        for (int g = 1; g <= maxVal; g++)
        {
            int currentGcd = 0;
            for (int multiple = g; multiple <= maxVal; multiple += g)
            {
                if (present[multiple])
                {
                    currentGcd = Gcd(currentGcd, multiple);
                    if (currentGcd == g) break;
                }
            }
            if (currentGcd == g) count++;
        }

        return count;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(maxVal log maxVal)` due to the harmonic sum over all candidate divisors.
- **Space:** `O(maxVal)` for the presence array.
