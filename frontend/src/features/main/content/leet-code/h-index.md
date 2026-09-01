# 274. H-Index

**Difficulty:** Medium
**Category:** Array, Sorting, Counting Sort

## Problem

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i`-th paper, return the researcher's h-index — the maximum value `h` such that the researcher has published at least `h` papers that have each been cited at least `h` times.

### Example

```
Input: citations = [3,0,6,1,5]
Output: 3
```

### Constraints

- `n == citations.length`
- `1 <= n <= 5000`

## Approach

Sort the citations in descending order, then scan through: the h-index is the largest index `i` (1-based) such that `citations[i-1] >= i`. As soon as a paper's citation count drops below its 1-based position, the count of qualifying papers so far is the answer.

## C# Solution

```csharp
public class Solution
{
    public int HIndex(int[] citations)
    {
        Array.Sort(citations);
        Array.Reverse(citations);

        int h = 0;
        for (int i = 0; i < citations.Length; i++)
        {
            if (citations[i] >= i + 1) h = i + 1;
            else break;
        }

        return h;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — dominated by sorting.
- **Space:** `O(log n)` — sort's internal recursion.
