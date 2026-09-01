# 300. Longest Increasing Subsequence

**Difficulty:** Medium
**Category:** Array, Binary Search, Dynamic Programming

## Problem

Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

### Example

```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4  ([2,3,7,101] or [2,3,7,18])
```

### Constraints

- `1 <= nums.length <= 2500`

## Approach

Maintain an array `tails` where `tails[i]` is the smallest possible tail value of an increasing subsequence of length `i + 1` found so far. For each new number, binary search `tails` for the first position where the tail is `>= num`; if found, replace that tail with `num` (since a smaller tail keeps future extensions easier); if not found, append `num`, extending the longest subsequence length by one. The final length of `tails` is the answer.

## C# Solution

```csharp
public class Solution
{
    public int LengthOfLIS(int[] nums)
    {
        var tails = new List<int>();

        foreach (var num in nums)
        {
            int left = 0, right = tails.Count;
            while (left < right)
            {
                int mid = left + (right - left) / 2;
                if (tails[mid] < num) left = mid + 1;
                else right = mid;
            }

            if (left == tails.Count) tails.Add(num);
            else tails[left] = num;
        }

        return tails.Count;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — a binary search for each of the `n` elements.
- **Space:** `O(n)` — for the `tails` array in the worst case.
