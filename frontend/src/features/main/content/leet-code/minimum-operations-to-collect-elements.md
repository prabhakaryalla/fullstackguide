# 2869. Minimum Operations to Collect Elements

**Difficulty:** Easy
**Category:** Array, Hash Table

## Problem

You are given an array `nums` of positive integers and an integer `k`. In one operation, you can remove the last element of the array `nums`.

Return the minimum number of operations needed to collect all elements in the range `[1, k]`.

### Example

```
Input: nums = [3,1,5,4,2], k = 2
Output: 4
Explanation:
Need to collect 1 and 2.
- Remove 2 (collected): nums = [3,1,5,4]
- Remove 4: nums = [3,1,5]
- Remove 5: nums = [3,1]
- Remove 1 (collected): nums = [3]
All elements [1,2] collected after 4 operations.
```

## Approach

Traverse the array from the end, removing elements one by one. Keep track of which numbers in the range `[1, k]` have been collected using a set. Stop when all numbers from 1 to k have been collected.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums, int k)
    {
        var collected = new HashSet<int>();
        int operations = 0;
        
        for (int i = nums.Length - 1; i >= 0; i--)
        {
            operations++;
            
            if (nums[i] >= 1 && nums[i] <= k)
            {
                collected.Add(nums[i]);
                
                if (collected.Count == k)
                    return operations;
            }
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** `O(n)` — traverse array from the end.
- **Space:** `O(k)` for the hash set.
