# 1674. Minimum Moves to Make Array Complementary

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Prefix Sum

## Problem

Given an even-length array `nums` where every value is in `[1, limit]`, it is "complementary" if `nums[i] + nums[n-1-i]` equals the same constant for every `i`. In one move you may change any single element to any value in `[1, limit]`. Return the minimum number of moves needed to make `nums` complementary.

### Example

```
Input: nums = [1,2,4,3], limit = 4
Output: 1
```

## Approach

For each mirrored pair `(a, b)`, the number of moves required depends on the chosen target sum `T` (ranging `2` to `2*limit`): `0` moves if `T == a + b`, `1` move if `T` falls in `[min(a,b)+1, max(a,b)+limit]` but isn't `a+b`, otherwise `2` moves. Use a difference array over the range of possible `T` values: add a baseline of `2` everywhere, subtract `1` over the "achievable with one move" range, and subtract another `1` exactly at `a+b` (the free point). Summing contributions from every pair and prefix-summing the difference array gives the total moves for each candidate `T`; the answer is the minimum over all `T`.

## C# Solution

```csharp
public class Solution
{
    public int MinMoves(int[] nums, int limit)
    {
        int n = nums.Length;
        int maxSum = 2 * limit;
        int[] delta = new int[maxSum + 2];

        for (int i = 0; i < n / 2; i++)
        {
            int a = nums[i];
            int b = nums[n - 1 - i];
            int lo = Math.Min(a, b) + 1;
            int hi = Math.Max(a, b) + limit;

            delta[2] += 2;
            delta[maxSum + 1] -= 2;

            delta[lo] -= 1;
            delta[hi + 1] += 1;

            delta[a + b] -= 1;
            delta[a + b + 1] += 1;
        }

        int moves = int.MaxValue;
        int current = 0;

        for (int sum = 2; sum <= maxSum; sum++)
        {
            current += delta[sum];
            moves = Math.Min(moves, current);
        }

        return moves;
    }
}
```

## Complexity

- **Time:** `O(n + limit)`.
- **Space:** `O(limit)` for the difference array.
