# 2470. Number of Subarrays With LCM Equal to K

**Difficulty:** Medium
**Category:** Array, Math, Number Theory

## Problem

Given an integer array `nums` and an integer `k`, return the number of subarrays where the least common multiple (LCM) of all elements in the subarray equals `k`.

### Example

```
Input: nums = [3,6,2,7,1], k = 6
Output: 4
Explanation: Subarrays with LCM = 6 are: [3,6], [6], [3,6,2], [6,2]
```

## Approach

For each starting position, iterate through all possible ending positions and maintain the running LCM of the subarray. Count subarrays where the LCM equals `k`.

Optimization: if the current LCM becomes greater than `k`, we can stop extending since LCM is non-decreasing. Also, if any element is greater than `k` or doesn't divide `k`, skip it.

## C# Solution

```csharp
public class Solution
{
    public int SubarrayLCM(int[] nums, int k)
    {
        int count = 0;
        int n = nums.Length;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] > k) continue;
            
            int currentLCM = 1;
            
            for (int j = i; j < n; j++)
            {
                if (nums[j] > k) break;
                
                currentLCM = LCM(currentLCM, nums[j]);
                
                if (currentLCM > k) break;
                if (currentLCM == k) count++;
            }
        }
        
        return count;
    }
    
    private int LCM(int a, int b)
    {
        return a / GCD(a, b) * b;
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
