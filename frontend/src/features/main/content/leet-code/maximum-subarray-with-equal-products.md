# 3411. Maximum Subarray With Equal Products

**Difficulty:** Easy
**Category:** Array, Math, Number Theory

## Problem

You are given an array of positive integers `nums`. An array is said to be **equiproduct** if the product of its elements equals the product of `LCM(elements) * GCD(elements)`.

Return the **length** of the longest contiguous subarray of `nums` that is equiproduct.

### Example

`nums = [1,2,1,2,1,1,1]`

The subarray `[1,2,1,2,1,1,1]` (the whole array) works because repeated `1`s and `2`s never introduce a shared prime factor greater than the value `1` itself contributes, so the entire array is equiproduct, giving a length of `7`.

## Approach

For a set of numbers, `product == LCM * GCD` holds precisely when the numbers are **pairwise coprime** (true trivially for subarrays of length 1 or 2). So the task reduces to finding the longest subarray where every pair of elements shares no common prime factor.

Use a brute-force double loop: for each starting index, factorize each new element into its prime factors while extending the window, and track the prime factors seen so far in a hash set. If any prime factor repeats, the window is no longer valid and extension for that start index stops. Track the best valid window length seen.

## C# Solution

```csharp
public class Solution 
{
    public int MaxLength(int[] nums) 
    {
        int n = nums.Length;
        int best = 1;
        for (int i = 0; i < n; i++) 
        {
            var seenFactors = new HashSet<int>();
            bool valid = true;
            for (int j = i; j < n && valid; j++) 
            {
                int value = nums[j];
                for (int factor = 2; factor * factor <= value; factor++) 
                {
                    if (value % factor == 0) 
                    {
                        if (!seenFactors.Add(factor)) 
                        {
                            valid = false;
                        }
                        while (value % factor == 0) 
                        {
                            value /= factor;
                        }
                    }
                }
                if (value > 1 && !seenFactors.Add(value)) 
                {
                    valid = false;
                }
                if (valid) 
                {
                    best = Math.Max(best, j - i + 1);
                }
            }
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n^2 * sqrt(maxVal))
- **Space:** O(n)
