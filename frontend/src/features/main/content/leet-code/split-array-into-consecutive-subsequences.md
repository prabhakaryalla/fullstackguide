# 659. Split Array into Consecutive Subsequences

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Heap

## Problem

Given a sorted integer array `nums` (which may contain duplicates), return `true` if it can be split into one or more subsequences, each consisting of consecutive integers of length at least 3.

### Example

```
Input: nums = [1,2,3,3,4,5]
Output: true
Explanation: [1,2,3] and [3,4,5]
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-1000 <= nums[i] <= 1000`
- `nums` is sorted in non-decreasing order.

## Approach

Track the remaining count of each value, and separately track how many existing consecutive runs currently end at each value (their "tail"). For each number encountered in order, greedily prefer extending an existing run ending at `num - 1` (since starting a fresh run when an extension is possible only wastes future flexibility); if no such run exists, try starting a brand-new run of length 3 using `num`, `num+1`, `num+2` if all are available; otherwise, no valid split is possible.

## C# Solution

```csharp
public class Solution
{
    public bool IsPossible(int[] nums)
    {
        var count = new Dictionary<int, int>();
        var tailCount = new Dictionary<int, int>();

        foreach (var num in nums)
            count[num] = count.GetValueOrDefault(num) + 1;

        foreach (var num in nums)
        {
            if (count[num] == 0) continue;

            if (tailCount.GetValueOrDefault(num - 1) > 0)
            {
                tailCount[num - 1]--;
                tailCount[num] = tailCount.GetValueOrDefault(num) + 1;
                count[num]--;
            }
            else if (count.GetValueOrDefault(num + 1) > 0 && count.GetValueOrDefault(num + 2) > 0)
            {
                count[num]--;
                count[num + 1]--;
                count[num + 2]--;
                tailCount[num + 2] = tailCount.GetValueOrDefault(num + 2) + 1;
            }
            else
            {
                return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the count and tail maps.
