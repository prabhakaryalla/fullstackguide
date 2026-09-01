# 3285. Find Indices of Stable Mountains

**Difficulty:** Easy
**Category:** Array

## Problem

You are given a 0-indexed integer array `height` representing volcano heights, and an integer `threshold`. Index `i` (for `i > 0`) is called stable if the height at index `i - 1` is strictly greater than `threshold`. Return an array of all stable indices, in any order.

### Example

```
Input: height = [1,2,3,4,5], threshold = 2
Output: [3,4]
```

## Approach

Iterate through the array starting at index `1`. For each index `i`, check whether `height[i - 1] > threshold`; if so, add `i` to the result list.

## C# Solution

```csharp
public class Solution 
{
    public IList<int> StableMountains(int[] height, int threshold) 
    {
        var result = new List<int>();

        for (int i = 1; i < height.Length; i++) 
        {
            if (height[i - 1] > threshold) 
            {
                result.Add(i);
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1) excluding the output
