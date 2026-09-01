# 2517. Maximum Tastiness of Candy Basket

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

You are given an array of positive integers `price` where `price[i]` denotes the price of the `i-th` candy. You have to select exactly `k` candies such that the minimum absolute difference between the prices of any two candies is maximized.

Return the maximum possible tastiness (minimum absolute difference) of the candy basket.

### Example

```
Input: price = [13,5,1,8,21,2], k = 3
Output: 5
Explanation: Choose candies with prices [2, 7, 12] gives minimum difference of 5. Actually we choose [1, 8, 13] with min diff 5 (8-1=7, 13-8=5, so min is 5). Or better: [1, 8, 13] min diff is min(7, 5) = 5.
```

## Approach

Sort the price array. Use binary search on the answer (the minimum difference). For a given minimum difference, use a greedy approach to check if we can select k candies: start from the smallest price and keep selecting the next candy that is at least `mid` away from the previous selection. If we can select k candies this way, the minimum difference is achievable.

## C# Solution

```csharp
public class Solution
{
    public int MaximumTastiness(int[] price, int k)
    {
        Array.Sort(price);
        int left = 0;
        int right = price[price.Length - 1] - price[0];
        int result = 0;
        
        while (left <= right)
        {
            int mid = left + (right - left) / 2;
            
            if (CanSelect(price, k, mid))
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
    
    private bool CanSelect(int[] price, int k, int minDiff)
    {
        int count = 1;
        int last = price[0];
        
        for (int i = 1; i < price.Length; i++)
        {
            if (price[i] - last >= minDiff)
            {
                count++;
                last = price[i];
                if (count == k)
                {
                    return true;
                }
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(n × log n + n × log(max_price))
- **Space:** O(1) if we ignore the sorting space
