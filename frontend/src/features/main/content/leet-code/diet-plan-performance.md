# 1176. Diet Plan Performance

**Difficulty:** Easy
**Category:** Array, Sliding Window

> **Note:** This problem is part of LeetCode's premium subscription.

## Problem

Given daily `calories`, an integer `k`, and bounds `lower`/`upper`, evaluate every window of `k` consecutive days: if the window's total calories is less than `lower`, lose a point; if it's more than `upper`, gain a point. Return the total points across all windows.

### Example

```
Input: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
Output: 0
```

## Approach

Maintain a running sliding-window sum of the last `k` days as the array is scanned once. Once the window reaches size `k`, compare its sum against `lower` and `upper`, adjusting the running point total accordingly.

## C# Solution

```csharp
public class Solution
{
    public int DietPlanPerformance(int[] calories, int k, int lower, int upper)
    {
        int points = 0;
        int windowSum = 0;

        for (int i = 0; i < calories.Length; i++)
        {
            windowSum += calories[i];

            if (i >= k) windowSum -= calories[i - k];

            if (i >= k - 1)
            {
                if (windowSum < lower) points--;
                if (windowSum > upper) points++;
            }
        }

        return points;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
