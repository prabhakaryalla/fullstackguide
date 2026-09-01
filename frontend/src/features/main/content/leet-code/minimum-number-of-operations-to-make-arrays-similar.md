# 2449. Minimum Number of Operations to Make Arrays Similar

**Difficulty:** Hard
**Category:** Array, Greedy, Sorting

## Problem

You are given two positive integer arrays `nums` and `target`, both of the same length. In one operation, you can:

- Choose two distinct indices `i` and `j` where `0 <= i, j < nums.length`
- Set `nums[i] = nums[i] + 2` and `nums[j] = nums[j] - 2`

Return the minimum number of operations required to make `nums` similar to `target`. Two arrays are similar if they can be rearranged to be equal.

### Example

```
Input: nums = [8,12,6], target = [2,14,10]
Output: 2
Explanation: 
Operation 1: choose i=0, j=1: [10,10,6] 
Operation 2: choose i=0, j=2: [12,10,4]
After rearranging, both become [10,4,12] and [10,2,14] which don't match, but...
Actually: [8,12,6] -> [6,12,10] -> [2,14,10] after sorting.
```

## Approach

The key insight is that operations preserve parity (even numbers stay even, odd numbers stay odd) and the sum changes by 0. Therefore:
1. Separate nums and target into even and odd elements
2. Sort both groups
3. For each group, sum the absolute differences divided by 2 (since each operation changes by ±2)
4. The total operations is the sum divided by 2 (since each operation affects two elements)

## C# Solution

```csharp
public class Solution
{
    public long MakeSimilar(int[] nums, int[] target)
    {
        var numsEven = new List<int>();
        var numsOdd = new List<int>();
        var targetEven = new List<int>();
        var targetOdd = new List<int>();
        
        foreach (int n in nums)
        {
            if (n % 2 == 0) numsEven.Add(n);
            else numsOdd.Add(n);
        }
        
        foreach (int t in target)
        {
            if (t % 2 == 0) targetEven.Add(t);
            else targetOdd.Add(t);
        }
        
        numsEven.Sort();
        numsOdd.Sort();
        targetEven.Sort();
        targetOdd.Sort();
        
        long operations = 0;
        
        for (int i = 0; i < numsEven.Count; i++)
        {
            operations += Math.Abs(numsEven[i] - targetEven[i]);
        }
        
        for (int i = 0; i < numsOdd.Count; i++)
        {
            operations += Math.Abs(numsOdd[i] - targetOdd[i]);
        }
        
        return operations / 4; // Each operation changes by 2, and affects 2 numbers
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the lists
