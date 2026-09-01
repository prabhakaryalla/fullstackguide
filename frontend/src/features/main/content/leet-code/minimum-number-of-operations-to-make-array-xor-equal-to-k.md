# 2997. Minimum Number of Operations to Make Array XOR Equal to K

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

You are given a 0-indexed integer array `nums` and a positive integer `k`. You can perform the following operation any number of times:
- Choose any element and flip one bit in its binary representation

Return the minimum number of operations to make the bitwise XOR of all elements equal to `k`.

### Example

```
Input: nums = [2, 1, 3, 4], k = 1
Output: 2
Explanation: XOR = 2^1^3^4 = 4. Need to flip 2 bits to get 1.

Input: nums = [2, 0, 2, 0], k = 0
Output: 0
Explanation: XOR = 0, already equals k.
```

## Approach

Calculate the current XOR of all elements. Compare it with `k` bit by bit. Count the number of differing bits, which equals the minimum number of bit flips needed.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums, int k)
    {
        int currentXOR = 0;

        foreach (int num in nums)
        {
            currentXOR ^= num;
        }

        int diff = currentXOR ^ k;
        int operations = 0;

        while (diff > 0)
        {
            operations += diff & 1;
            diff >>= 1;
        }

        return operations;
    }
}
```

## Complexity

- **Time:** O(n + log(max(currentXOR, k)))
- **Space:** O(1)
