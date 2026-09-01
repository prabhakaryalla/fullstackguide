# 2300. Successful Pairs of Spells and Potions

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Sorting

## Problem

You are given two integer arrays `spells` and `potions`, and an integer `success`. A spell and potion pair is successful if the product of their strengths is at least `success`.

For each spell, return the number of potions that will form a successful pair with it.

### Example

```
Input: spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:
- Spell 5: pairs with potions [2,3,4,5] (products 10,15,20,25) → 4 potions
- Spell 1: no successful pairs → 0 potions
- Spell 3: pairs with potions [3,4,5] (products 9,12,15) → 3 potions
```

## Approach

Sort the `potions` array. For each spell, use binary search to find the smallest potion such that `spell * potion >= success`, which is `potion >= ceil(success / spell)`. Count elements from that position to the end.

## C# Solution

```csharp
public class Solution
{
    public int[] SuccessfulPairs(int[] spells, int[] potions, long success)
    {
        Array.Sort(potions);
        int[] result = new int[spells.Length];
        
        for (int i = 0; i < spells.Length; i++)
        {
            long minPotion = (success + spells[i] - 1) / spells[i];
            int idx = BinarySearch(potions, minPotion);
            result[i] = potions.Length - idx;
        }
        
        return result;
    }
    
    private int BinarySearch(int[] arr, long target)
    {
        int left = 0, right = arr.Length;
        
        while (left < right)
        {
            int mid = left + (right - left) / 2;
            if (arr[mid] < target) left = mid + 1;
            else right = mid;
        }
        
        return left;
    }
}
```

## Complexity

- **Time:** O(n log n + m log n) where n = potions.length, m = spells.length.
- **Space:** O(1) excluding output.
