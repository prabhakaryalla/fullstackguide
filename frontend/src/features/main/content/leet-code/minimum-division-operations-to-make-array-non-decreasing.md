# 3326. Minimum Division Operations to Make Array Non Decreasing

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Number Theory

## Problem

You are given an integer array `nums`. Any positive divisor of `x` that is strictly less than `x` is a proper divisor. In one operation, select an element and divide it by its greatest proper divisor.

Return the minimum number of operations needed to make `nums` non-decreasing, or `-1` if impossible.

### Example

Input: `nums = [25,7]`

Output: `1`

Explanation: Dividing 25 by its greatest proper divisor (5) gives 5, and `[5,7]` is non-decreasing.

## Approach

Dividing a number by its greatest proper divisor always reduces it to its **smallest prime factor**. So each element can either stay as-is, or be reduced (once) to its smallest prime factor — dividing further would only be useful if the number were reduced again, but since the smallest prime factor is itself prime, dividing it again would make it 1 (its only proper divisor), which is generally not useful here since we only need to go down to the smallest prime factor once to satisfy non-decreasing order (repeating would only make it smaller, potentially breaking order with earlier elements — so at most one operation per element is ever useful).

Process the array from right to left, keeping track of the maximum value allowed for the current position (initially unbounded, i.e., the last element itself). For each element:
- If it already fits (`<= allowed upper bound` from the right), no operation is needed; update the bound to this element's value.
- Otherwise, try reducing it to its smallest prime factor. If that fits the bound, count one operation and update the bound to the smallest prime factor.
- If neither works, return `-1`.

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(int[] nums) 
    {
        int n = nums.Length;
        int operations = 0;
        int upperBound = int.MaxValue;

        for (int i = n - 1; i >= 0; i--)
        {
            if (nums[i] <= upperBound)
            {
                upperBound = nums[i];
                continue;
            }

            int smallestPrimeFactor = SmallestPrimeFactor(nums[i]);
            if (smallestPrimeFactor <= upperBound)
            {
                operations++;
                upperBound = smallestPrimeFactor;
            }
            else
            {
                return -1;
            }
        }

        return operations;
    }

    private int SmallestPrimeFactor(int x)
    {
        for (int p = 2; (long)p * p <= x; p++)
        {
            if (x % p == 0) return p;
        }
        return x; // x is prime
    }
}
```

## Complexity

- **Time:** O(n * sqrt(maxVal)) for finding smallest prime factors.
- **Space:** O(1) extra space.
