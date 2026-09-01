# 2961. Double Modular Exponentiation

**Difficulty:** Medium
**Category:** Array, Math

## Problem

You are given a 2D array `variables` where `variables[i] = [a, b, c, m]`, and an integer `target`. An index `i` is **good** if `((a^b mod 10)^c) mod m == target`. Return an array of all good indices, in any order.

### Example

`variables = [[2,3,3,10]]`, `target = 2` → since `(2^3 mod 10)^3 mod 10 = 8^3 mod 10 = 512 mod 10 = 2`, index `0` is good.

## Approach

For each query, compute the value in two stages using fast modular exponentiation: first `step1 = a^b mod 10`, then `step2 = step1^c mod m`. Compare `step2` against `target` and collect matching indices.

## C# Solution

```csharp
public class Solution 
{
    public IList<int> GetGoodIndices(int[][] variables, int target) 
    {
        var result = new List<int>();
        for (int i = 0; i < variables.Length; i++)
        {
            int a = variables[i][0];
            int b = variables[i][1];
            int c = variables[i][2];
            int m = variables[i][3];

            long step1 = ModPow(a, b, 10);
            long step2 = ModPow(step1, c, m);

            if (step2 == target)
            {
                result.Add(i);
            }
        }
        return result;
    }

    private long ModPow(long baseValue, long exponent, long modulus) 
    {
        if (modulus == 1)
        {
            return 0;
        }

        long result = 1;
        baseValue %= modulus;
        while (exponent > 0)
        {
            if ((exponent & 1) == 1)
            {
                result = (result * baseValue) % modulus;
            }
            exponent >>= 1;
            baseValue = (baseValue * baseValue) % modulus;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n log(max(b, c)))
- **Space:** O(1) excluding the output
