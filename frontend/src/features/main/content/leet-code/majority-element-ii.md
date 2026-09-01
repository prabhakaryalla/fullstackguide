# 229. Majority Element II

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting, Counting

## Problem

Given an integer array `nums` of size `n`, return all elements that appear more than `⌊n / 3⌋` times.

### Example

```
nums = [3,2,3] -> [3]
nums = [1,1,1,3,3,2,2,2] -> [1,2]
```

## Approach

At most two values can each appear more than `n/3` times, so extend Boyer-Moore voting to track two candidates and two counters simultaneously. After one pass, verify both candidates by actually counting their occurrences (the voting phase only guarantees they're the *only* possible majority-of-a-third candidates, not that they truly qualify).

## C# Solution

```csharp
public class Solution
{
    public IList<int> MajorityElement(int[] nums)
    {
        int candidate1 = 0, candidate2 = 1, count1 = 0, count2 = 0;

        foreach (int num in nums)
        {
            if (num == candidate1) count1++;
            else if (num == candidate2) count2++;
            else if (count1 == 0) { candidate1 = num; count1 = 1; }
            else if (count2 == 0) { candidate2 = num; count2 = 1; }
            else { count1--; count2--; }
        }

        count1 = count2 = 0;
        foreach (int num in nums)
        {
            if (num == candidate1) count1++;
            else if (num == candidate2) count2++;
        }

        var result = new List<int>();
        int threshold = nums.Length / 3;
        if (count1 > threshold) result.Add(candidate1);
        if (count2 > threshold) result.Add(candidate2);
        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes.
- **Space:** `O(1)`.
