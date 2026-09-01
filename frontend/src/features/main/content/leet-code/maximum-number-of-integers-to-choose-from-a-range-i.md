# 2554. Maximum Number of Integers to Choose From a Range I

**Difficulty:** Medium
**Category:** Array, Hash Table, Binary Search, Greedy, Sorting

## Problem

You are given an integer array `banned` and two integers `n` and `maxSum`. You are choosing some number of integers following the rules:

- The chosen integers are in the range `[1, n]`
- Each integer can be chosen at most once
- The chosen integers should not be in `banned`
- The sum of the chosen integers should not exceed `maxSum`

Return the maximum number of integers you can choose following the rules.

### Example

```
Input: banned = [1,6,5], n = 5, maxSum = 6
Output: 2
Explanation: Choose 2 and 4. Sum = 6, which doesn't exceed maxSum.

Input: banned = [1,2,3,4,5,6,7], n = 8, maxSum = 1
Output: 0
Explanation: Cannot choose any number without exceeding maxSum.
```

## Approach

Use a greedy strategy: choose integers starting from 1 in ascending order, skipping banned numbers, until the sum would exceed `maxSum`.

1. Convert `banned` to a `HashSet` for O(1) lookup
2. Iterate from 1 to n
3. For each number not in banned, add it to the sum if it doesn't exceed `maxSum`
4. Count how many numbers were added

## C# Solution

```csharp
public class Solution
{
    public int MaxCount(int[] banned, int n, int maxSum)
    {
        var bannedSet = new HashSet<int>(banned);
        int count = 0;
        int sum = 0;
        
        for (int i = 1; i <= n; i++)
        {
            if (bannedSet.Contains(i))
                continue;
            
            if (sum + i > maxSum)
                break;
            
            sum += i;
            count++;
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n + b) where b is the length of banned array
- **Space:** O(b) for the hash set
