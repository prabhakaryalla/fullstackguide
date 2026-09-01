# 1215. Stepping Numbers

**Difficulty:** Medium
**Category:** Backtracking, Breadth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A stepping number is an integer where every pair of adjacent digits differs by exactly `1`. Given two integers `low` and `high`, return a sorted list of all stepping numbers in the inclusive range `[low, high]`.

### Example

```
Input: low = 0, high = 21
Output: [0,1,2,3,4,5,6,7,8,9,10,12,21]
```

## Approach

Generate stepping numbers with a breadth-first search that starts from each single digit `1`-`9` (and `0` handled separately as a special case), then repeatedly appends a digit that differs by `1` from the current last digit. Any generated number that exceeds `high` is discarded (and its longer extensions would only be larger, so it's safe to stop growing that branch); numbers within `[low, high]` are collected.

## C# Solution

```csharp
public class Solution
{
    public IList<int> CountSteppingNumbers(int low, int high)
    {
        var result = new List<int>();
        if (low == 0) result.Add(0);

        var queue = new Queue<long>();
        for (int start = 1; start <= 9; start++)
            queue.Enqueue(start);

        while (queue.Count > 0)
        {
            long num = queue.Dequeue();
            if (num > high) continue;
            if (num >= low) result.Add((int)num);

            int lastDigit = (int)(num % 10);
            if (lastDigit > 0) queue.Enqueue(num * 10 + (lastDigit - 1));
            if (lastDigit < 9) queue.Enqueue(num * 10 + (lastDigit + 1));
        }

        result.Sort();
        return result;
    }
}
```

## Complexity

- **Time:** `O(high log(high))` for generating and sorting the candidates.
- **Space:** `O(high)` for the result and queue.
