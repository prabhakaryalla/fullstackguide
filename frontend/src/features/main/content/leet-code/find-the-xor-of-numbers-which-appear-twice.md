# 3158. Find the XOR of Numbers Which Appear Twice

**Difficulty:** Easy
**Category:** Array, Bit Manipulation, Hash Table

## Problem
Given an array of positive integers where every number appears either once or twice, return the bitwise XOR of all numbers that appear exactly twice. If no number appears twice, return 0.

## Approach
Track a frequency count of each number (values are small, bounded by a small constant like 50). Iterate the array once, counting occurrences. Then, for every number whose count is exactly 2, XOR it into the running answer.

## C# Solution
```csharp
public class Solution {
    public int DuplicateNumbersXOR(int[] nums) {
        const int kMax = 50;
        int[] count = new int[kMax + 1];
        foreach (int num in nums)
            count[num]++;

        int ans = 0;
        for (int num = 1; num <= kMax; num++)
            if (count[num] == 2)
                ans ^= num;

        return ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
