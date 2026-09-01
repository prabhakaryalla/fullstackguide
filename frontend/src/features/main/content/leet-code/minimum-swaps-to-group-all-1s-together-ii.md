# 2134. Minimum Swaps to Group All 1's Together II

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem

A swap is defined as taking two distinct positions in an array and swapping the values in them. A circular array is defined as an array where the first element and the last element are considered to be adjacent.

Given a binary circular array `nums`, return the minimum number of swaps required to group all `1`'s present in the array together at any location.

### Example

```
Input: nums = [0,1,0,1,1,0,0]
Output: 1
Explanation: We can group all 1's together by swapping index 0 with index 6.
Result: [0,0,0,1,1,1,0]
```

## Approach

The key insight is that if we want to group all 1's together, we need a window of size equal to the total count of 1's. The minimum swaps needed is the number of 0's in the window with the maximum number of 1's.

Since the array is circular, we extend it virtually by concatenating it with itself, then use a sliding window:
1. Count total number of 1's (this is our window size)
2. Use sliding window to find the window with maximum 1's
3. Minimum swaps = window_size - max_ones_in_window

## C# Solution

```csharp
public class Solution
{
    public int MinSwaps(int[] nums)
    {
        int n = nums.Length;
        int totalOnes = nums.Count(x => x == 1);
        
        if (totalOnes == 0 || totalOnes == n)
            return 0;
        
        // Count ones in the first window
        int currentOnes = 0;
        for (int i = 0; i < totalOnes; i++)
        {
            if (nums[i] == 1)
                currentOnes++;
        }
        
        int maxOnes = currentOnes;
        
        // Slide the window (circular)
        for (int i = 0; i < n; i++)
        {
            // Remove leftmost element of previous window
            if (nums[i] == 1)
                currentOnes--;
            
            // Add rightmost element of new window
            if (nums[(i + totalOnes) % n] == 1)
                currentOnes++;
            
            maxOnes = Math.Max(maxOnes, currentOnes);
        }
        
        return totalOnes - maxOnes;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1)
