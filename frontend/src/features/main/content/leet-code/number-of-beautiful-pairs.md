# 2748. Number of Beautiful Pairs

**Difficulty:** Easy
**Category:** Array, Math, Number Theory

## Problem

You are given a 0-indexed integer array `nums`. A pair of indices `i`, `j` where `0 <= i < j < nums.length` is called beautiful if the first digit of `nums[i]` and the last digit of `nums[j]` are coprime.

Return the total number of beautiful pairs in `nums`.

Two integers `x` and `y` are coprime if there is no integer greater than 1 that divides both of them. In other words, `gcd(x, y) == 1`.

### Example

```
Input: nums = [2,5,1,4]
Output: 5
Explanation: Beautiful pairs: (0,1): gcd(2,5)=1, (0,2): gcd(2,1)=1, (1,2): gcd(5,1)=1, (1,3): gcd(5,4)=1, (2,3): gcd(1,4)=1
```

## Approach

For each pair, extract the first digit of `nums[i]` and last digit of `nums[j]`, then check if their GCD is 1. Count all such pairs.

## C# Solution

```csharp
public class Solution
{
    public int CountBeautifulPairs(int[] nums)
    {
        int count = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n; i++)
        {
            int firstDigit = GetFirstDigit(nums[i]);
            
            for (int j = i + 1; j < n; j++)
            {
                int lastDigit = nums[j] % 10;
                
                if (GCD(firstDigit, lastDigit) == 1)
                {
                    count++;
                }
            }
        }
        
        return count;
    }
    
    private int GetFirstDigit(int num)
    {
        while (num >= 10)
        {
            num /= 10;
        }
        return num;
    }
    
    private int GCD(int a, int b)
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

- **Time:** O(n² × log(max_num))
- **Space:** O(1)
