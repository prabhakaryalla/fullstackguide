# 1029. Two City Scheduling

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem

There are `2n` people, and `costs[i] = [aCosti, bCosti]` is the cost of flying the `i`-th person to city A or city B. Return the minimum total cost to fly every person to a city such that exactly `n` people arrive in each city.

### Example

```
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
```

## Approach

Everyone starts as if they'll go to city B, then `n` people need to be "switched" to city A. Switching person `i` changes the total cost by `aCosti - bCosti`; to minimize the total, prefer switching the people with the smallest (most negative) such difference first. Sorting by `aCost - bCost` ascending puts exactly those people first, so send the first half to city A and the second half to city B.

## C# Solution

```csharp
public class Solution
{
    public int TwoCitySchedCost(int[][] costs)
    {
        Array.Sort(costs, (a, b) => (a[0] - a[1]).CompareTo(b[0] - b[1]));

        int n = costs.Length / 2;
        int total = 0;

        for (int i = 0; i < n; i++) total += costs[i][0];
        for (int i = n; i < costs.Length; i++) total += costs[i][1];

        return total;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(log n)` to `O(n)` depending on the sort implementation.
