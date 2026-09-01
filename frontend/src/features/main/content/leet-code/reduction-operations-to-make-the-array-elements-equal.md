# 1887. Reduction Operations to Make the Array Elements Equal

**Difficulty:** Medium
**Category:** Array, Sorting, Greedy

## Problem

In one operation, find the largest value in `nums` and change any **one** occurrence of it to the second-largest distinct value present. Return the minimum number of operations needed to make every element equal.

### Example

```
Input: nums = [5,1,3]
Output: 3
```

## Approach

Sort the array ascending. Walk left to right maintaining a running counter of "how many distinct value tiers have been passed so far" (incremented every time the current value differs from the previous one). Each element needs one operation for every tier above the eventual final (smallest) value, so accumulating this running counter at each position gives the total number of individual-element reduction operations needed overall.

## C# Solution

```csharp
public class Solution
{
    public int ReductionOperations(int[] nums)
    {
        Array.Sort(nums);
        int operations = 0;
        int currentOps = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] != nums[i - 1]) currentOps++;
            operations += currentOps;
        }

        return operations;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(1)` extra.
