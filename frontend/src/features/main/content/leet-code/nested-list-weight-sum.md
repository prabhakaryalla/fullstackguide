# 339. Nested List Weight Sum

**Difficulty:** Medium
**Category:** Depth-First Search, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a nested list of integers `nestedList`, where each element is either an integer or a list of integers, return the sum of all integers, weighted by their depth (an integer at depth `d` contributes `value * d`).

### Example

```
Input: nestedList = [[1,1],2,[1,1]]
Output: 10
```

### Constraints

- `1 <= nestedList.length <= 50`
- The values of the integers are in the range `[-100, 100]`.
- The maximum depth of any integer is less than or equal to `50`.

## Approach

Recursively walk the nested structure, tracking the current depth. Each integer encountered contributes its value multiplied by the current depth, and each nested list recurses one depth level deeper.

## C# Solution

```csharp
public class Solution
{
    public int DepthSum(IList<NestedInteger> nestedList)
    {
        return Dfs(nestedList, 1);
    }

    private int Dfs(IList<NestedInteger> list, int depth)
    {
        int sum = 0;

        foreach (var item in list)
        {
            if (item.IsInteger())
                sum += item.GetInteger() * depth;
            else
                sum += Dfs(item.GetList(), depth + 1);
        }

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the total number of integers and lists.
- **Space:** `O(d)` for the recursion stack, where `d` is the maximum nesting depth.
