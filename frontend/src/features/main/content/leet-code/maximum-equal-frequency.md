# 1224. Maximum Equal Frequency

**Difficulty:** Hard
**Category:** Array, Hash Table, Counting

## Problem

Given an array `nums`, return the length of the longest prefix such that after removing exactly one element from that prefix, every remaining distinct value occurs the same number of times.

### Example

```
Input: nums = [2,2,1,1,5,3,3,5]
Output: 7
```

## Approach

Scan left to right while maintaining, for each value, how many times it has occurred so far (`count`), and for each occurrence count, how many distinct values currently have that count (`freq`). At every prefix length, the prefix is valid in one of three cases: every value occurs exactly once (`maxFreq == 1`); exactly one leftover value occurs once and every other value shares the max frequency (`freq[maxFreq] * maxFreq == len - 1`); or exactly one value reaches the max frequency and removing a single occurrence of it would match everyone else at `maxFreq - 1` (`freq[maxFreq] == 1` and `freq[maxFreq-1] * (maxFreq-1) == len - maxFreq`). Track the largest prefix length satisfying any case.

## C# Solution

```csharp
public class Solution
{
    public int MaxEqualFreq(int[] nums)
    {
        var count = new Dictionary<int, int>();
        var freq = new Dictionary<int, int>();
        int maxFreq = 0, answer = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            int num = nums[i];

            if (count.TryGetValue(num, out int existing))
            {
                freq[existing] = freq.GetValueOrDefault(existing) - 1;
                count[num] = existing + 1;
            }
            else
            {
                count[num] = 1;
            }

            int newCount = count[num];
            freq[newCount] = freq.GetValueOrDefault(newCount) + 1;
            maxFreq = Math.Max(maxFreq, newCount);

            int len = i + 1;
            if (maxFreq == 1)
            {
                answer = len;
            }
            else if (freq.GetValueOrDefault(maxFreq) * maxFreq == len - 1)
            {
                answer = len;
            }
            else if (freq.GetValueOrDefault(maxFreq) == 1 &&
                     freq.GetValueOrDefault(maxFreq - 1) * (maxFreq - 1) == len - maxFreq)
            {
                answer = len;
            }
        }

        return answer;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the length of `nums`.
- **Space:** `O(n)` for the count and frequency maps.
