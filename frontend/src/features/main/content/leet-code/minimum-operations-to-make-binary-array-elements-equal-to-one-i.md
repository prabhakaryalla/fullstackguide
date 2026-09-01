# 3191. Minimum Operations to Make Binary Array Elements Equal to One I

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Prefix Sum, Queue, Sliding Window

## Problem
Given a binary array `nums`, in one operation you may choose any 3 consecutive elements and flip all of them (0 becomes 1, 1 becomes 0). Return the minimum number of operations to make every element in the array equal to 1, or -1 if it's impossible.

## Approach
Process the array left to right. Whenever the current element is 0, it must be flipped by an operation, and the only way to affect it (moving strictly left to right, never revisiting earlier positions) is to apply an operation starting exactly at that position, flipping it along with the next two elements. Apply this greedily: whenever `nums[i] == 0`, flip `nums[i+1]` and `nums[i+2]` (using XOR) and increment the operation counter (we know `nums[i]` itself becomes 1 conceptually, we just don't need to track it further since we won't revisit it). After processing all valid starting positions (`i` up to `n - 3`), check whether the last two elements are both 1; if not, it's impossible, so return -1.

## C# Solution
```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        int n = nums.Length;
        int ans = 0;

        for (int i = 0; i + 2 < n; i++) {
            if (nums[i] == 0) {
                nums[i + 1] ^= 1;
                nums[i + 2] ^= 1;
                ans++;
            }
        }

        return (nums[n - 1] == 0 || nums[n - 2] == 0) ? -1 : ans;
    }
}
```

## Complexity
- Time: O(n)
- Space: O(1)
