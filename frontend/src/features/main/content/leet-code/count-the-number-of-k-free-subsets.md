# 2638. Count the Number of K-Free Subsets

**Difficulty:** Medium
**Category:** Array, Hash Table, Dynamic Programming, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given an integer array `nums` containing distinct elements and an integer `k`. A subset of `nums` is called a **k-Free subset** if it does not contain two elements whose absolute difference equals `k` (the empty subset counts as k-Free). Return the number of k-Free subsets of `nums`.

### Example

Input: nums = [5,4,6], k = 1
Output: 5
Explanation: 4, 5 and 6 form a chain of consecutive values one apart, so the valid k-Free subsets are {}, {4}, {5}, {6}, {4,6}. That is 5 subsets in total.

## Approach

Two numbers can never both appear in a valid subset if their difference is exactly `k`. Group the numbers into chains by repeatedly following `x -> x + k` while the next value is present in the array; each chain behaves like an independent path graph where adjacent chain members (differing by `k`) cannot both be chosen.

For a chain of length `L`, the number of subsets with no two adjacent elements chosen (including the empty subset) follows the recurrence `a(0) = 1`, `a(1) = 2`, `a(n) = a(n-1) + a(n-2)`. Multiply the counts across every independent chain (taking the value mod `1e9+7`) to get the final answer. A number starts a new chain only if `x - k` is not present in the array, which avoids double counting.

## C# Solution

```csharp
public class Solution 
{
    private const int Mod = 1_000_000_007;

    public int CountTheNumOfKFreeSubsets(int[] nums, int k)
    {
        HashSet<int> present = new HashSet<int>(nums);
        HashSet<int> visited = new HashSet<int>();
        long answer = 1;

        foreach (int x in nums)
        {
            if (present.Contains(x - k) || visited.Contains(x))
            {
                continue;
            }

            int length = 0;
            int cur = x;
            while (present.Contains(cur))
            {
                visited.Add(cur);
                length++;
                cur += k;
            }

            long a0 = 1, a1 = 2;
            for (int i = 0; i < length - 1; i++)
            {
                long next = (a0 + a1) % Mod;
                a0 = a1;
                a1 = next;
            }

            long chainCount = length == 0 ? 1 : a1;
            answer = (answer * chainCount) % Mod;
        }

        return (int)answer;
    }
}
```

## Complexity

- **Time:** O(n), each element is visited exactly once across all chain traversals.
- **Space:** O(n) for the hash sets tracking present and visited values.
