# 2718. Sum of Matrix After Queries

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

You are given an integer `n` and a 2D array `queries` where `queries[i] = [type_i, index_i, val_i]`.

Initially, you have an n x n matrix filled with zeros. For each query, you perform one of two operations:
- If `type_i == 0`, set all values in row `index_i` to `val_i`
- If `type_i == 1`, set all values in column `index_i` to `val_i`

Return the sum of all elements in the matrix after processing all queries.

### Example

```
Input: n = 3, queries = [[0,0,1],[1,2,2],[0,2,3],[1,0,4]]
Output: 23
Explanation: After applying queries, matrix becomes specific values, sum = 23.

Input: n = 3, queries = [[0,0,4],[0,1,2],[1,0,1],[0,2,3]]
Output: 17
```

## Approach

Process queries in reverse order. This way, once a row or column is "seen", we know its final state and don't need to overwrite it again.

Keep track of which rows and columns have been set. For each query in reverse:
- If it's a row query and the row hasn't been seen, add `val * (number of unseen columns)` to the result
- If it's a column query and the column hasn't been seen, add `val * (number of unseen rows)` to the result

## C# Solution

```csharp
public class Solution 
{
    public long MatrixSumQueries(int n, int[][] queries) 
    {
        var seenRows = new HashSet<int>();
        var seenCols = new HashSet<int>();
        long sum = 0;
        
        for (int i = queries.Length - 1; i >= 0; i--)
        {
            int type = queries[i][0];
            int index = queries[i][1];
            int val = queries[i][2];
            
            if (type == 0)
            {
                if (!seenRows.Contains(index))
                {
                    seenRows.Add(index);
                    int unseenCols = n - seenCols.Count;
                    sum += (long)val * unseenCols;
                }
            }
            else
            {
                if (!seenCols.Contains(index))
                {
                    seenCols.Add(index);
                    int unseenRows = n - seenRows.Count;
                    sum += (long)val * unseenRows;
                }
            }
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(q) where q is the number of queries
- **Space:** O(n) for the hash sets
