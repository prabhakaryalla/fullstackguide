# 605. Can Place Flowers

**Difficulty:** Easy
**Category:** Array, Greedy

## Problem

Given a flowerbed array where `0` means empty and `1` means planted, and flowers cannot be planted in adjacent plots, return `true` if `n` new flowers can be planted without violating the no-adjacent-flowers rule.

### Example

```
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
```

### Constraints

- `1 <= flowerbed.length <= 2 * 10^4`
- `flowerbed[i]` is `0` or `1`.
- `0 <= n <= flowerbed.length`

## Approach

Scan the plots left to right, greedily planting a flower at any empty plot whose left and right neighbors (treating out-of-bounds as empty) are also empty. Greedily planting as early as possible never hurts future planting opportunities, since an earlier plant only blocks its immediate neighbor.

## C# Solution

```csharp
public class Solution
{
    public bool CanPlaceFlowers(int[] flowerbed, int n)
    {
        int count = 0;

        for (int i = 0; i < flowerbed.Length && count < n; i++)
        {
            if (flowerbed[i] == 1) continue;

            bool leftEmpty = i == 0 || flowerbed[i - 1] == 0;
            bool rightEmpty = i == flowerbed.Length - 1 || flowerbed[i + 1] == 0;

            if (leftEmpty && rightEmpty)
            {
                flowerbed[i] = 1;
                count++;
            }
        }

        return count >= n;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
