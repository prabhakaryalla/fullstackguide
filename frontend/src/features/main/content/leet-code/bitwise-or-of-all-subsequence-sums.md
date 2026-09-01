# 2505. Bitwise OR of All Subsequence Sums

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer array `nums`. Calculate the sum of every non-empty subsequence of the array. Then compute the bitwise OR of all those sums and return it.

A subsequence is a sequence derived from the array by deleting zero or more elements without changing the order of the remaining elements.

### Example

```
Input: nums = [2,1,0,3]
Output: 7
Explanation: All possible subsequence sums are: 2, 1, 0, 3, 3, 2, 1, 5, 3, 4, 1, 4, 6, 3, 6. Taking OR of all these gives 7.

Input: nums = [0]
Output: 0
```

## Approach

Use dynamic programming to generate all possible subsequence sums efficiently. A set-based DP tracks which sums are reachable: for each element, add it to all previously reachable sums (including zero for the empty prefix). Finally, compute the bitwise OR of all sums in the set.

## C# Solution

```csharp
public class Solution
{
    public int SubsequenceSumOr(int[] nums)
    {
        var sums = new HashSet<long> { 0 };
        
        foreach (int num in nums)
        {
            var newSums = new HashSet<long>();
            foreach (long s in sums)
            {
                newSums.Add(s + num);
            }
            foreach (long s in newSums)
            {
                sums.Add(s);
            }
        }
        
        long result = 0;
        foreach (long s in sums)
        {
            if (s != 0)
                result |= s;
        }
        
        return (int)result;
    }
}
```

## Complexity

- **Time:** O(n * S) where S is the number of distinct subsequence sums (can be exponential in worst case).
- **Space:** O(S) for storing all distinct sums.
