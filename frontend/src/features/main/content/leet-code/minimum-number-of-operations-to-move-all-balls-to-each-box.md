# 1769. Minimum Number of Operations to Move All Balls to Each Box

**Difficulty:** Medium
**Category:** Array

## Problem

Given a binary string `boxes` where `'1'` marks a box containing a ball, for every box compute the minimum number of operations (moving a ball one position left or right costs one operation) required to move all balls into that box.

### Example

```
Input: boxes = "110"
Output: [1,1,3]
```

## Approach

Compute the cost contribution from balls to the left and to the right in two linear passes. Scanning left to right, maintain a running ball count and accumulated cost, adding the accumulated cost to each box before updating; then repeat scanning right to left and add both contributions together.

## C# Solution

```csharp
public class Solution
{
    public int[] MinOperations(string boxes)
    {
        int n = boxes.Length;
        int[] result = new int[n];

        int count = 0, cost = 0;
        for (int i = 0; i < n; i++)
        {
            result[i] += cost;
            if (boxes[i] == '1') count++;
            cost += count;
        }

        count = 0; cost = 0;
        for (int i = n - 1; i >= 0; i--)
        {
            result[i] += cost;
            if (boxes[i] == '1') count++;
            cost += count;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
