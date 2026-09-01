# 3079. Find the Sum of Encrypted Integers

**Difficulty:** Easy
**Category:** Array, Math

## Problem

You are given an integer array `nums` of positive integers. The "encryption" of a number replaces every one of its digits with the **largest** digit that number contains. Return the sum of the encrypted values of every element in `nums`.

### Example

```
Input: nums = [1,2,3]
Output: 6
Explanation: Every number is a single digit, so it encrypts to itself. Sum = 1 + 2 + 3 = 6.
```

## Approach

For each number, scan its digits to find the maximum digit, while also tracking how many digits it has (via a repunit-like base value made of that many `1`s, e.g. `111` for 3 digits). The encrypted value is simply `maxDigit` repeated across all its digit positions, which equals `maxDigit * base` (e.g., maxDigit 7 with 3 digits gives `7 * 111 = 777`).

## C# Solution

```csharp
public class Solution {
    public int SumOfEncryptedInt(int[] nums) {
        int ans = 0;

        foreach (int num in nums) {
            int maxDigit = 0, baseVal = 0;
            for (int x = num; x > 0; x /= 10) {
                maxDigit = Math.Max(maxDigit, x % 10);
                baseVal = baseVal * 10 + 1;
            }
            ans += baseVal * maxDigit;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n * d) — d is the number of digits per number.
- Space: O(1).
