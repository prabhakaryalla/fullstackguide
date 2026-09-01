# 2404. Minimum Operations to Make All Array Elements Equal

**Difficulty:** Medium
**Category:** Array, Binary Search, Prefix Sum

## Problem

You are given an array `nums` consisting of positive integers. You are also given an integer array `queries` of size `m`. For the `i`-th query, you want to make all elements of `nums` equal to `queries[i]`. You can perform the following operation on the array any number of times:

- Increase or decrease an element of the array by 1.

Return an array `answer` of size `m` where `answer[i]` is the minimum number of operations to make all elements of `nums` equal to `queries[i]`.

### Example

```
Input: nums = [3,1,6,8], queries = [1,5]
Output: [14,10]
Explanation:
- For the first query: we can make all elements equal to 1: |3-1| + |1-1| + |6-1| + |8-1| = 14
- For the second query: we can make all elements equal to 5: |3-5| + |1-5| + |6-5| + |8-5| = 10
```

## Approach

Sort the array and build prefix sums. For each query value, use binary search to find how many elements are smaller and larger. Calculate the total cost using the prefix sums.

## C# Solution

```csharp
public class Solution
{
    public IList<long> MinOperations(int[] nums, int[] queries)
    {
        Array.Sort(nums);
        int n = nums.Length;
        long[] prefix = new long[n + 1];
        
        for (int i = 0; i < n; i++)
        {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        
        var result = new List<long>();
        
        foreach (int query in queries)
        {
            int pos = Array.BinarySearch(nums, query);
            if (pos < 0) pos = ~pos;
            
            long leftCost = (long)query * pos - prefix[pos];
            long rightCost = (prefix[n] - prefix[pos]) - (long)query * (n - pos);
            
            result.Add(leftCost + rightCost);
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n + m log n) where n is the length of nums and m is the length of queries
- **Space:** O(n) for the prefix sum array
