# 1395. Count Number of Teams

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Binary Indexed Tree

## Problem

Given an array `rating` of soldiers standing in a line, return the number of ways to pick three soldiers `(i, j, k)` with `i < j < k` such that `rating[i] < rating[j] < rating[k]` or `rating[i] > rating[j] > rating[k]`.

### Example

```
Input: rating = [2,5,3,4,1]
Output: 3
```

## Approach

For each soldier acting as the middle of the triple, count how many soldiers to its left are smaller and how many are larger, and likewise how many to its right are smaller and larger. Combine these counts as (left-smaller × right-larger) + (left-larger × right-smaller) to get the number of valid ascending and descending triples centered at that soldier, and sum over all middle positions.

## C# Solution

```csharp
public class Solution
{
    public int NumTeams(int[] rating)
    {
        int n = rating.Length;
        int total = 0;

        for (int j = 0; j < n; j++)
        {
            int leftSmaller = 0, leftLarger = 0, rightSmaller = 0, rightLarger = 0;

            for (int i = 0; i < j; i++)
            {
                if (rating[i] < rating[j]) leftSmaller++;
                else if (rating[i] > rating[j]) leftLarger++;
            }

            for (int k = j + 1; k < n; k++)
            {
                if (rating[k] < rating[j]) rightSmaller++;
                else if (rating[k] > rating[j]) rightLarger++;
            }

            total += leftSmaller * rightLarger + leftLarger * rightSmaller;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(1)`.
