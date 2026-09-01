# 875. Koko Eating Bananas

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given `piles` of bananas and `h` hours until the guards return, Koko eats at a constant speed of `k` bananas per hour, finishing at most one pile per hour (eating fewer than `k` from a smaller pile and then stopping for that hour). Return the minimum integer `k` such that she can eat all bananas within `h` hours.

### Example

```
Input: piles = [3,6,7,11], h = 8
Output: 4
```

## Approach

Binary search on the eating speed `k`, from `1` to the largest pile size. For a candidate speed, compute the total hours needed as the sum of `ceil(pile / speed)` over all piles; a higher speed always requires fewer or equal hours, so this is monotonic and binary search converges to the smallest speed for which the total hours is within `h`.

## C# Solution

```csharp
public class Solution
{
    public int MinEatingSpeed(int[] piles, int h)
    {
        int left = 1, right = piles.Max();

        while (left < right)
        {
            int mid = left + (right - left) / 2;

            if (CanFinish(piles, mid, h))
                right = mid;
            else
                left = mid + 1;
        }

        return left;
    }

    private bool CanFinish(int[] piles, int speed, int h)
    {
        long hours = 0;
        foreach (var pile in piles)
            hours += (pile + speed - 1) / speed;

        return hours <= h;
    }
}
```

## Complexity

- **Time:** `O(n log(maxPile))`.
- **Space:** `O(1)` extra.
