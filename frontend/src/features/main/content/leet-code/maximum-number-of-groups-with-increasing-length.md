# 2790. Maximum Number of Groups With Increasing Length

**Difficulty:** Hard
**Category:** Array, Greedy, Binary Search, Sorting

## Problem

You are given a 0-indexed array `usageLimits` where `usageLimits[i]` is the maximum number of times element `i` may be used in total, across all groups. You must form groups following these rules:
- Each group must consist of distinct elements (no element repeated within a single group).
- Each group (except the first) must have a length strictly greater than the previous group's length.

Return the maximum number of groups you can form.

### Example

Input: `usageLimits = [1,2,5]`
Output: `3`
Explanation: Group 1 (length 1) uses element 2. Group 2 (length 2) uses elements 1 and 2. Group 3 (length 3) uses elements 0, 1, and 2. This uses element 0 once, element 1 twice, and element 2 three times — all within their limits.

## Approach

Sort `usageLimits` ascending. Greedily try to build groups of length `1, 2, 3, ...`. Maintain a "carry" of unused capacity accumulated from previously processed elements. For each element's limit in sorted order, add it to the carry; whenever the carry is enough to complete the currently required group length, form that group (subtract the required length from the carry) and increase the required length for the next group by one. This greedy approach is optimal because using the smallest available limits first maximizes the leftover capacity for larger groups later.

## C# Solution

```csharp
public class Solution 
{
    public int MaxGroups(int[] usageLimits) 
    {
        Array.Sort(usageLimits);

        long carry = 0;
        int groupCount = 0;
        int neededLength = 1;

        foreach (int limit in usageLimits)
        {
            carry += limit;
            if (carry >= neededLength)
            {
                groupCount++;
                carry -= neededLength;
                neededLength++;
            }
        }

        return groupCount;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(1) extra (excluding sort)
