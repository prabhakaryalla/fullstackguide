# 2460. Apply Operations to an Array

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given a 0-indexed array `nums` of size `n`. Apply the following operations to `nums` until no more operations can be performed:

- Choose an index `i` where `0 <= i < n - 1` and `nums[i] == nums[i + 1]`
- Replace `nums[i]` with `2 * nums[i]`
- Set `nums[i + 1]` to 0

After performing all operations, shift all 0's to the end of the array. Return the resulting array.

### Example

```
Input: nums = [1,2,2,1,1,0]
Output: [1,4,2,0,0,0]
Explanation: 
- Apply operation at i=1: [1,4,0,1,1,0]
- Apply operation at i=3: [1,4,0,2,0,0]
- Shift zeros: [1,4,2,0,0,0]
```

## Approach

First, iterate through the array and apply the doubling operation wherever consecutive equal elements are found. Then, collect all non-zero elements and append zeros to fill the array.

## C# Solution

```csharp
public class Solution
{
    public int[] ApplyOperations(int[] nums)
    {
        int n = nums.Length;
        
        // Apply doubling operations
        for (int i = 0; i < n - 1; i++)
        {
            if (nums[i] == nums[i + 1])
            {
                nums[i] *= 2;
                nums[i + 1] = 0;
            }
        }
        
        // Shift non-zeros to the front
        var result = new int[n];
        int index = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] != 0)
            {
                result[index++] = nums[i];
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of nums
- **Space:** O(n) for the result array (O(1) if modifying in-place is allowed)
