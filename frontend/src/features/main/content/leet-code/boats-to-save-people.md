# 881. Boats to Save People

**Difficulty:** Medium
**Category:** Array, Greedy, Two Pointers, Sorting

## Problem

Given an array of people's weights and a boat weight `limit` (each boat carries at most 2 people and their combined weight cannot exceed `limit`), return the minimum number of boats needed to carry everyone.

### Example

```
Input: people = [3,2,2,1], limit = 3
Output: 3
```

## Approach

Sort the weights. Use two pointers, one at the lightest and one at the heaviest remaining person. Always pair the heaviest remaining person with the lightest if their combined weight fits within the limit (advancing both pointers); otherwise, the heaviest person must go alone (advancing only that pointer). Each iteration accounts for exactly one boat.

## C# Solution

```csharp
public class Solution
{
    public int NumRescueBoats(int[] people, int limit)
    {
        Array.Sort(people);
        int left = 0, right = people.Length - 1;
        int boats = 0;

        while (left <= right)
        {
            if (people[left] + people[right] <= limit)
                left++;

            right--;
            boats++;
        }

        return boats;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(1)` extra, excluding the sort.
