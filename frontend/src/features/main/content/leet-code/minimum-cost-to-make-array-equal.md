# 2420. Minimum Cost to Make Array Equal

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Prefix Sum

## Problem

You are given two 0-indexed arrays `nums` and `cost` consisting each of `n` positive integers.

You can do the following operation any number of times:

- Increase or decrease any element of the array `nums` by 1.

The cost of doing one operation on the `i`-th element is `cost[i]`.

Return the minimum total cost such that all the elements of the array `nums` become equal.

### Example

```
Input: nums = [1,3,5,2], cost = [2,3,1,14]
Output: 8
Explanation: We can make all the elements equal to 2 in the following way:
- Increase the 0th element one time. The cost is 2.
- Decrease the 1st element one time. The cost is 3.
- Decrease the 2nd element three times. The cost is 1 + 1 + 1 = 3.
Total cost is 2 + 3 + 3 = 8.
```

## Approach

The optimal target value is the weighted median of the array. Binary search on the answer or use ternary search to find the minimum point of the cost function, which is convex.

## C# Solution

```csharp
public class Solution
{
    public long MinCost(int[] nums, int[] cost)
    {
        int n = nums.Length;
        var pairs = new (int num, long cost)[n];
        
        for (int i = 0; i < n; i++)
        {
            pairs[i] = (nums[i], cost[i]);
        }
        
        Array.Sort(pairs, (a, b) => a.num.CompareTo(b.num));
        
        long totalCost = 0;
        long half = 0;
        
        for (int i = 0; i < n; i++)
        {
            half += pairs[i].cost;
        }
        half = (half + 1) / 2;
        
        long cumCost = 0;
        int target = 0;
        
        for (int i = 0; i < n; i++)
        {
            cumCost += pairs[i].cost;
            if (cumCost >= half)
            {
                target = pairs[i].num;
                break;
            }
        }
        
        long result = 0;
        for (int i = 0; i < n; i++)
        {
            result += (long)Math.Abs(nums[i] - target) * cost[i];
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the pairs array
