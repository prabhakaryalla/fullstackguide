# 2644. Find the Maximum Divisibility Score

**Difficulty:** Easy
**Category:** Array

## Problem

You are given two 0-indexed integer arrays `nums` and `divisors`. The divisibility score of `divisors[i]` is the number of indices `j` such that `nums[j]` is divisible by `divisors[i]`.

Return the integer `divisors[i]` with the maximum divisibility score. If there is more than one integer with the maximum score, return the smallest one.

### Example

```
Input: nums = [4,7,9,3,9], divisors = [5,2,3]
Output: 3
Explanation: The divisibility scores are:
- divisors[0] = 5: 0 elements divisible
- divisors[1] = 2: 1 element divisible (4)
- divisors[2] = 3: 3 elements divisible (9, 3, 9)
Maximum score is 3, so return 3.
```

## Approach

For each divisor, count how many elements in `nums` are divisible by it. Track the divisor with the maximum count, breaking ties by choosing the smaller divisor.

## C# Solution

```csharp
public class Solution
{
    public int MaxDivScore(int[] nums, int[] divisors)
    {
        int maxScore = -1;
        int result = int.MaxValue;
        
        foreach (int divisor in divisors)
        {
            int score = 0;
            foreach (int num in nums)
            {
                if (num % divisor == 0)
                    score++;
            }
            
            if (score > maxScore || (score == maxScore && divisor < result))
            {
                maxScore = score;
                result = divisor;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n × m) — where n is nums length and m is divisors length
- **Space:** O(1) — constant extra space
