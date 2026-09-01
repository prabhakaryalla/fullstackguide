# 2560. House Robber IV

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

There are several consecutive houses along a street, each of which has some money inside. There is also a robber who wants to rob houses in this street, but cannot rob two adjacent houses.

The capability of the robber is the maximum amount of money they rob from any single house.

You are given an integer array `nums` representing the amount of money in each house and an integer `k`. Return the minimum capability of the robber out of all possible ways to rob exactly `k` houses.

### Example

```
Input: nums = [2,3,5,9], k = 2
Output: 5
Explanation: Rob houses at indices 0 and 2 (values 2 and 5).
Maximum robbed from a single house = 5, which is minimal.

Input: nums = [2,7,9,3,1], k = 2
Output: 2
Explanation: Rob houses at indices 0 and 4 (values 2 and 1).
Maximum robbed from a single house = 2.
```

## Approach

Use binary search on the answer (the capability value):

1. The minimum capability is the k-th smallest value among all houses
2. The maximum capability is the largest value in `nums`
3. Binary search: for each mid value, check if we can rob at least `k` houses without exceeding capability `mid` and without robbing adjacent houses
4. To check feasibility: greedily select houses with value ≤ mid, skipping adjacent ones

## C# Solution

```csharp
public class Solution
{
    public int MinCapability(int[] nums, int k)
    {
        int left = nums.Min();
        int right = nums.Max();
        
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (CanRob(nums, k, mid))
                right = mid;
            else
                left = mid + 1;
        }
        
        return left;
    }
    
    private bool CanRob(int[] nums, int k, int capability)
    {
        int count = 0;
        int i = 0;
        
        while (i < nums.Length)
        {
            if (nums[i] <= capability)
            {
                count++;
                i += 2; // Skip adjacent house
            }
            else
            {
                i++;
            }
        }
        
        return count >= k;
    }
}
```

## Complexity

- **Time:** O(n log(max_value)) where n is the array length
- **Space:** O(1)
