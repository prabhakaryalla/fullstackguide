# 2736. Maximum Sum Queries

**Difficulty:** Hard
**Category:** Array, Binary Search, Segment Tree, Sorting

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2`, each of length `n`, and a 1-indexed 2D array `queries` where `queries[i] = [xi, yi]`.

For the `i`-th query, find the maximum value of `nums1[j] + nums2[j]` among all indices `j` `(0 <= j < n)`, where `nums1[j] >= xi` and `nums2[j] >= yi`, or `-1` if there is no such `j`.

Return an array `answer` where `answer[i]` is the answer to the `i`-th query.

### Example

```
Input: nums1 = [4,3,1,2], nums2 = [2,4,9,5], queries = [[4,1],[1,3],[2,5]]
Output: [6,10,7]
```

## Approach

Sort the queries and process them in decreasing order of `x`. Maintain a data structure (like sorted list) of `(nums2[j], nums1[j] + nums2[j])` pairs for all valid `j` values. For each query, binary search for the minimum `nums2` value that satisfies the constraint.

## C# Solution

```csharp
public class Solution
{
    public int[] MaximumSumQueries(int[] nums1, int[] nums2, int[][] queries)
    {
        int n = nums1.Length;
        int m = queries.Length;
        
        var pairs = new List<(int num1, int num2, int sum)>();
        for (int i = 0; i < n; i++)
        {
            pairs.Add((nums1[i], nums2[i], nums1[i] + nums2[i]));
        }
        
        pairs.Sort((a, b) => b.num1.CompareTo(a.num1));
        
        var queryList = new List<(int x, int y, int idx)>();
        for (int i = 0; i < m; i++)
        {
            queryList.Add((queries[i][0], queries[i][1], i));
        }
        
        queryList.Sort((a, b) => b.x.CompareTo(a.x));
        
        var result = new int[m];
        var stack = new List<(int num2, int sum)>();
        int pairIdx = 0;
        
        foreach (var (x, y, idx) in queryList)
        {
            while (pairIdx < n && pairs[pairIdx].num1 >= x)
            {
                var (num1, num2, sum) = pairs[pairIdx];
                
                while (stack.Count > 0 && stack[stack.Count - 1].sum <= sum)
                {
                    stack.RemoveAt(stack.Count - 1);
                }
                
                if (stack.Count == 0 || stack[stack.Count - 1].num2 < num2)
                {
                    stack.Add((num2, sum));
                }
                
                pairIdx++;
            }
            
            result[idx] = -1;
            for (int i = stack.Count - 1; i >= 0; i--)
            {
                if (stack[i].num2 >= y)
                {
                    result[idx] = stack[i].sum;
                    break;
                }
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O((n + m) log(n + m))
- **Space:** O(n + m)
