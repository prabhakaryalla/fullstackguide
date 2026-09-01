# 2672. Number of Adjacent Elements With the Same Color

**Difficulty:** Medium
**Category:** Array

## Problem

You are given an integer array `nums` of length `n`, initially filled with zeros, and a 2D array `queries` where `queries[i] = [index_i, color_i]`.

For each query, you color the element at index `index_i` with color `color_i` in the array `nums`.

After each query, count the number of adjacent elements in `nums` that have the same color.

Return an array `answer` of the same length as `queries` where `answer[i]` is the count after the `i`-th query.

### Example

```
Input: n = 4, queries = [[0,2],[1,2],[3,1],[1,1],[2,1]]
Output: [0,1,1,0,2]
Explanation:
Initially: nums = [0,0,0,0]
Query [0,2]: nums = [2,0,0,0], adjacent same-color count = 0
Query [1,2]: nums = [2,2,0,0], adjacent same-color count = 1 (indices 0-1)
Query [3,1]: nums = [2,2,0,1], adjacent same-color count = 1 (indices 0-1)
Query [1,1]: nums = [2,1,0,1], adjacent same-color count = 0
Query [2,1]: nums = [2,1,1,1], adjacent same-color count = 2 (indices 1-2, 2-3)

Input: n = 1, queries = [[0,100000]]
Output: [0]
```

## Approach

Maintain a running count of adjacent same-color pairs. For each query, before updating the color at index `i`:
1. Check if `nums[i]` matches `nums[i-1]` or `nums[i+1]` and decrease count accordingly
2. Update `nums[i]` to the new color
3. Check if the new `nums[i]` matches `nums[i-1]` or `nums[i+1]` and increase count accordingly

## C# Solution

```csharp
public class Solution
{
    public int[] ColorTheArray(int n, int[][] queries)
    {
        int[] nums = new int[n];
        int[] result = new int[queries.Length];
        int count = 0;
        
        for (int q = 0; q < queries.Length; q++)
        {
            int index = queries[q][0];
            int color = queries[q][1];
            
            if (nums[index] != 0)
            {
                if (index > 0 && nums[index] == nums[index - 1])
                {
                    count--;
                }
                if (index < n - 1 && nums[index] == nums[index + 1])
                {
                    count--;
                }
            }
            
            nums[index] = color;
            
            if (index > 0 && nums[index] == nums[index - 1] && nums[index] != 0)
            {
                count++;
            }
            if (index < n - 1 && nums[index] == nums[index + 1] && nums[index] != 0)
            {
                count++;
            }
            
            result[q] = count;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(q) where q is the number of queries
- **Space:** O(n) for the nums array
