# 313. Super Ugly Number

**Difficulty:** Medium
**Category:** Array, Math, Dynamic Programming, Heap

## Problem

A super ugly number is a positive integer whose prime factors are all in the array `primes`. Given an integer `n` and an array of integers `primes`, return the `n`th super ugly number.

### Example

```
Input: n = 12, primes = [2,7,13,19]
Output: 32
Explanation: [1,2,4,7,8,13,14,16,19,26,28,32] is the sequence of the first 12 super ugly numbers given primes = [2,7,13,19].
```

### Constraints

- `1 <= n <= 10^6`
- `1 <= primes.length <= 100`
- `2 <= primes[i] <= 1000`
- `primes[i]` is guaranteed to be a prime number.
- All the values of `primes` are unique and sorted in ascending order.

## Approach

Build the sequence bottom-up: maintain one pointer per prime into the already-computed `ugly` array, representing the next multiple that prime could contribute. At each step, pick the minimum candidate across all primes as the next ugly number, and advance every pointer whose candidate matches that minimum (to avoid duplicates).

## C# Solution

```csharp
public class Solution
{
    public int NthSuperUglyNumber(int n, int[] primes)
    {
        var ugly = new int[n];
        ugly[0] = 1;
        int k = primes.Length;
        var indices = new int[k];

        for (int i = 1; i < n; i++)
        {
            int min = int.MaxValue;
            for (int j = 0; j < k; j++)
                min = Math.Min(min, ugly[indices[j]] * primes[j]);

            ugly[i] = min;
            for (int j = 0; j < k; j++)
                if (ugly[indices[j]] * primes[j] == min)
                    indices[j]++;
        }

        return ugly[n - 1];
    }
}
```

## Complexity

- **Time:** `O(n * k)`, where `k` is the number of primes.
- **Space:** `O(n + k)`.
