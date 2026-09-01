# 2154. Keep Multiplying Found Values by Two

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting, Simulation

## Problem

You are given an array of integers `nums` and an integer `original`. Return the final value of `original` after performing the following operations:

1. If `original` is found in `nums`, multiply `original` by 2
2. Otherwise, stop the process
3. Repeat this process with the new value

### Example

```
Input: nums = [5,3,6,1,12], original = 3
Output: 24
Explanation: 3 -> 6 (found) -> 12 (found) -> 24 (not found, stop)
```

## Approach

Use a hash set for O(1) lookups. Keep doubling the value while it exists in the set.

## C# Solution

```csharp
public class Solution
{
    public int FindFinalValue(int[] nums, int original)
    {
        var numSet = new HashSet<int>(nums);
        
        while (numSet.Contains(original))
        {
            original *= 2;
        }
        
        return original;
    }
}
```

## Complexity

- **Time:** O(n + log M) where n is array length and M is the maximum value
- **Space:** O(n) for the hash set
