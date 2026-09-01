# 2528. Maximize the Minimum Powered City

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy, Queue, Sliding Window, Prefix Sum

## Problem

You are given a 0-indexed integer array `stations` of length `n`, where `stations[i]` represents the number of power stations in the ith city.

Each power station provides power to every city within a range of `r` (i.e., cities in the range `[i - r, i + r]`).

You are also given an integer `k` representing the number of additional power stations you can build.

Return the maximum possible minimum powered city across all cities after building at most `k` power stations.

### Example

```
Input: stations = [1,2,4,5,0], r = 1, k = 2
Output: 5
Explanation: Build 2 stations to maximize the minimum power
```

## Approach

Use binary search on the answer (minimum power):
1. Binary search on the minimum power level we want to achieve
2. For each candidate minimum, use a greedy approach with a sliding window to check if we can achieve it with k additional stations
3. Place new stations as far right as possible to maximize coverage

## C# Solution

```csharp
public class Solution
{
    public long MaxPower(int[] stations, int r, int k)
    {
        int n = stations.Length;
        var power = new long[n];
        
        long sum = 0;
        for (int i = 0; i < n; i++)
        {
            sum += stations[Math.Min(i + r, n - 1)];
            if (i - r - 1 >= 0)
            {
                sum -= stations[i - r - 1];
            }
            power[i] = sum;
        }
        
        long left = power.Min();
        long right = power.Sum() + k;
        long result = left;
        
        while (left <= right)
        {
            long mid = left + (right - left) / 2;
            
            if (CanAchieve(stations, power, r, k, mid))
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
    
    private bool CanAchieve(int[] stations, long[] power, int r, int k, long minPower)
    {
        int n = stations.Length;
        var added = new long[n];
        long used = 0;
        long currentAdded = 0;
        
        for (int i = 0; i < n; i++)
        {
            if (i - r - 1 >= 0)
            {
                currentAdded -= added[i - r - 1];
            }
            
            long currentPower = power[i] + currentAdded;
            
            if (currentPower < minPower)
            {
                long need = minPower - currentPower;
                used += need;
                
                if (used > k) return false;
                
                int pos = Math.Min(i + r, n - 1);
                added[pos] += need;
                currentAdded += need;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n log(sum + k)) where n is the array length
- **Space:** O(n) for auxiliary arrays
