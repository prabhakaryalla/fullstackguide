# 3551. Minimum Swaps to Sort by Digit Sum

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting

## Problem
You are given an array `nums` of distinct positive integers. Sort the array using the following comparison rule: elements are ordered primarily by their **digit sum** (the sum of the decimal digits of the number), and elements with equal digit sums are ordered by their numeric value. Return the **minimum number of swaps** needed to rearrange `nums` into this sorted order (where a swap exchanges any two elements in the array).

### Example
Input: `nums = [37,100]` → Digit sums: `37 → 10`, `100 → 1`. Sorted order should be `[100, 37]`. One swap suffices. Output: `1`.

## Approach
Compute the target sorted order by sorting a copy of `nums` using the key `(digitSum(x), x)`. Map each value to its target index in this sorted order. The minimum number of swaps to transform `nums` into the target order equals the sum, over every **permutation cycle** in the mapping from current position to target position, of `(cycle length - 1)`.

Traverse each index; if not yet visited, follow the chain `i → targetIndex[nums[i]] → ...` until returning to `i`, counting the cycle length, and add `cycleLength - 1` to the answer (elements already in their correct position form cycles of length 1, contributing 0).

## C# Solution

```csharp
public class Solution {
    public int MinSwaps(int[] nums) {
        int n = nums.Length;
        var sortedNums = (int[])nums.Clone();
        Array.Sort(sortedNums, (a, b) => {
            int sa = DigitSum(a), sb = DigitSum(b);
            return sa != sb ? sa.CompareTo(sb) : a.CompareTo(b);
        });

        var numToIndex = new Dictionary<int, int>();
        for (int i = 0; i < n; i++) numToIndex[sortedNums[i]] = i;

        var seen = new bool[n];
        int ans = 0;

        for (int i = 0; i < n; i++) {
            if (seen[i] || numToIndex[nums[i]] == i) continue;
            int cycleSize = 0;
            int j = i;
            while (!seen[j]) {
                seen[j] = true;
                j = numToIndex[nums[j]];
                cycleSize++;
            }
            ans += Math.Max(cycleSize - 1, 0);
        }

        return ans;
    }

    private int DigitSum(int num) {
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting, plus O(n) for the cycle-detection pass
- **Space:** O(n) for the sorted array, index map, and visited tracking
