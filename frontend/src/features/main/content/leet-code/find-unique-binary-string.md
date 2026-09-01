# 1980. Find Unique Binary String

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Backtracking

## Problem

Given an array of `n` distinct binary strings `nums`, each of length `n`, return a binary string of length `n` that does not appear in `nums`. If multiple answers exist, return any of them.

### Example

```
Input: nums = ["01","10"]
Output: "11"
Explanation: "11" is not in nums.
```

### Constraints

- `n == nums.length`
- `1 <= n <= 16`
- `nums[i].length == n`
- `nums[i]` consists only of `'0'` and `'1'`.
- All strings in `nums` are distinct.

## Approach

Use Cantor's diagonalization argument: construct a string of length `n` where the `i`-th character differs from the `i`-th character of `nums[i]`. Since this constructed string differs from every `nums[i]` in at least position `i`, it cannot equal any string in `nums`, guaranteeing an answer without needing to search.

## C# Solution

```csharp
public class Solution
{
    public string FindDifferentBinaryString(string[] nums)
    {
        int n = nums.Length;
        var result = new char[n];

        for (int i = 0; i < n; i++)
        {
            result[i] = nums[i][i] == '0' ? '1' : '0';
        }

        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass to build the diagonal-flipped string.
- **Space:** `O(n)` for the result string.
