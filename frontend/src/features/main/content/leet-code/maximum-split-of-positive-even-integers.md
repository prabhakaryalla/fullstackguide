# 2178. Maximum Split of Positive Even Integers

**Difficulty:** Medium
**Category:** Math, Greedy, Backtracking

## Problem

You are given an integer `finalSum`. Split it into a sum of a maximum number of unique positive even integers.

Return a list of integers representing the split. If no valid split exists, return an empty list.

### Example

```
Input: finalSum = 12
Output: [2,4,6]
Explanation: 2 + 4 + 6 = 12

Input: finalSum = 28
Output: [2,4,6,16]
Explanation: 2 + 4 + 6 + 16 = 28
```

## Approach

Greedy approach: use consecutive even numbers starting from 2 until we can't add the next consecutive even number without exceeding the sum.

Add the remaining value to the last number in the sequence.

## C# Solution

```csharp
public class Solution
{
    public IList<long> MaximumEvenSplit(long finalSum)
    {
        var result = new List<long>();
        
        // Can only split into even numbers if sum is even
        if (finalSum % 2 != 0)
            return result;
        
        long current = 2;
        long remaining = finalSum;
        
        while (remaining > 0)
        {
            // If we can add current and still have room for next
            if (remaining >= current && remaining - current >= current + 2 || remaining == current)
            {
                result.Add(current);
                remaining -= current;
                current += 2;
            }
            else
            {
                // Add remaining to last element
                if (result.Count > 0)
                {
                    result[result.Count - 1] += remaining;
                }
                else
                {
                    result.Add(remaining);
                }
                break;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(sqrt(n)) where n is finalSum
- **Space:** O(sqrt(n)) for the result list
