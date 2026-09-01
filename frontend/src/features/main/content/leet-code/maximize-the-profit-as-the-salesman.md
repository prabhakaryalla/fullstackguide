# 2830. Maximize the Profit as the Salesman

**Difficulty:** Medium
**Category:** Array, Binary Search, Dynamic Programming, Sorting

## Problem

You are given an integer n representing the number of houses on a number line from 0 to n - 1.

Additionally, you are given a 2D array offers where offers[i] = [starti, endi, goldi], indicating that the ith buyer wants to buy all houses from starti to endi (inclusive) for goldi amount of gold.

As a salesman, you can choose any subset of the offers such that no two offers have overlapping houses. Return the maximum amount of gold you can earn.

### Example

```
Input: n = 5, offers = [[0,0,1],[0,2,2],[1,3,2]]
Output: 3
Explanation: Take offers 0 and 2: houses [0] and [1,3] don't overlap, earning 1+2=3
```

## Approach

This is a weighted interval scheduling problem, which can be solved with dynamic programming.

First, sort the offers by their end position. Then use DP where:
- dp[i] = maximum gold we can earn considering offers 0 to i

For each offer i, we have two choices:
1. Skip it: dp[i] = dp[i-1]
2. Take it: dp[i] = gold[i] + dp[j], where j is the latest offer that doesn't conflict with offer i

We can use binary search to find j efficiently.

## C# Solution

```csharp
public class Solution
{
    public int MaximizeTheProfit(int n, List<List<int>> offers)
    {
        offers.Sort((a, b) => a[1].CompareTo(b[1]));
        
        int m = offers.Count;
        int[] dp = new int[m + 1];
        
        for (int i = 1; i <= m; i++)
        {
            int start = offers[i - 1][0];
            int end = offers[i - 1][1];
            int gold = offers[i - 1][2];
            
            // Option 1: skip this offer
            dp[i] = dp[i - 1];
            
            // Option 2: take this offer
            // Find the latest offer that doesn't conflict
            int j = BinarySearch(offers, i - 1, start);
            dp[i] = Math.Max(dp[i], dp[j + 1] + gold);
        }
        
        return dp[m];
    }
    
    private int BinarySearch(List<List<int>> offers, int right, int targetStart)
    {
        int left = 0;
        int result = -1;
        
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            
            if (offers[mid][1] < targetStart)
            {
                result = mid;
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(m log m) where m is the number of offers, for sorting and binary searches
- **Space:** O(m) for the DP array
