# 2835. Minimum Operations to Form Subsequence With Target Sum

**Difficulty:** Hard
**Category:** Array, Greedy, Bit Manipulation

## Problem

You are given a 0-indexed array nums consisting of non-negative powers of 2, and an integer target.

In one operation, you can choose a number from nums and divide it into two numbers such that their sum equals the original number. For example, you can divide 8 into 4 and 4, or into 2 and 6.

Return the minimum number of operations needed so that there exists a subsequence of nums with sum equal to target. If it's impossible, return -1.

### Example

```
Input: nums = [1,2,8], target = 7
Output: 1
Explanation: Divide 8 into 4 and 4. Then select [1,2,4] with sum = 7
```

## Approach

This is a greedy bit manipulation problem. Since all numbers are powers of 2, we can think in terms of binary representation.

We count the frequency of each power of 2 in nums. To form target, we need to satisfy each bit of target.

Iterate through bits from least significant to most significant:
- If target has bit i set, we need a number 2^i
- If we have it available, use it
- If not, we need to break a larger power of 2
- Keep track of operations needed to break numbers

We greedily combine smaller powers and break larger powers as needed.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(List<int> nums, int target)
    {
        long total = 0;
        int[] count = new int[32];
        
        foreach (int num in nums)
        {
            total += num;
            int bit = 0;
            int temp = num;
            while (temp > 1)
            {
                temp /= 2;
                bit++;
            }
            count[bit]++;
        }
        
        if (total < target)
            return -1;
        
        int operations = 0;
        
        for (int i = 0; i < 31; i++)
        {
            if ((target & (1 << i)) != 0)
            {
                if (count[i] > 0)
                {
                    count[i]--;
                }
                else
                {
                    int j = i + 1;
                    while (j < 32 && count[j] == 0)
                        j++;
                    
                    if (j == 32)
                        return -1;
                    
                    while (j > i)
                    {
                        count[j]--;
                        count[j - 1] += 2;
                        operations++;
                        j--;
                    }
                    
                    count[i]--;
                }
            }
            
            count[i + 1] += count[i] / 2;
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n + log target) where n is the length of nums
- **Space:** O(log max(nums)) for the count array
