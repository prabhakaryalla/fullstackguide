# 2447. Number of Subarrays With GCD Equal to K

**Difficulty:** Medium
**Category:** Array, Math, Number Theory

## Problem

Given an integer array `nums` and an integer `k`, return the number of subarrays where the greatest common divisor (GCD) of all elements in the subarray equals `k`.

### Example

```
Input: nums = [9,3,1,2,6,3], k = 3
Output: 4
Explanation: Subarrays with GCD = 3 are: [9,3], [3], [6,3], [3]
```

## Approach

For each starting position, iterate through all possible ending positions and maintain the running GCD of the subarray. Count subarrays where the GCD equals `k`. 

Optimization: if the current GCD becomes less than `k`, we can stop extending since GCD is non-increasing.

## C# Solution

```csharp
public class Solution
{
    public int SubarrayGCD(int[] nums, int k)
    {
        int count = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n; i++)
        {
            int currentGCD = 0;
            
            for (int j = i; j < n; j++)
            {
                currentGCD = GCD(currentGCD, nums[j]);
                
                if (currentGCD == k)
                {
                    count++;
                }
                else if (currentGCD < k)
                {
                    break; // GCD can only decrease or stay same
                }
            }
        }
        
        return count;
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

- **Time:** O(n² * log(max(nums))) where n is array length
- **Space:** O(1)
