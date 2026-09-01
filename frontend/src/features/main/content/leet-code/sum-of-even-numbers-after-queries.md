# 985. Sum of Even Numbers After Queries

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

Given an integer array `nums` and a list of `queries`, where each query `[val, index]` adds `val` to `nums[index]`, return an array where each entry is the sum of even values in `nums` immediately after the corresponding query is applied.

### Example

```
Input: nums = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]
Output: [8,6,2,4]
```

## Approach

Maintain a running sum of the even elements. Before modifying an index, subtract its current value from the sum if it's even. After applying the update, add the new value back to the sum if it's now even. Record the running sum after each query.

## C# Solution

```csharp
public class Solution
{
    public int[] SumEvenAfterQueries(int[] nums, int[][] queries)
    {
        int sum = nums.Where(n => n % 2 == 0).Sum();
        var result = new int[queries.Length];

        for (int i = 0; i < queries.Length; i++)
        {
            int val = queries[i][0], idx = queries[i][1];

            if (nums[idx] % 2 == 0) sum -= nums[idx];
            nums[idx] += val;
            if (nums[idx] % 2 == 0) sum += nums[idx];

            result[i] = sum;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + q)`.
- **Space:** `O(q)` for the output.
