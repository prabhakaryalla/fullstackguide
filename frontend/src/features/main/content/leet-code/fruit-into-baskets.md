# 904. Fruit Into Baskets

**Difficulty:** Medium
**Category:** Array, Hash Table, Sliding Window

## Problem

You are visiting trees in a row, each producing a fruit of a given type (`fruits[i]`). You have two baskets, each of which can hold only a single type of fruit. Starting from any tree, pick fruit from every tree moving right until you must stop (a basket can't take a third type). Return the maximum number of fruits you can collect.

### Example

```
Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: Pick from trees [2,3,2,2] (types 2 and 3 only).
```

## Approach

This is "longest subarray with at most 2 distinct values." Slide a window with a frequency map; whenever the map holds more than two distinct types, shrink from the left until it's back to two.

## C# Solution

```csharp
public class Solution
{
    public int TotalFruit(int[] fruits)
    {
        var count = new Dictionary<int, int>();
        int left = 0, maxLen = 0;

        for (int right = 0; right < fruits.Length; right++)
        {
            count[fruits[right]] = count.GetValueOrDefault(fruits[right]) + 1;

            while (count.Count > 2)
            {
                count[fruits[left]]--;
                if (count[fruits[left]] == 0) count.Remove(fruits[left]);
                left++;
            }

            maxLen = Math.Max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (at most 3 distinct keys in the map at once).
