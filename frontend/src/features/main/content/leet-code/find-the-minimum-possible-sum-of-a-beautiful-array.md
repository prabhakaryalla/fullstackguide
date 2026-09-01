# 2834. Find the Minimum Possible Sum of a Beautiful Array

**Difficulty:** Medium
**Category:** Array, Math, Greedy

## Problem

You are given positive integers n and target.

An array nums is beautiful if it meets the following conditions:
- nums.length == n
- nums consists of pairwise distinct positive integers
- There doesn't exist two distinct indices i and j in the range [0, n - 1] such that nums[i] + nums[j] == target

Return the minimum possible sum that a beautiful array could have.

### Example

```
Input: n = 2, target = 3
Output: 4
Explanation: [1,3] is a beautiful array with sum = 4. We cannot have [1,2] because 1+2=3
```

## Approach

We want to greedily select the smallest possible numbers while avoiding pairs that sum to target.

Start from 1 and keep adding numbers. For each candidate number x:
- If x + (target - x) haven't both been selected, we can use x
- Skip x if selecting it would create a forbidden pair

A key insight: once we reach target/2, we've exhausted all "risky" numbers in the first half. After that, we can safely skip ahead to target and continue from there, as numbers >= target won't pair with anything we've already selected to sum to target.

We pick numbers 1, 2, ..., k where k < target/2, then skip to target and continue: target, target+1, ...

## C# Solution

```csharp
public class Solution
{
    public long MinimumPossibleSum(int n, int target)
    {
        long sum = 0;
        int count = 0;
        int current = 1;
        HashSet<int> used = new HashSet<int>();
        
        while (count < n)
        {
            int complement = target - current;
            
            if (!used.Contains(complement))
            {
                sum += current;
                used.Add(current);
                count++;
            }
            
            current++;
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n + target) in the worst case, but typically O(n)
- **Space:** O(n) for the hash set
