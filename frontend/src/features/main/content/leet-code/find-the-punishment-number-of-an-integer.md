# 2698. Find the Punishment Number of an Integer

**Difficulty:** Medium
**Category:** Math, Backtracking

## Problem

The punishment number of a positive integer `n` is defined as the sum of the squares of all integers `i` such that:

- `1 <= i <= n`
- The decimal representation of `i * i` can be partitioned into contiguous substrings such that the sum of the integer values of these substrings equals `i`.

Return the punishment number of `n`.

### Example

```
Input: n = 10
Output: 182
Explanation: Integers that satisfy the condition are 1, 9, 10.
1^2 = 1 (sum = 1)
9^2 = 81 (8 + 1 = 9)
10^2 = 100 (10 + 0 = 10 or 1 + 0 + 0 = 1 which doesn't work, but 10 + 0 = 10 works)
Sum = 1 + 81 + 100 = 182.

Input: n = 37
Output: 1478
```

## Approach

For each integer `i` from 1 to `n`, compute `i * i` and check if its digits can be partitioned to sum to `i`. Use backtracking to try all possible partitions. Sum the squares of integers that satisfy the condition.

## C# Solution

```csharp
public class Solution
{
    public int PunishmentNumber(int n)
    {
        int sum = 0;
        
        for (int i = 1; i <= n; i++)
        {
            int square = i * i;
            if (CanPartition(square.ToString(), i, 0, 0))
            {
                sum += square;
            }
        }
        
        return sum;
    }
    
    private bool CanPartition(string s, int target, int index, int currentSum)
    {
        if (index == s.Length)
        {
            return currentSum == target;
        }
        
        for (int len = 1; len <= s.Length - index; len++)
        {
            int num = int.Parse(s.Substring(index, len));
            if (CanPartition(s, target, index + len, currentSum + num))
            {
                return true;
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(n * 2^d) where d is the number of digits in n^2
- **Space:** O(d) for recursion depth
