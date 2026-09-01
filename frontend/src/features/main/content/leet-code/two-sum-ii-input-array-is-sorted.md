# 167. Two Sum II - Input Array Is Sorted

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search

## Problem

Given a 1-indexed array of integers `numbers` already sorted in non-decreasing order, find two numbers that add up to a specific `target`. Return their indices (1-indexed) as `[index1, index2]`, using each element at most once.

### Example

```
numbers = [2,7,11,15], target = 9 -> [1,2] (2 + 7 = 9)
numbers = [2,3,4], target = 6 -> [1,3]
```

## Approach

Because the array is already sorted, a two-pointer scan avoids needing a hash map at all: start pointers at both ends. If the sum is too small, move `left` forward (increasing the sum); if too large, move `right` backward (decreasing the sum); stop when the sum matches.

## C# Solution

```csharp
public class Solution
{
    public int[] TwoSum(int[] numbers, int target)
    {
        int left = 0, right = numbers.Length - 1;

        while (left < right)
        {
            int sum = numbers[left] + numbers[right];

            if (sum == target) return new[] { left + 1, right + 1 };
            if (sum < target) left++;
            else right--;
        }

        throw new ArgumentException("No two sum solution exists for the given input.");
    }
}
```

## Complexity

- **Time:** `O(n)` — each pointer moves at most `n` times total.
- **Space:** `O(1)`.
