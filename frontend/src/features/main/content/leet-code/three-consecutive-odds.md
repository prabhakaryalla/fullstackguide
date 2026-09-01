# 1550. Three Consecutive Odds

**Difficulty:** Easy
**Category:** Array

## Problem

Given an integer array `arr`, return `true` if there exist three consecutive odd numbers in the array, otherwise return `false`.

### Example

```
Input: arr = [2,6,4,1]
Output: false
```

## Approach

Scan the array while maintaining a counter of consecutive odd numbers seen so far. Reset the counter to `0` whenever an even number is encountered; if the counter reaches `3`, three consecutive odd numbers have been found.

## C# Solution

```csharp
public class Solution
{
    public bool ThreeConsecutiveOdds(int[] arr)
    {
        int consecutiveOdds = 0;

        foreach (int num in arr)
        {
            if (num % 2 != 0)
            {
                consecutiveOdds++;
                if (consecutiveOdds == 3)
                {
                    return true;
                }
            }
            else
            {
                consecutiveOdds = 0;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
