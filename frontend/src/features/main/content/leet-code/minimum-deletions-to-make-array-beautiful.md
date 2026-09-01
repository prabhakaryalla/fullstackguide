# 2216. Minimum Deletions to Make Array Beautiful

**Difficulty:** Medium
**Category:** Array, Greedy, Stack

## Problem

You are given a 0-indexed integer array `nums`. The array `nums` is beautiful if:
- `nums.length` is even
- `nums[i] != nums[i + 1]` for all `i % 2 == 0`

You can delete any number of elements from `nums`. Return the minimum number of elements to delete to make `nums` beautiful.

### Example

```
Input: nums = [1,1,2,3,5]
Output: 1
Explanation: Delete nums[0] to get [1,2,3,5] which is beautiful.
Pairs: (1,2) and (3,5) - all different.
```

## Approach

Use a greedy strategy: build the beautiful array by pairing elements from left to right. Skip elements that would create invalid pairs.

1. Iterate through the array
2. Try to form pairs where elements are different
3. Count how many elements we skip (deletions)

## C# Solution

```csharp
public class Solution
{
    public int MinDeletion(int[] nums)
    {
        int deletions = 0;
        int i = 0;
        
        while (i < nums.Length)
        {
            int pairStart = i;
            
            // Find a valid second element for the pair
            int j = i + 1;
            while (j < nums.Length && nums[j] == nums[pairStart])
            {
                deletions++;
                j++;
            }
            
            if (j >= nums.Length)
            {
                // Can't form a pair, delete the remaining element
                deletions++;
                break;
            }
            
            // Valid pair found: (nums[pairStart], nums[j])
            i = j + 1;
        }
        
        return deletions;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of the array
- **Space:** O(1)
