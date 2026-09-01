# 2581. Count Array Pairs Divisible by K

**Difficulty:** Hard
**Category:** Array, Math, Number Theory

## Problem

Given a 0-indexed integer array `nums` of length `n` and an integer `k`, return the number of pairs `(i, j)` where `0 <= i < j < n`, such that `nums[i] * nums[j]` is divisible by `k`.

### Example

```
Input: nums = [1,2,3,4,5], k = 2
Output: 7
Explanation: The 7 pairs are:
(0, 1), (0, 3), (1, 2), (1, 3), (1, 4), (2, 3), (3, 4)
```

## Approach

Instead of checking all pairs directly (which would be O(n²)), we optimize by factorizing k and tracking the GCD of each number with k. For each number, we find complementary factors that would make the product divisible by k.

The key insight is that `nums[i] * nums[j]` is divisible by k if and only if the product of their GCDs with k equals k or more. We use a frequency map to count occurrences of each GCD value, then for each element, we calculate how many previous elements form valid pairs with it.

## C# Solution

```csharp
public class Solution
{
    public long CountPairs(int[] nums, int k)
    {
        var gcdCount = new Dictionary<int, int>();
        long result = 0;
        
        foreach (int num in nums)
        {
            int g1 = GCD(num, k);
            
            foreach (var kvp in gcdCount)
            {
                int g2 = kvp.Key;
                if ((long)g1 * g2 % k == 0)
                {
                    result += kvp.Value;
                }
            }
            
            gcdCount[g1] = gcdCount.GetValueOrDefault(g1) + 1;
        }
        
        return result;
    }
    
    private int GCD(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n * d + n * log(k)) where d is the number of distinct GCD values with k (typically small)
- **Space:** O(d) for the frequency map
