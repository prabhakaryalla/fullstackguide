# 2343. Query Kth Smallest Trimmed Number

**Difficulty:** Medium
**Category:** Array, String, Divide and Conquer, Sorting, Heap (Priority Queue), Radix Sort, Quickselect

## Problem

You are given a 0-indexed array of strings `nums`, where each string is of equal length and consists of only digits.

You are also given a 0-indexed 2D integer array `queries` where `queries[i] = [ki, trimi]`. For each `queries[i]`, you need to:
- Trim each number in `nums` to its rightmost `trimi` digits.
- Determine the index of the `kith` smallest trimmed number in `nums`. If two trimmed numbers are equal, the number with the lower index is considered smaller.
- Reset each number in `nums` to its original length.

Return an array answer of the same length as queries, where `answer[i]` is the answer to the `ith` query.

### Example

```
Input: nums = ["102","473","251","814"], queries = [[1,1],[2,3],[4,2]]
Output: [2,2,1]
Explanation:
Query 1: Trim to 1 digit: ["2","3","1","4"], 1st smallest is "1" at index 2.
Query 2: Trim to 3 digits: ["102","473","251","814"], 2nd smallest is "251" at index 2.
Query 3: Trim to 2 digits: ["02","73","51","14"], 4th smallest is "73" at index 1.
```

## Approach

For each query, create an array of (trimmed_value, original_index) pairs. Sort this array by trimmed value (lexicographically as strings, which works for equal-length digit strings), then by index. Return the original index of the kth element (1-indexed).

## C# Solution

```csharp
public class Solution
{
    public int[] SmallestTrimmedNumbers(string[] nums, int[][] queries)
    {
        int[] result = new int[queries.Length];
        
        for (int i = 0; i < queries.Length; i++)
        {
            int k = queries[i][0];
            int trim = queries[i][1];
            
            List<(string trimmed, int index)> trimmedNums = new List<(string, int)>();
            
            for (int j = 0; j < nums.Length; j++)
            {
                string trimmed = nums[j].Substring(nums[j].Length - trim);
                trimmedNums.Add((trimmed, j));
            }
            
            trimmedNums.Sort((a, b) =>
            {
                int cmp = string.Compare(a.trimmed, b.trimmed);
                if (cmp != 0) return cmp;
                return a.index.CompareTo(b.index);
            });
            
            result[i] = trimmedNums[k - 1].index;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(q * n log n * m) where q is queries length, n is nums length, m is string length
- **Space:** O(n) for the trimmed numbers list
