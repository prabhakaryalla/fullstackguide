# 2326. Spiral Matrix IV

**Difficulty:** Medium
**Category:** Array, Linked List, Matrix, Simulation

## Problem

You are given two integers `m` and `n`, which represent the dimensions of a matrix.

You are also given the `head` of a linked list of integers.

Generate an `m x n` matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with `-1`.

Return the generated matrix.

### Example

```
Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
```

## Approach

Simulate spiral traversal: maintain boundaries (top, bottom, left, right) and traverse in order: right, down, left, up. Fill each cell from the linked list or use -1 if the list is exhausted.

## C# Solution

```csharp
public class Solution
{
    public int[][] SpiralMatrix(int m, int n, ListNode head)
    {
        var matrix = new int[m][];
        for (int i = 0; i < m; i++)
        {
            matrix[i] = new int[n];
            Array.Fill(matrix[i], -1);
        }
        
        int top = 0, bottom = m - 1, left = 0, right = n - 1;
        var curr = head;
        
        while (top <= bottom && left <= right && curr != null)
        {
            for (int j = left; j <= right && curr != null; j++)
            {
                matrix[top][j] = curr.val;
                curr = curr.next;
            }
            top++;
            
            for (int i = top; i <= bottom && curr != null; i++)
            {
                matrix[i][right] = curr.val;
                curr = curr.next;
            }
            right--;
            
            for (int j = right; j >= left && curr != null; j--)
            {
                matrix[bottom][j] = curr.val;
                curr = curr.next;
            }
            bottom--;
            
            for (int i = bottom; i >= top && curr != null; i--)
            {
                matrix[i][left] = curr.val;
                curr = curr.next;
            }
            left++;
        }
        
        return matrix;
    }
}
```

## Complexity

- **Time:** O(m * n)
- **Space:** O(1) excluding output
