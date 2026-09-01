# 2802. Count the Number of Infection Sequences

**Difficulty:** Hard
**Category:** Math, Combinatorics, Dynamic Programming

## Problem

You are given an integer `n` representing the number of children in a line, numbered from `0` to `n - 1`. You are also given an array `sick` containing the positions of children who are initially infected.

An infection spreads to adjacent children. At each step, an infected child can spread the infection to one adjacent non-infected child (either left or right neighbor). The infection continues until all children are infected.

Return the total number of different sequences in which all children can become infected.

### Example

```
Input: n = 5, sick = [0,4]
Output: 4
Explanation: Initially children 0 and 4 are infected. Possible sequences:
[0,4,1,3,2], [0,4,3,1,2], [4,0,1,3,2], [4,0,3,1,2]
```

## Approach

This problem involves combinatorics and understanding how the infection spreads. Key observations:

1. Children in `sick` array divide the line into segments of consecutive healthy children.
2. Each segment can be infected from one or both ends (depending on position).
3. For a segment of length `k` between two infected children, there are `2^(k-1)` ways to infect it (at each step, choose left or right).
4. For segments at the edges (only one infected neighbor), there's only 1 way.
5. We need to multiply the ways for each segment and account for the ordering of which segment gets infected when.

The total number of sequences is calculated using multinomial coefficients combined with powers of 2 for internal segments.

## C# Solution

```csharp
public class Solution
{
    private const int MOD = 1000000007;
    
    public int NumberOfSequence(int n, int[] sick)
    {
        Array.Sort(sick);
        var segments = new List<int>();
        
        if (sick[0] > 0)
        {
            segments.Add(sick[0]);
        }
        
        for (int i = 1; i < sick.Length; i++)
        {
            int gap = sick[i] - sick[i - 1] - 1;
            if (gap > 0)
            {
                segments.Add(gap);
            }
        }
        
        if (sick[sick.Length - 1] < n - 1)
        {
            segments.Add(n - 1 - sick[sick.Length - 1]);
        }
        
        int totalHealthy = n - sick.Length;
        long result = Factorial(totalHealthy);
        
        bool isFirstEdge = sick[0] > 0;
        bool isLastEdge = sick[sick.Length - 1] < n - 1;
        
        for (int i = 0; i < segments.Count; i++)
        {
            int seg = segments[i];
            result = result * ModInverse(Factorial(seg), MOD) % MOD;
            
            bool isEdgeSegment = (i == 0 && isFirstEdge) || (i == segments.Count - 1 && isLastEdge);
            if (!isEdgeSegment && seg > 0)
            {
                result = result * ModPow(2, seg - 1, MOD) % MOD;
            }
        }
        
        return (int)result;
    }
    
    private long Factorial(int n)
    {
        long result = 1;
        for (int i = 2; i <= n; i++)
        {
            result = result * i % MOD;
        }
        return result;
    }
    
    private long ModPow(long baseNum, int exp, int mod)
    {
        long result = 1;
        baseNum %= mod;
        while (exp > 0)
        {
            if (exp % 2 == 1)
            {
                result = result * baseNum % mod;
            }
            baseNum = baseNum * baseNum % mod;
            exp /= 2;
        }
        return result;
    }
    
    private long ModInverse(long a, int mod)
    {
        return ModPow(a, mod - 2, mod);
    }
}
```

## Complexity

- **Time:** O(n + k log k) where k is the length of sick array (for sorting) and n for calculating factorials
- **Space:** O(k) for storing segments
