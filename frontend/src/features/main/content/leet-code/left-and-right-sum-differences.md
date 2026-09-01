# 2574. Left and Right Sum Differences

**Difficulty:** Easy
**Category:** Array, Prefix Sum

## Problem

Given a 0-indexed integer array `nums`, find a 0-indexed integer array `answer` where:

- `answer.length == nums.length`
- `answer[i] = |leftSum[i] - rightSum[i]|`

Where:
- `leftSum[i]` is the sum of elements to the left of index `i`. If there is no such element, `leftSum[i] = 0`.
- `rightSum[i]` is the sum of elements to the right of index `i`. If there is no such element, `rightSum[i] = 0`.

### Example

```
Input: nums = [10,4,8,3]
Output: [15,1,11,22]
Explanation:
Index 0: leftSum=0, rightSum=4+8+3=15, |0-15|=15
Index 1: leftSum=10, rightSum=8+3=11, |10-11|=1
Index 2: leftSum=10+4=14, rightSum=3, |14-3|=11
Index 3: leftSum=10+4+8=22, rightSum=0, |22-0|=22

Input: nums = [1]
Output: [0]
```

## Approach

First, calculate the total sum of all elements. Then iterate through the array:
- Maintain a running `leftSum` (initially 0)
- `rightSum` at index `i` is `totalSum - leftSum - nums[i]`
- `answer[i] = |leftSum - rightSum|`
- Update `leftSum += nums[i]` for the next iteration

## C# Solution

```csharp
public class Solution
{
    public int[] LeftRigthDifference(int[] nums)
    {
        int n = nums.Length;
        int[] answer = new int[n];
        int totalSum = nums.Sum();
        int leftSum = 0;
        
        for (int i = 0; i < n; i++)
        {
            int rightSum = totalSum - leftSum - nums[i];
            answer[i] = Math.Abs(leftSum - rightSum);
            leftSum += nums[i];
        }
        
        return answer;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) excluding the output array
