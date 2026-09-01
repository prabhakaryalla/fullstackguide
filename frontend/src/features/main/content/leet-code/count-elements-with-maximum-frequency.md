# 3005. Count Elements With Maximum Frequency

**Difficulty:** Easy
**Category:** Array, Hash Table, Counting

## Problem

You are given an array `nums` consisting of positive integers. Let `maxFreq` be the maximum frequency of any element in `nums`. Return the total number of elements in `nums` whose frequency equals `maxFreq` (i.e., sum the counts of every value that achieves the maximum frequency).

### Example

```
Input: nums = [1,2,2,3,1,4]
Output: 4
Explanation: 1 and 2 both occur twice, which is the maximum frequency. There are 2 + 2 = 4 such elements.
```

## Approach

Count occurrences of every value with a frequency array (values are bounded, e.g. `1 <= nums[i] <= 100`). Find the maximum frequency, then sum up `frequency * (number of distinct values with that frequency)` — equivalently, the count of how many distinct values equal `maxFreq`, multiplied by `maxFreq`.

## C# Solution

```csharp
public class Solution {
    public int MaxFrequencyElements(int[] nums) {
        int[] count = new int[101];
        foreach (int num in nums)
            count[num]++;

        int maxFreq = count.Max();
        int distinctAtMax = count.Count(c => c == maxFreq);
        return distinctAtMax * maxFreq;
    }
}
```

## Complexity

- Time: O(n) — one pass to count, one pass over the fixed-size frequency array.
- Space: O(1) — the frequency array has a fixed bounded size.
