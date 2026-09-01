# 2438. Range Product Queries of Powers

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Prefix Sum

## Problem

Given a positive integer `n` and an array `queries` where `queries[i] = [left_i, right_i]`, return an array `answer` where `answer[i]` is the product of all powers of 2 from `left_i` to `right_i` in the binary representation of `n`, modulo 10^9 + 7.

The powers of 2 in `n` are extracted in ascending order (from least significant to most significant bit).

### Example

```
Input: n = 15, queries = [[0,1],[2,2],[0,3]]
Output: [2,4,64]
Explanation: 15 = 1111 in binary = 2^0 + 2^1 + 2^2 + 2^3 = [1,2,4,8]
Query [0,1]: 1 * 2 = 2
Query [2,2]: 4 = 4
Query [0,3]: 1 * 2 * 4 * 8 = 64
```

## Approach

First, extract all powers of 2 from `n` by iterating through its bits. Store these powers in an array. For each query `[L, R]`, compute the product of `powers[L]` through `powers[R]` using modular arithmetic.

## C# Solution

```csharp
public class Solution
{
    public int[] ProductQueries(int n, int[][] queries)
    {
        const int Mod = 1_000_000_007;
        var powers = new List<long>();
        
        // Extract powers of 2 from n
        long power = 1;
        while (n > 0)
        {
            if ((n & 1) == 1)
            {
                powers.Add(power);
            }
            power *= 2;
            n >>= 1;
        }
        
        int m = queries.Length;
        int[] result = new int[m];
        
        for (int i = 0; i < m; i++)
        {
            int left = queries[i][0];
            int right = queries[i][1];
            
            long product = 1;
            for (int j = left; j <= right; j++)
            {
                product = (product * powers[j]) % Mod;
            }
            
            result[i] = (int)product;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(log n + q * k) where q is the number of queries and k is the average range length
- **Space:** O(log n) for storing the powers
