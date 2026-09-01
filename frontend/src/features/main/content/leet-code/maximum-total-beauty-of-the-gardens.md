# 2234. Maximum Total Beauty of the Gardens

**Difficulty:** Hard
**Category:** Array, Two Pointers, Binary Search, Greedy, Sorting

## Problem

You have `n` gardens arranged in a line. You are given two integer arrays `flowers` and `newFlowers`, and integers `target`, `full`, and `partial`. You want to maximize the total beauty, which is the sum of full gardens (beauty = `full`) and incomplete gardens (beauty = min incomplete garden flowers * `partial`). Return the maximum total beauty.

### Example

```
Input: flowers = [1,3,1,1], newFlowers = 7, target = 6, full = 12, partial = 1
Output: 14
```

## Approach

Sort the gardens. Use binary search or two pointers to try different numbers of full gardens. For each configuration, determine the maximum minimum flowers in incomplete gardens by distributing remaining flowers optimally. Choose the configuration with maximum beauty.

## C# Solution

```csharp
public class Solution
{
    public long MaximumBeauty(int[] flowers, long newFlowers, int target, int full, int partial)
    {
        int n = flowers.Length;
        Array.Sort(flowers);
        
        if (flowers[0] >= target) return (long)n * full;
        
        var prefix = new long[n + 1];
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + Math.Min(flowers[i], target);
        }
        
        long maxBeauty = 0;
        long remaining = newFlowers;
        
        for (int i = n - 1; i >= -1; i--)
        {
            if (i >= 0)
            {
                remaining -= Math.Max(0, target - flowers[i]);
                if (remaining < 0) break;
            }
            
            int fullCount = n - i - 1;
            if (i < 0 || flowers[i] >= target)
            {
                maxBeauty = Math.Max(maxBeauty, (long)fullCount * full);
                continue;
            }
            
            int left = 0, right = i;
            while (left < right)
            {
                int mid = (left + right + 1) / 2;
                long needed = (long)(i - mid + 1) * flowers[mid] - (prefix[i + 1] - prefix[mid]);
                if (needed <= remaining) left = mid;
                else right = mid - 1;
            }
            
            long minFlowers = flowers[left];
            long extraNeeded = (long)(i - left + 1) * flowers[left] - (prefix[i + 1] - prefix[left]);
            if (extraNeeded <= remaining)
            {
                minFlowers = Math.Min(target - 1, flowers[left] + (remaining - extraNeeded) / (i - left + 1));
            }
            
            maxBeauty = Math.Max(maxBeauty, (long)fullCount * full + minFlowers * partial);
        }
        
        return maxBeauty;
    }
}
```

## Complexity

- **Time:** O(n² log n)
- **Space:** O(n)
