# 2792. Count Increasing Quadruplets

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Binary Indexed Tree

## Problem

Given a 0-indexed integer array `nums` of size `n` containing all numbers from 1 to `n`, return the number of increasing quadruplets.

A quadruplet `(i, j, k, l)` is increasing if:
- `0 <= i < j < k < l < n`, and
- `nums[i] < nums[k] < nums[j] < nums[l]`.

### Example

```
Input: nums = [1,3,2,4,5]
Output: 2
Explanation: The increasing quadruplets are (0,1,2,4) and (0,1,2,3).
```

## Approach

For each pair `(j, k)` where `nums[k] < nums[j]`, count how many elements before `j` are smaller than `nums[k]`, and how many elements after `k` are greater than `nums[j]`. The product gives the number of valid quadruplets with this `(j, k)` pair.

## C# Solution

```csharp
public class Solution
{
    public long CountQuadruplets(int[] nums)
    {
        int n = nums.Length;
        long count = 0;

        for (int j = 0; j < n; j++)
        {
            int leftSmaller = 0;
            for (int i = 0; i < j; i++)
            {
                if (nums[i] < nums[j])
                {
                    leftSmaller++;
                }
            }

            for (int k = j + 1; k < n; k++)
            {
                if (nums[k] < nums[j])
                {
                    int leftSmallerThanK = 0;
                    for (int i = 0; i < j; i++)
                    {
                        if (nums[i] < nums[k])
                        {
                            leftSmallerThanK++;
                        }
                    }

                    int rightLargerThanJ = 0;
                    for (int l = k + 1; l < n; l++)
                    {
                        if (nums[l] > nums[j])
                        {
                            rightLargerThanJ++;
                        }
                    }

                    count += (long)leftSmallerThanK * rightLargerThanJ;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(n³)
- **Space:** O(1)
