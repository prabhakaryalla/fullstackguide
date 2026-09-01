# 565. Array Nesting

**Difficulty:** Medium
**Category:** Array, Depth-First Search

## Problem

Given an integer array `nums` of length `n` where `nums` is a permutation of `[0, n-1]`, consider sets built by starting at some index `i` and repeatedly following `nums[nums[...nums[i]...]]` until a value repeats. Return the length of the longest such set.

### Example

```
Input: nums = [5,4,0,3,1,6,2]
Output: 4
Explanation: One longest set is {5, 6, 2, 0}.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] < nums.length`
- All values in `nums` are unique.

## Approach

Since `nums` is a permutation, following indices via `nums[i]` always traces out disjoint cycles. Walk from every unvisited starting index, following the chain and marking each visited index as seen until returning to an already-visited index (closing the cycle), tracking that cycle's length. Because cycles never overlap, each index is processed exactly once overall.

## C# Solution

```csharp
public class Solution
{
    public int ArrayNesting(int[] nums)
    {
        var visited = new bool[nums.Length];
        int maxLength = 0;

        for (int i = 0; i < nums.Length; i++)
        {
            if (visited[i]) continue;

            int length = 0;
            int current = i;

            while (!visited[current])
            {
                visited[current] = true;
                current = nums[current];
                length++;
            }

            maxLength = Math.Max(maxLength, length);
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)` — each index is visited exactly once across all cycles.
- **Space:** `O(n)` for the visited array.
