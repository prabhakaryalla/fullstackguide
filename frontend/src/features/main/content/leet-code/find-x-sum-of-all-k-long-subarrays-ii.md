# 3321. Find X-Sum of All K-Long Subarrays II

**Difficulty:** Hard
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

This is the large-constraint version, requiring an efficient sliding window instead of recomputation per window.

Maintain a frequency map of values in the current window, plus two ordered sets partitioning distinct values into a `top` set (the best `x` by `(count desc, value desc)`) and a `bottom` set (the rest), along with a running sum `topSum` of `count * value` for entries in `top`.

When a value's count changes (an element enters or leaves the window):
1. Remove its old `(count, value)` entry from whichever set holds it (adjusting `topSum` if it was in `top`).
2. Update the count (removing the entry from the map entirely if it drops to 0).
3. Re-insert the updated `(count, value)` entry into `bottom`.
4. Rebalance: move entries from `bottom` to `top` while `top` has room, then swap the worst of `top` with the best of `bottom` while doing so improves the partition, until the invariant "every entry in `top` ranks at least as well as every entry in `bottom`" holds again, keeping `|top| <= x`.

After processing each window, `topSum` is exactly the x-sum for that window.

## C# Solution

```csharp
public class Solution 
{
    public long[] FindXSum(int[] nums, int k, int x) 
    {
        int n = nums.Length;
        var cnt = new Dictionary<int, int>();
        var cmp = Comparer<(int Count, int Val)>.Create((a, b) =>
        {
            if (a.Count != b.Count) return b.Count.CompareTo(a.Count);
            return b.Val.CompareTo(a.Val);
        });
        var top = new SortedSet<(int Count, int Val)>(cmp);
        var bottom = new SortedSet<(int Count, int Val)>(cmp);
        long topSum = 0;

        void RemoveEntry(int val)
        {
            int c = cnt[val];
            var entry = (c, val);
            if (top.Remove(entry)) topSum -= (long)c * val;
            else bottom.Remove(entry);
        }

        void AddEntry(int val)
        {
            bottom.Add((cnt[val], val));
        }

        void Rebalance()
        {
            while (top.Count < x && bottom.Count > 0)
            {
                var mv = bottom.Min;
                bottom.Remove(mv);
                top.Add(mv);
                topSum += (long)mv.Count * mv.Val;
            }
            while (top.Count > 0 && bottom.Count > 0 && cmp.Compare(top.Max, bottom.Min) > 0)
            {
                var t = top.Max;
                var b = bottom.Min;
                top.Remove(t);
                bottom.Remove(b);
                bottom.Add(t);
                top.Add(b);
                topSum += (long)b.Count * b.Val - (long)t.Count * t.Val;
            }
        }

        void Add(int val)
        {
            if (cnt.TryGetValue(val, out int c))
            {
                RemoveEntry(val);
                cnt[val] = c + 1;
            }
            else
            {
                cnt[val] = 1;
            }
            AddEntry(val);
            Rebalance();
        }

        void Remove(int val)
        {
            int c = cnt[val];
            RemoveEntry(val);
            if (c == 1)
            {
                cnt.Remove(val);
            }
            else
            {
                cnt[val] = c - 1;
                AddEntry(val);
            }
            Rebalance();
        }

        int resLen = n - k + 1;
        long[] ans = new long[resLen];
        for (int i = 0; i < k; i++) Add(nums[i]);
        ans[0] = topSum;
        for (int i = k; i < n; i++)
        {
            Add(nums[i]);
            Remove(nums[i - k]);
            ans[i - k + 1] = topSum;
        }
        return ans;
    }
}
```

## Complexity

- **Time:** O(n log n) — each element triggers O(log n) ordered-set operations.
- **Space:** O(n) for the frequency map and ordered sets.
