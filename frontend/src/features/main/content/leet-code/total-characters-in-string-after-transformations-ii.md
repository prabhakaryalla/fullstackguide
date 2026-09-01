# 3337. Total Characters in String After Transformations II

**Difficulty:** Hard
**Category:** Hash Table, Math, String, Dynamic Programming, Counting

## Problem

Given a string `s`, an integer `t`, and an array `nums` of size 26: in one transformation, every character `s[i]` is replaced by the next `nums[s[i] - 'a']` consecutive characters in the alphabet (wrapping past `'z'`).

Return the length of the resulting string after exactly `t` transformations, modulo `10^9 + 7`.

### Example

Input: `s = "abcyy", t = 2, nums = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2]`

Output: `7`

## Approach

As in the easier version, track only the counts of each of the 26 letters. One transformation is a linear map: letter `c` contributes its count to each of the letters `(c+1) % 26, ..., (c + nums[c]) % 26`. This can be represented as a 26x26 matrix `M` where `M[j][c] = 1` if letter `c` maps to letter `j` in one step.

Since `t` can be up to `10^9`, we cannot simulate step by step. Instead, compute `M^t` using fast matrix exponentiation (O(26^3 log t)), then multiply the resulting matrix by the initial frequency vector to get the final letter counts, and sum them for the answer.

## C# Solution

```csharp
public class Solution 
{
    private const int MOD = 1_000_000_007;
    private const int SIZE = 26;

    public int LengthAfterTransformations(string s, int t, int[] nums) 
    {
        long[,] m = new long[SIZE, SIZE];
        for (int c = 0; c < SIZE; c++)
        {
            int cnt = nums[c];
            for (int step = 1; step <= cnt; step++)
            {
                int target = (c + step) % SIZE;
                m[target, c] = (m[target, c] + 1) % MOD;
            }
        }

        long[,] mt = MatPow(m, t);

        long[] freq = new long[SIZE];
        foreach (char ch in s) freq[ch - 'a']++;

        long ans = 0;
        for (int i = 0; i < SIZE; i++)
        {
            long sum = 0;
            for (int j = 0; j < SIZE; j++)
            {
                sum = (sum + mt[i, j] * (freq[j] % MOD)) % MOD;
            }
            ans = (ans + sum) % MOD;
        }
        return (int)ans;
    }

    private long[,] MatMul(long[,] a, long[,] b)
    {
        long[,] res = new long[SIZE, SIZE];
        for (int i = 0; i < SIZE; i++)
        {
            for (int k = 0; k < SIZE; k++)
            {
                if (a[i, k] == 0) continue;
                long aik = a[i, k];
                for (int j = 0; j < SIZE; j++)
                {
                    res[i, j] = (res[i, j] + aik * b[k, j]) % MOD;
                }
            }
        }
        return res;
    }

    private long[,] MatPow(long[,] m, int p)
    {
        long[,] result = new long[SIZE, SIZE];
        for (int i = 0; i < SIZE; i++) result[i, i] = 1;
        long[,] baseM = m;
        while (p > 0)
        {
            if ((p & 1) == 1) result = MatMul(result, baseM);
            baseM = MatMul(baseM, baseM);
            p >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(26^3 * log t) for matrix exponentiation, plus O(26^2) for the final vector multiply.
- **Space:** O(26^2) for the matrices.
