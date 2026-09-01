# 347. Top K Frequent Elements

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting, Heap, Bucket Sort, Counting

## Problem

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

### Example

```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `k` is in the range `[1, the number of distinct elements in the array]`.
- The answer is guaranteed to be unique.

## Approach

Count occurrences of each number, then use bucket sort where the bucket index is the frequency itself (frequencies are bounded by `nums.Length`). Scan buckets from the highest frequency down, collecting numbers until `k` elements have been gathered, which avoids a full `O(n log n)` sort.

## C# Solution

```csharp
public class Solution
{
    public int[] TopKFrequent(int[] nums, int k)
    {
        var counts = new Dictionary<int, int>();
        foreach (var num in nums)
            counts[num] = counts.GetValueOrDefault(num) + 1;

        var buckets = new List<int>[nums.Length + 1];
        foreach (var pair in counts)
            (buckets[pair.Value] ??= new List<int>()).Add(pair.Key);

        var result = new List<int>();
        for (int freq = buckets.Length - 1; freq >= 0 && result.Count < k; freq--)
        {
            if (buckets[freq] == null) continue;

            foreach (var num in buckets[freq])
            {
                result.Add(num);
                if (result.Count == k) break;
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n)` — counting and bucket placement are both linear.
- **Space:** `O(n)` for the counts and buckets.
