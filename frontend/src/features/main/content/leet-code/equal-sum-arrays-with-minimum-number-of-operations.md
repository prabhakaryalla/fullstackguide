# 1775. Equal Sum Arrays With Minimum Number of Operations

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy

## Problem

Given two arrays `nums1` and `nums2` of values from `1` to `6`, in one operation you may change any single element in either array to any value from `1` to `6`. Return the minimum number of operations to make the sums of both arrays equal, or `-1` if impossible.

### Example

```
Input: nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
Output: 3
```

## Approach

Let `small` be whichever array has the smaller sum and `big` the other; `diff` is the sum gap to close. Each element in `small` can contribute up to `6 - value` toward closing the gap by increasing it, and each element in `big` can contribute up to `value - 1` by decreasing it. Collect all these potential single-operation gains, sort them descending, and greedily apply the largest gains until the gap is closed (or exhausted, meaning it's impossible).

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums1, int[] nums2)
    {
        int sum1 = nums1.Sum(), sum2 = nums2.Sum();
        if (sum1 == sum2) return 0;

        int[] small = sum1 < sum2 ? nums1 : nums2;
        int[] big = sum1 < sum2 ? nums2 : nums1;
        int diff = Math.Abs(sum1 - sum2);

        var gains = new List<int>();
        foreach (int x in small) gains.Add(6 - x);
        foreach (int x in big) gains.Add(x - 1);
        gains.Sort((a, b) => b - a);

        int ops = 0;
        foreach (int g in gains)
        {
            if (diff <= 0) break;
            diff -= g;
            ops++;
        }

        return diff <= 0 ? ops : -1;
    }
}
```

## Complexity

- **Time:** `O(n log n)` where `n = nums1.Length + nums2.Length`.
- **Space:** `O(n)`.
