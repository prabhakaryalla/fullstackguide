# 2611. Mice and Cheese

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

There are two mice and `n` different types of cheese, each type of cheese should be eaten by exactly one mouse.

A point of the cheese with index `i` is:
- `reward1[i]` if the first mouse eats it.
- `reward2[i]` if the second mouse eats it.

You are given a positive integer array `reward1`, a positive integer array `reward2`, and an integer `k`. Return the maximum points the mice can achieve if the first mouse eats exactly `k` types of cheese.

### Example

```
Input: reward1 = [1,1,3,4], reward2 = [4,4,1,1], k = 2
Output: 15
Explanation: The first mouse eats cheese 2 and 3 (reward 3 + 4 = 7).
The second mouse eats cheese 0 and 1 (reward 4 + 4 = 8).
Total = 15.
```

## Approach

Greedily select `k` cheeses for the first mouse based on the difference `reward1[i] - reward2[i]`. Sort indices by this difference in descending order. The first mouse takes the top `k`, and the second mouse takes the rest.

## C# Solution

```csharp
public class Solution
{
    public int MiceAndCheese(int[] reward1, int[] reward2, int k)
    {
        int n = reward1.Length;
        var diff = new int[n];
        int totalSecond = 0;
        
        for (int i = 0; i < n; i++)
        {
            diff[i] = reward1[i] - reward2[i];
            totalSecond += reward2[i];
        }
        
        Array.Sort(diff);
        Array.Reverse(diff);
        
        int additionalFirst = 0;
        for (int i = 0; i < k; i++)
            additionalFirst += diff[i];
        
        return totalSecond + additionalFirst;
    }
}
```

## Complexity

- **Time:** O(n log n) — sorting the differences
- **Space:** O(n) — for the difference array
