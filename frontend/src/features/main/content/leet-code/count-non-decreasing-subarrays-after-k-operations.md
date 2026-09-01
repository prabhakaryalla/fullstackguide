# 3420. Count Non-Decreasing Subarrays After K Operations

**Difficulty:** Hard
**Category:** Array, Stack, Monotonic Stack, Sliding Window

## Problem
You are given an integer array `nums` and an integer `k`. In one operation you may choose an index and decrease the value at that index by 1. For a given subarray, let its cost be the minimum total number of such decrease operations needed to make it non-decreasing (each element may only be decreased, never increased). Return the number of subarrays of `nums` whose cost is at most `k`.

## Approach
Since elements can only be decreased, the optimal non-decreasing assignment for a subarray `[l, r]` sets each element `i` to `min(nums[i], nums[i+1], ..., nums[r])` (the suffix minimum within the subarray) — any smaller value would waste operations. The cost of the subarray is `sum(nums[i]) - sum(effective[i])`.

Maintain a sliding window `[l, r]` together with a deque of `(value, count)` groups that represents the current suffix-min assignment, ordered from the oldest surviving index (front) to the newest (back), with group values non-decreasing back-to-front is not required — instead, each time we append `nums[r]`, we merge it with any trailing groups whose value exceeds `nums[r]` (those elements must now be reduced down to `nums[r]`), keeping `effectiveSum` and `runningSum` (the raw sum) up to date. While `runningSum - effectiveSum > k`, shrink from the left: remove one unit from the front group (which represents index `l`), adjusting both sums, and advance `l`. Because removing the leftmost index never changes the suffix-min contribution of any remaining index (suffix minimum from `i` to `r` never depends on indices `< i`), the cost is monotonically non-increasing as `l` increases for a fixed `r`, which justifies the standard two-pointer approach. For every `r`, add `r - l + 1` to the answer.

## C# Solution

```csharp
public class Solution 
{
    public long CountNonDecreasingSubarrays(int[] nums, int k) 
    {
        int n = nums.Length;
        var groups = new LinkedList<(long val, long cnt)>();
        long runningSum = 0, effectiveSum = 0;
        long answer = 0;
        int l = 0;

        for (int r = 0; r < n; r++) 
        {
            long x = nums[r];
            long cnt = 1;
            runningSum += x;

            while (groups.Count > 0 && groups.Last!.Value.val > x) 
            {
                var (val, c) = groups.Last!.Value;
                groups.RemoveLast();
                effectiveSum -= val * c;
                cnt += c;
            }
            groups.AddLast((x, cnt));
            effectiveSum += x * cnt;

            while (runningSum - effectiveSum > k) 
            {
                var front = groups.First!;
                var (fval, fcnt) = front.Value;
                runningSum -= nums[l];
                effectiveSum -= fval;
                if (fcnt == 1) 
                {
                    groups.RemoveFirst();
                } 
                else 
                {
                    front.Value = (fval, fcnt - 1);
                }
                l++;
            }

            answer += r - l + 1;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n) amortized — each element is merged into and removed from the group deque at most once.
- **Space:** O(n) for the deque of groups in the worst case.
