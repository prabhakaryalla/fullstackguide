# 2176. Count Equal and Divisible Pairs in an Array

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given a 0-indexed integer array `nums` of length `n` and an integer `k`, return the number of pairs `(i, j)` where:
- 0 <= i < j < n
- `nums[i] == nums[j]`
- `(i * j)` is divisible by `k`

### Example

```
Input: nums = [3,1,2,2,2,1,3], k = 2
Output: 4
Explanation: Valid pairs: (0,6), (2,3), (2,4), (3,4)
```

## Approach

Brute force: check all pairs `(i, j)` where `i < j`, and count those satisfying both conditions.

For each pair, verify that values are equal and the product of indices is divisible by k.

## C# Solution

```csharp
public class Solution
{
    public int CountPairs(int[] nums, int k)
    {
        int count = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                if (nums[i] == nums[j] && (i * j) % k == 0)
                {
                    count++;
                }
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n²) where n is the length of the array
- **Space:** O(1)
