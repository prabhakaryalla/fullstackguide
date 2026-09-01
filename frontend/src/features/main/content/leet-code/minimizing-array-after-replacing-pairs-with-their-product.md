# 2892. Minimizing Array After Replacing Pairs With Their Product

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Stack, Number Theory
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer array `nums` and an integer `k`. In one operation, you can choose two adjacent elements and replace them with their product, as long as the product is less than or equal to `k`.

Return the minimum possible length of the array after performing any number of operations.

### Example

```
Input: nums = [2,3,3,7,3,5], k = 20
Output: 3
Explanation:
- Multiply 2*3 = 6: nums = [6,3,7,3,5]
- Multiply 3*5 = 15: nums = [6,3,7,15]
- Multiply 3*7 cannot be done (21 > 20)
Final length: 4
Actually, optimal is:
- Multiply 3*3 = 9: nums = [2,9,7,3,5]
- Multiply 3*5 = 15: nums = [2,9,7,15]
Length: 4
```

## Approach

Use a greedy approach with a stack. Iterate through the array and try to merge each element with the top of the stack if their product is `<= k`. Keep merging as long as possible. The final stack size is the minimum length.

## C# Solution

```csharp
public class Solution
{
    public int MinArrayLength(int[] nums, int k)
    {
        var stack = new Stack<long>();
        
        foreach (int num in nums)
        {
            long current = num;
            
            while (stack.Count > 0 && stack.Peek() * current <= k)
            {
                current *= stack.Pop();
            }
            
            stack.Push(current);
        }
        
        return stack.Count;
    }
}
```

## Complexity

- **Time:** `O(n)` — each element processed once.
- **Space:** `O(n)` for the stack in worst case.
