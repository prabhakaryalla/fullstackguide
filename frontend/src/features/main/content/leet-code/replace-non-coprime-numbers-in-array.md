# 2197. Replace Non-Coprime Numbers in Array

**Difficulty:** Hard
**Category:** Array, Math, Stack, Number Theory

## Problem

You are given an array of integers `nums`. Perform the following steps:

1. Find any two adjacent numbers in `nums` that are not co-prime
2. If no such numbers exist, stop the process
3. Otherwise, delete the two numbers and replace them with their LCM (Least Common Multiple)
4. Repeat until the process stops

Return the final modified array. It can be shown that replacing adjacent non-coprime numbers in any order will lead to the same result.

Two values are co-prime if their greatest common divisor equals 1.

### Example

```
Input: nums = [6,4,3,2,7,6,2]
Output: [12,7,6]
Explanation:
- (6,4) are not coprime, LCM(6,4) = 12 -> [12,3,2,7,6,2]
- (12,3) are not coprime, LCM(12,3) = 12 -> [12,2,7,6,2]
- (12,2) are not coprime, LCM(12,2) = 12 -> [12,7,6,2]
- (6,2) are not coprime, LCM(6,2) = 6 -> [12,7,6]
```

## Approach

Use a stack to process numbers from left to right:
1. For each number, check if it's co-prime with the top of the stack
2. If not co-prime, pop from stack, compute LCM, and try to merge again
3. Keep merging until the number is co-prime with stack top or stack is empty
4. Push the result onto the stack

This greedy approach works because the order of merging doesn't matter.

## C# Solution

```csharp
public class Solution
{
    public IList<int> ReplaceNonCoprimes(int[] nums)
    {
        Stack<long> stack = new Stack<long>();
        
        foreach (int num in nums)
        {
            long current = num;
            
            while (stack.Count > 0)
            {
                long top = stack.Peek();
                long g = Gcd(top, current);
                
                if (g == 1) break; // Co-prime, stop merging
                
                stack.Pop();
                current = top / g * current; // LCM = (a * b) / gcd(a, b)
            }
            
            stack.Push(current);
        }
        
        List<int> result = new List<int>();
        while (stack.Count > 0)
        {
            result.Add((int)stack.Pop());
        }
        
        result.Reverse();
        return result;
    }
    
    private long Gcd(long a, long b)
    {
        while (b != 0)
        {
            long temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

## Complexity

- **Time:** O(n * log(max(nums))), where n is array length
- **Space:** O(n), for the stack
