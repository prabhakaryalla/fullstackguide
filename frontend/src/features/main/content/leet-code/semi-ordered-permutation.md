# 2717. Semi-Ordered Permutation

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given a permutation of n integers from 1 to n called `nums`. A permutation is called semi-ordered if the first number is 1 and the last number is n.

You can perform the following operation any number of times:
- Pick two adjacent elements and swap them.

Return the minimum number of operations needed to make `nums` semi-ordered.

### Example

```
Input: nums = [2,1,4,3]
Output: 2
Explanation: Swap index 0 and 1 to get [1,2,4,3], then swap index 2 and 3 to get [1,2,3,4].

Input: nums = [2,4,1,3]
Output: 3
Explanation: Move 1 to the front (2 swaps), then move 4 to the end (1 swap).
```

## Approach

Find the positions of 1 and n in the array. The number of swaps needed is:
- Position of 1 to move it to index 0
- Plus (n - 1 - position of n) to move n to the last index
- If 1 is originally to the right of n, we save one swap because they will cross paths

## C# Solution

```csharp
public class Solution 
{
    public int SemiOrderedPermutation(int[] nums) 
    {
        int n = nums.Length;
        int pos1 = -1;
        int posN = -1;
        
        for (int i = 0; i < n; i++)
        {
            if (nums[i] == 1)
            {
                pos1 = i;
            }
            if (nums[i] == n)
            {
                posN = i;
            }
        }
        
        int operations = pos1 + (n - 1 - posN);
        
        if (pos1 > posN)
        {
            operations--;
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the array
- **Space:** O(1)
