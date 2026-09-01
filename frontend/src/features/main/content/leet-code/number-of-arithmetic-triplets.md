# 2367. Number of Arithmetic Triplets

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers

## Problem

You are given a 0-indexed, strictly increasing integer array `nums` and a positive integer `diff`. A triplet `(i, j, k)` is an arithmetic triplet if the following conditions are met:

- `i < j < k`,
- `nums[j] - nums[i] == diff`, and
- `nums[k] - nums[j] == diff`.

Return the number of unique arithmetic triplets.

### Example

```
Input: nums = [0,1,4,6,7,10], diff = 3
Output: 2
Explanation: (0,1,4) → 0+3=1 is false, but (1,4,7) and (4,7,10) are valid
```

## Approach

Use a set for O(1) lookup. For each number `num`, check if both `num + diff` and `num + 2 * diff` exist in the set.

## C# Solution

```csharp
public class Solution
{
    public int ArithmeticTriplets(int[] nums, int diff)
    {
        var numSet = new HashSet<int>(nums);
        int count = 0;
        
        foreach (int num in nums)
        {
            if (numSet.Contains(num + diff) && numSet.Contains(num + 2 * diff))
            {
                count++;
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
