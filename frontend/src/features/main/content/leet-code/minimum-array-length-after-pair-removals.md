# 2856. Minimum Array Length After Pair Removals

**Difficulty:** Medium
**Category:** Array, Hash Table, Two Pointers, Binary Search, Greedy, Counting

## Problem

You are given a 0-indexed sorted array of positive integers `nums`. In one operation, you can choose two indices `i` and `j` where `i < j` and `nums[i] < nums[j]`, then remove both elements from the array.

Return the minimum length of `nums` after performing the operation any number of times (possibly zero).

### Example

```
Input: nums = [1,3,4,9]
Output: 0
Explanation:
- Remove indices 0 and 1: nums = [4,9]
- Remove indices 0 and 1: nums = []
Final length is 0.
```

## Approach

The key insight is that we can remove pairs greedily. If the most frequent element appears more than `n/2` times, we cannot pair all of them, leaving `2 * maxFreq - n` elements. Otherwise, if `n` is even, we can pair everything (result 0); if `n` is odd, we're left with 1 element.

Count the maximum frequency of any element. If `maxFreq > n/2`, the result is `2 * maxFreq - n`. Otherwise, the result is `n % 2`.

## C# Solution

```csharp
public class Solution
{
    public int MinLengthAfterRemovals(int[] nums)
    {
        int n = nums.Length;
        var freqMap = new Dictionary<int, int>();
        int maxFreq = 0;
        
        foreach (int num in nums)
        {
            freqMap[num] = freqMap.GetValueOrDefault(num, 0) + 1;
            maxFreq = Math.Max(maxFreq, freqMap[num]);
        }
        
        if (maxFreq > n / 2)
            return 2 * maxFreq - n;
        
        return n % 2;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass to count frequencies.
- **Space:** `O(n)` for the frequency map in worst case.
