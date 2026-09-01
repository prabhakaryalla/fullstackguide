# 3318. Find X-Sum of All K-Long Subarrays I

**Difficulty:** Easy
**Category:** Array, Hash Table, Sliding Window, Heap (Priority Queue)

## Problem

You are given an array `nums` of `n` integers and two integers `k` and `x`.

The x-sum of an array is calculated by:
- Counting occurrences of all elements.
- Keeping only the occurrences of the top `x` most frequent elements (ties broken in favor of the larger value).
- Summing the resulting array.

If an array has fewer than `x` distinct elements, its x-sum is just the sum of the array.

Return an array `answer` of length `n - k + 1` where `answer[i]` is the x-sum of `nums[i..i+k-1]`.

### Example

Input: `nums = [1,1,2,2,3,4,2,3], k = 6, x = 2`

Output: `[6,10,12]`

## Approach

Since `n <= 50`, a direct simulation is efficient enough. For each window of length `k`, build a frequency map, sort the distinct values by `(frequency descending, value descending)`, keep the top `x`, and sum `value * frequency` for those kept.

## C# Solution

```csharp
public class Solution 
{
    public int[] FindXSum(int[] nums, int k, int x) 
    {
        int n = nums.Length;
        int[] answer = new int[n - k + 1];

        for (int start = 0; start + k <= n; start++)
        {
            var freq = new Dictionary<int, int>();
            for (int i = start; i < start + k; i++)
            {
                freq[nums[i]] = freq.GetValueOrDefault(nums[i], 0) + 1;
            }

            var entries = new List<(int val, int cnt)>();
            foreach (var kv in freq) entries.Add((kv.Key, kv.Value));

            entries.Sort((a, b) =>
            {
                if (a.cnt != b.cnt) return b.cnt - a.cnt;
                return b.val - a.val;
            });

            long sum = 0;
            int take = Math.Min(x, entries.Count);
            for (int i = 0; i < take; i++)
            {
                sum += (long)entries[i].val * entries[i].cnt;
            }
            answer[start] = (int)sum;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O((n - k + 1) * k log k) — small enough for n, k <= 50.
- **Space:** O(k) per window for the frequency map.
