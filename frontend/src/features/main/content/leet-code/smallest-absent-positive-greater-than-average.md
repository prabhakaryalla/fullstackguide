# 3678. Smallest Absent Positive Greater Than Average

**Difficulty:** Easy
**Category:** Array, Hash Table, Math

## Problem

Given an integer array `nums`, compute the average of all elements (integer division). Return the smallest positive integer strictly greater than that average which does not appear in `nums`.

### Example

Input: `nums = [1,3,5,7]`
Output: `5`
Explanation: Average = (1+3+5+7)/4 = 4. Checking candidates greater than 4: 5 is present, so we move on... wait 5 is present in nums, so the answer is the smallest positive integer greater than 4 not in the array, which is `6` since 5 is present.

## Approach

Compute the integer average, then linearly probe upward from `average + 1` using a hash set of `nums` until an absent value is found.

## C# Solution

```csharp
public class Solution 
{
    public int SmallestAbsent(int[] nums) 
    {
        long sum = 0;
        foreach (int x in nums) sum += x;
        int avg = (int)(sum / nums.Length);
        HashSet<int> set = new HashSet<int>(nums);
        int candidate = avg + 1;
        while (set.Contains(candidate)) 
        {
            candidate++;
        }
        return candidate;
    }
}
```

## Complexity

- **Time:** O(n) amortized
- **Space:** O(n)
