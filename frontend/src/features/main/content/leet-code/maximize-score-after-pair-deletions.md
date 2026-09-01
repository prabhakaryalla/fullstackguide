# 3496. Maximize Score After Pair Deletions

**Difficulty:** Medium
**Category:** Array, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
You are given an integer array `nums`. Exactly one deletion must be performed on it: if `nums` has odd length, you must delete a single element; if `nums` has even length, you must delete two **adjacent** elements. Return the maximum possible sum of the remaining elements.

### Example
Input: `nums = [3, 1, 4, 1]`
Output: `8`
Explanation: `nums` has even length, so an adjacent pair must be removed. The adjacent sums are `3+1=4`, `1+4=5`, `4+1=5`; removing the pair with the smallest sum (`3, 1`) leaves `[4, 1]` summing to `5`... the best choice removes whichever adjacent pair has the minimum sum, maximizing the remaining total: total sum is `9`, minus the smallest adjacent pair sum `4`, giving `5`. (For an odd-length array such as `[3, 1, 4]`, the single smallest element, `1`, would be removed, leaving a sum of `7`.)

## Approach
Let `sum` be the total of all elements.
- If `n` is odd, the optimal choice is to delete the single **smallest** element, so the answer is `sum - min(nums)`.
- If `n` is even, the optimal choice is to delete the **adjacent pair with the smallest sum**, so the answer is `sum` minus the minimum sum among all adjacent pairs.

## C# Solution

```csharp
public class Solution {
    public int MaxScore(int[] nums) {
        int n = nums.Length;
        int sum = 0;
        foreach (int num in nums) sum += num;

        if (n % 2 == 1) {
            int min = nums[0];
            foreach (int num in nums) min = Math.Min(min, num);
            return sum - min;
        }

        int minAdjacentSum = int.MaxValue;
        for (int i = 1; i < n; i++)
            minAdjacentSum = Math.Min(minAdjacentSum, nums[i - 1] + nums[i]);

        return sum - minAdjacentSum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
