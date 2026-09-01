# 3463. Check If Digits Are Equal in String After Operations II

**Difficulty:** Hard
**Category:** Math, String, Combinatorics, Dynamic Programming

## Problem
You are given a string `s` consisting only of digits. Repeatedly, you replace `s` with a new string formed by taking each pair of adjacent digits, summing them, and keeping only the last digit of that sum (mod 10), until only two digits remain. Return `true` if those final two digits are equal, otherwise `false`.

## Approach
This is equivalent to a triangular "digit Pascal's triangle" mod 10: after full reduction, the value contributed by the original digit at position `i` (0-indexed, among `n` original digits) to a final digit is `C(n-2, i) mod 10`-weighted (binomial coefficient), analogous to how repeated pairwise addition relates to Pascal's Triangle. Specifically, the two final digits correspond to applying binomial coefficients `C(n-2, i)` to `s[i..n-2]` for the left final digit, and `C(n-2, i)` to `s[i+1..n-1]` for the right final digit (shifted by one), each mod 10. Since digits are mod 10, and 10 = 2*5, use Lucas' theorem separately mod 2 and mod 5 to compute `C(n-2, i) mod 10` efficiently via CRT, avoiding huge factorial computations. Sum the weighted digits mod 10 for both the left-final and right-final digit, and compare.

## C# Solution

```csharp
public class Solution 
{
    public bool HasSameDigits(string s) 
    {
        int n = s.Length;
        int[] digits = new int[n];
        for (int i = 0; i < n; i++) digits[i] = s[i] - '0';

        int k = n - 2; // binomial "row" for the final reduction step count

        int leftFinal = 0;
        int rightFinal = 0;

        for (int i = 0; i <= k; i++)
        {
            int coeff = BinomMod10(k, i);
            leftFinal = (leftFinal + coeff * digits[i]) % 10;
            rightFinal = (rightFinal + coeff * digits[i + 1]) % 10;
        }

        return leftFinal == rightFinal;
    }

    private int BinomMod10(int n, int k)
    {
        if (k < 0 || k > n) return 0;
        int mod2 = LucasMod(n, k, 2);
        int mod5 = LucasMod(n, k, 5);
        // Combine via CRT for moduli 2 and 5 -> mod 10
        for (int x = 0; x < 10; x++)
        {
            if (x % 2 == mod2 && x % 5 == mod5) return x;
        }
        return 0;
    }

    private int LucasMod(int n, int k, int p)
    {
        int result = 1;
        while (n > 0 || k > 0)
        {
            int ni = n % p, ki = k % p;
            if (ki > ni) return 0;
            result = (result * (int)SmallBinom(ni, ki, p)) % p;
            n /= p;
            k /= p;
        }
        return result;
    }

    private long SmallBinom(int n, int k, int mod)
    {
        long[,] c = new long[n + 1, n + 1];
        for (int i = 0; i <= n; i++)
        {
            c[i, 0] = 1;
            for (int j = 1; j <= i; j++)
            {
                c[i, j] = (i - 1 >= 0 && j - 1 >= 0 ? c[i - 1, j - 1] : 0) + (j <= i - 1 ? c[i - 1, j] : 0);
                c[i, j] %= mod;
            }
        }
        return c[n, k];
    }
}
```

## Complexity

- **Time:** O(n) for the main loop, with O(p^2) work per Lucas digit for small primes 2 and 5 (constant factor)
- **Space:** O(n) for storing digits
