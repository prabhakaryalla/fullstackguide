# 3477. Fruits Into Baskets II

**Difficulty:** Easy
**Category:** Array, Greedy, Simulation

## Problem

You are given two integer arrays `fruits` and `baskets`, each of length `n`, where `fruits[i]` represents the quantity of the `i`-th type of fruit and `baskets[j]` represents the capacity of the `j`-th basket. Starting from the leftmost fruit type, place each fruit type into the **leftmost available basket** whose capacity is greater than or equal to that fruit type's quantity; each basket can be used at most once. If no basket can hold a fruit type, it remains unplaced. Return the number of fruit types that remain unplaced.

### Example

`fruits = [4,2,5], baskets = [3,5,4]` → fruit type `4` needs a basket with capacity `>= 4`, so it goes into basket index 1 (capacity 5); fruit type `2` goes into basket index 0 (capacity 3); fruit type `5` has no remaining basket with enough capacity, so it stays unplaced. The answer is `1`.

## Approach

For each fruit quantity in order, linearly scan the baskets from left to right, skipping ones already used or with insufficient capacity, and place the fruit in the first suitable one found. If none is found, count it as unplaced. Since `n` is small, this direct simulation is efficient enough.

## C# Solution

```csharp
public class Solution 
{
    public int NumOfUnplacedFruits(int[] fruits, int[] baskets) 
    {
        int n = baskets.Length;
        bool[] used = new bool[n];
        int unplaced = 0;

        foreach (int fruit in fruits)
        {
            int j = 0;
            while (j < n && (used[j] || baskets[j] < fruit))
                j++;

            if (j < n)
                used[j] = true;
            else
                unplaced++;
        }

        return unplaced;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n)
