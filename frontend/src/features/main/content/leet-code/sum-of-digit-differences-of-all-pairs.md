# 3153. Sum of Digit Differences of All Pairs

**Difficulty:** Medium
**Category:** Array, Hash Table, Math, Counting

## Problem
You are given an array of positive integers, all having the same number of digits. For every pair of integers in the array, the "digit difference" is defined as the number of digit positions where the two numbers differ. Return the sum of the digit differences across all pairs.

### Example
Input: `nums = [13, 23, 12]`
Output: `4`
Explanation: Comparing (13,23): differ at position 0 (1). Comparing (13,12): differ at position 1 (1). Comparing (23,12): differ at both positions (2). Total = 1+1+2 = 4.

## Approach
Rather than comparing every pair directly (which would be O(n^2 * d)), process digit position by digit position. For a fixed position, count how many numbers have each digit (0-9) at that position. If `freq[d]` numbers share digit `d` at this position, then the number of pairs that differ at this position is `freq[d] * (n - freq[d])` summed over all digits, then divided by 2 (since each differing pair is counted twice, once from each side). Summing across all digit positions gives the total answer.

## C# Solution
```csharp
public class Solution {
    public long SumDigitDifferences(int[] nums) {
        int n = nums.Length;
        string first = nums[0].ToString();
        int digitSize = first.Length;
        long ans = 0;

        long denominator = 1;
        for (int i = 0; i < digitSize; i++, denominator *= 10) {
            int[] count = new int[10];
            foreach (int num in nums) {
                int digit = (int)((num / denominator) % 10);
                count[digit]++;
            }
            foreach (int freq in count)
                ans += (long)freq * (n - freq);
        }

        return ans / 2;
    }
}
```

## Complexity
- Time: O(n * d), where d is the number of digits
- Space: O(1)
