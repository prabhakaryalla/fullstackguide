# 1979. Find Greatest Common Divisor of Array

**Difficulty:** Easy
**Category:** Array, Math, Number Theory

## Problem

Given an integer array `nums`, find the greatest common divisor of the smallest and largest numbers in the array, and return it.

### Example

```
Input: nums = [2,5,6,9,10]
Output: 2
Explanation: The smallest number is 2 and the largest is 10, and gcd(2,10) = 2.
```

### Constraints

- `2 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

## Approach

Find the minimum and maximum values in `nums` with a single pass, then compute their greatest common divisor using the Euclidean algorithm.

## C# Solution

```csharp
public class Solution
{
    public int FindGCD(int[] nums)
    {
        int min = nums.Min();
        int max = nums.Max();
        return Gcd(min, max);
    }

    private int Gcd(int a, int b)
    {
        while (b != 0)
        {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** `O(n + log(min(a, b)))` — linear scan plus the Euclidean algorithm.
- **Space:** `O(1)`.
