# 1664. Ways to Make a Fair Array

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem

Given `nums`, an array is "fair" if the sum of elements at even indices equals the sum at odd indices. Return the number of indices that, if removed, would leave the remaining array fair.

### Example

```
Input: nums = [2,1,6,4]
Output: 1
```

## Approach

Precompute the total even-index sum and odd-index sum. Sweep left to right maintaining the even/odd sums of the prefix strictly before the current index. Everything after the current index has its parity flipped once the current element is removed, so the post-removal even sum is `leftEven + rightOdd` and the post-removal odd sum is `leftOdd + rightEven`; check equality at each index before folding it into the running prefix.

## C# Solution

```csharp
public class Solution
{
    public int WaysToMakeFair(int[] nums)
    {
        int n = nums.Length;
        int totalEvenSum = 0;
        int totalOddSum = 0;

        for (int i = 0; i < n; i++)
        {
            if (i % 2 == 0)
            {
                totalEvenSum += nums[i];
            }
            else
            {
                totalOddSum += nums[i];
            }
        }

        int leftEven = 0;
        int leftOdd = 0;
        int count = 0;

        for (int i = 0; i < n; i++)
        {
            int rightEven = totalEvenSum - leftEven - (i % 2 == 0 ? nums[i] : 0);
            int rightOdd = totalOddSum - leftOdd - (i % 2 == 1 ? nums[i] : 0);

            int newEvenSum = leftEven + rightOdd;
            int newOddSum = leftOdd + rightEven;

            if (newEvenSum == newOddSum)
            {
                count++;
            }

            if (i % 2 == 0)
            {
                leftEven += nums[i];
            }
            else
            {
                leftOdd += nums[i];
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
