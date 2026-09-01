# 823. Binary Trees With Factors

**Difficulty:** Medium
**Category:** Array, Hash Table, Dynamic Programming

## Problem

Given an array of unique integers `arr`, count how many binary trees can be built where each non-leaf node's value equals the product of its two children's values, and every node's value comes from `arr`. Return the count modulo `10^9 + 7`.

### Example

```
Input: arr = [2,4]
Output: 3
```

## Approach

Sort the array so that any factor pair producing a given value appears earlier. For each value (as a potential root), the number of trees rooted there is `1` (itself as a leaf) plus, for every pair of smaller values whose product equals it, the product of the number of trees achievable with each of those smaller values as roots. Use a dictionary mapping each value to its tree count to look up factor contributions in O(1).

## C# Solution

```csharp
public class Solution
{
    public int NumFactoredBinaryTrees(int[] arr)
    {
        const int MOD = 1_000_000_007;
        Array.Sort(arr);

        var dp = new Dictionary<int, long>();

        for (int i = 0; i < arr.Length; i++)
        {
            long count = 1;

            for (int j = 0; j < i; j++)
            {
                if (arr[i] % arr[j] == 0)
                {
                    int other = arr[i] / arr[j];
                    if (dp.ContainsKey(other))
                        count = (count + dp[arr[j]] * dp[other]) % MOD;
                }
            }

            dp[arr[i]] = count;
        }

        long total = 0;
        foreach (var val in dp.Values)
            total = (total + val) % MOD;

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n)` for the dictionary.
