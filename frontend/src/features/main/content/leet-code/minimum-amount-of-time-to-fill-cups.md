# 2412. Minimum Amount of Time to Fill Cups

**Difficulty:** Easy
**Category:** Array, Greedy, Sorting

## Problem

You have a water dispenser that can dispense cold, warm, and hot water. Every second, you can either fill up 2 cups with different types of water, or 1 cup of any type of water.

You are given a 0-indexed integer array `amount` of length 3 where `amount[0]`, `amount[1]`, and `amount[2]` denote the number of cold, warm, and hot water cups you need to fill respectively.

Return the minimum number of seconds needed to fill up all the cups.

### Example

```
Input: amount = [1,4,2]
Output: 4
Explanation:
Second 1: Fill up a cold cup and a warm cup.
Second 2: Fill up a warm cup and a hot cup.
Second 3: Fill up a warm cup and a hot cup.
Second 4: Fill up a warm cup.
```

## Approach

Greedily fill two cups at a time by always choosing the two largest amounts. The answer is either the maximum value (if it's larger than the sum of the other two) or `(sum + 1) / 2`.

## C# Solution

```csharp
public class Solution
{
    public int FillCups(int[] amount)
    {
        Array.Sort(amount);
        
        int sum = amount[0] + amount[1] + amount[2];
        int max = amount[2];
        
        return Math.Max(max, (sum + 1) / 2);
    }
}
```

## Complexity

- **Time:** O(1) since we're sorting a fixed-size array
- **Space:** O(1)
