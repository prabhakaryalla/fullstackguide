# 888. Fair Candy Swap

**Difficulty:** Easy
**Category:** Array, Hash Table, Binary Search, Sorting

## Problem

Alice and Bob each have piles of candy boxes with given sizes. Return a pair `[a, b]` (one box size from Alice, one from Bob) such that swapping them leaves both with equal total candy.

### Example

```
Input: aliceSizes = [1,2], bobSizes = [2,3]
Output: [1,2]
```

## Approach

For the totals to become equal after swapping box sizes `a` (Alice's) and `b` (Bob's), it must hold that `sumA - a + b == sumB - b + a`, which simplifies to `a - b == (sumA - sumB) / 2`. Compute this required difference once, store Bob's box sizes in a hash set, and for each of Alice's box sizes, check whether the box size that would satisfy the equation exists in Bob's set.

## C# Solution

```csharp
public class Solution
{
    public int[] FairCandySwap(int[] aliceSizes, int[] bobSizes)
    {
        int sumA = aliceSizes.Sum();
        int sumB = bobSizes.Sum();
        int diff = (sumA - sumB) / 2;

        var bobSet = new HashSet<int>(bobSizes);

        foreach (var a in aliceSizes)
        {
            int b = a - diff;
            if (bobSet.Contains(b))
                return new[] { a, b };
        }

        return new int[0];
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(m)` for the hash set.
