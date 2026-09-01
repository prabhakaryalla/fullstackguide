# 1250. Check If It Is a Good Array

**Difficulty:** Hard
**Category:** Array, Math, Number Theory

## Problem

Given an array of positive integers `nums`, return `true` if it is possible to choose a subset of the array and assign each chosen element an integer coefficient (which may be negative) such that their weighted sum equals `1`.

### Example

```
Input: nums = [12,5,7,23]
Output: true
Explanation: 5*(-9) + 7*(4) = 1.
```

## Approach

By Bézout's identity, an integer linear combination of a set of integers can equal `1` if and only if the greatest common divisor of those integers is `1`. So the entire problem reduces to computing the GCD of all elements in `nums` and checking whether it equals `1` — no combinatorial search over subsets is needed, since including every element can only keep the GCD the same or make it smaller (never larger).

## C# Solution

```csharp
public class Solution
{
    public bool IsGoodArray(int[] nums)
    {
        int result = nums[0];

        foreach (int num in nums)
            result = Gcd(result, num);

        return result == 1;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(n log(maxValue))`, where `n` is the length of `nums`.
- **Space:** `O(1)`.
