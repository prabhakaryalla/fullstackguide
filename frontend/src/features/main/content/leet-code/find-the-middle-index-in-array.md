# 1991. Find the Middle Index in Array

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

Given a 0-indexed integer array `nums`, find the leftmost index `i` such that the sum of all elements strictly to the left of `i` equals the sum of all elements strictly to the right of `i`. Return that index, or `-1` if no such index exists.

### Example

```
Input: nums = [2,3,-1,8,4]
Output: 3
Explanation: Sum of elements left of index 3 is 2+3-1=4, and sum of elements right of index 3 is 4. They are equal.
```

### Constraints

- `1 <= nums.length <= 100`
- `-1000 <= nums[i] <= 1000`

## Approach

Compute the total sum of the array. Scan left to right maintaining a running `leftSum`; at each index `i`, the right sum is `total - leftSum - nums[i]`. If `leftSum` equals that right sum, `i` is the answer. Otherwise add `nums[i]` to `leftSum` and continue.

## C# Solution

```csharp
public class Solution
{
    public int FindMiddleIndex(int[] nums)
    {
        int total = nums.Sum();
        int leftSum = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            int rightSum = total - leftSum - nums[i];
            if (leftSum == rightSum)
            {
                return i;
            }
            leftSum += nums[i];
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass to sum, one pass to check each index.
- **Space:** `O(1)`.
