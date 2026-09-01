# 952. Largest Component Size by Common Factor

**Difficulty:** Hard
**Category:** Array, Union Find, Math, Number Theory

## Problem

Given an integer array `nums`, connect two numbers if they share a common factor greater than `1`. Return the size of the largest connected component.

### Example

```
Input: nums = [4,6,15,35]
Output: 4
```

## Approach

Rather than comparing every pair of numbers, union each number with each of its prime factors directly in a union-find structure sized to the maximum value. Two numbers sharing a factor end up in the same component transitively through that shared factor node. Finally, count how many original numbers map to each component root and return the largest count.

## C# Solution

```csharp
public class Solution
{
    public int LargestComponentSize(int[] nums)
    {
        int maxVal = nums.Max();
        var parent = new int[maxVal + 1];
        for (int i = 0; i <= maxVal; i++) parent[i] = i;

        int Find(int x) => parent[x] == x ? x : (parent[x] = Find(parent[x]));
        void Union(int a, int b)
        {
            int ra = Find(a), rb = Find(b);
            if (ra != rb) parent[ra] = rb;
        }

        foreach (var num in nums)
        {
            for (int factor = 2; (long)factor * factor <= num; factor++)
            {
                if (num % factor == 0)
                {
                    Union(num, factor);
                    Union(num, num / factor);
                }
            }
        }

        var count = new Dictionary<int, int>();
        int best = 0;

        foreach (var num in nums)
        {
            int root = Find(num);
            count[root] = count.GetValueOrDefault(root) + 1;
            best = Math.Max(best, count[root]);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n * sqrt(maxVal) * alpha(maxVal))`.
- **Space:** `O(maxVal)`.
