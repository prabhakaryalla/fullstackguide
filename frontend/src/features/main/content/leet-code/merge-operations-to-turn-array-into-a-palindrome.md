# 2422. Merge Operations to Turn Array Into a Palindrome

**Difficulty:** Medium
**Category:** Array, Two Pointers, Greedy

## Problem

You are given an array `nums` consisting of positive integers.

You can perform the following operation on the array any number of times:

- Choose any two adjacent elements and replace them with their sum.

Return the minimum number of operations needed to turn the array into a palindrome.

### Example

```
Input: nums = [4,3,2,1,2,3,1]
Output: 2
Explanation: 
- Merge 3 and 2: [4,5,1,2,3,1]
- Merge 1 and 2: [4,5,3,3,1]
After further merges: [4,5,6,1] or similar, eventually palindrome is achievable.
```

## Approach

Use two pointers from both ends of the array. Compare values at left and right pointers:
- If equal, move both pointers inward
- If left < right, merge left with its neighbor and move left pointer
- If right < left, merge right with its neighbor and move right pointer

Count the number of merge operations.

## C# Solution

```csharp
public class Solution
{
    public int MinimumOperations(int[] nums)
    {
        int left = 0, right = nums.Length - 1;
        long leftSum = nums[left], rightSum = nums[right];
        int operations = 0;
        
        while (left < right)
        {
            if (leftSum == rightSum)
            {
                left++;
                right--;
                if (left < right)
                {
                    leftSum = nums[left];
                    rightSum = nums[right];
                }
            }
            else if (leftSum < rightSum)
            {
                left++;
                leftSum += nums[left];
                operations++;
            }
            else
            {
                right--;
                rightSum += nums[right];
                operations++;
            }
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1)
