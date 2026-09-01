# 217. Contains Duplicate

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting

## Problem

Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.

### Example

```
nums = [1,2,3,1] -> true
nums = [1,2,3,4] -> false
```

## Approach

Insert every value into a hash set, one at a time. If a value is already present in the set when it's about to be added, a duplicate has been found.

## C# Solution

```csharp
public class Solution
{
    public bool ContainsDuplicate(int[] nums)
    {
        var seen = new HashSet<int>();

        foreach (int num in nums)
        {
            if (!seen.Add(num)) return true;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(n)` — for the hash set.
