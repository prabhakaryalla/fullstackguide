# 3644. Maximum K to Sort a Permutation

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem
You are given an integer array `nums` of length `n` that is a permutation of `[0, n - 1]`. You may swap the elements at indices `i` and `j` only if `nums[i] AND nums[j] == k` for some fixed non-negative integer `k`.

Return the maximum value of `k` such that the array can be sorted into non-decreasing order using any number of such swaps. If `nums` is already sorted, return 0.

### Example
Input: `nums = [0,1,3,2]`
Output: `2`
Explanation: Choosing `k = 2`, swapping `nums[2] = 3` and `nums[3] = 2` is allowed since `3 AND 2 == 2`, producing the sorted array `[0,1,2,3]`.

Constraints:
- `1 <= n <= 10^5`
- `nums` is a permutation of `[0, n - 1]`.

## Approach
Consider only the elements that are not already in their correct sorted position (`nums[i] != i`). If the array is already sorted, the answer is 0. Otherwise, every misplaced value must eventually be swapped into place, directly or indirectly, using pairs whose AND equals `k`. To maximize `k`, take the bitwise AND of all misplaced values: this is the largest value that is guaranteed to divide (in the bitwise-AND sense) every pairwise AND among the misplaced elements, since AND is monotonic and taking the AND of the whole misplaced set gives the highest common "connecting" value that still allows all of them to be linked together through a chain of valid swaps.

## C# Solution

```csharp
public class Solution {
    public int MaxK(int[] nums) {
        int acc = -1;
        bool any = false;

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] != i) {
                acc &= nums[i];
                any = true;
            }
        }

        return any ? acc : 0;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
