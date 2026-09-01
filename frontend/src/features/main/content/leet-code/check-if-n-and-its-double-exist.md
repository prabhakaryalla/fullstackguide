# 1346. Check If N and Its Double Exist

**Difficulty:** Easy
**Category:** Array, Hash Table, Two Pointers, Sorting

## Problem

Given an array `arr`, return `true` if there exist two distinct indices `i` and `j` such that `arr[i] == 2 * arr[j]`.

### Example

```
Input: arr = [10,2,5,3]
Output: true
```

## Approach

Iterate through the array while building a hash set of previously seen values. For each element, check whether its double or its half (if even) already exists in the set of processed values before adding the current one.

## C# Solution

```csharp
public class Solution
{
    public bool CheckIfExist(int[] arr)
    {
        var seen = new HashSet<int>();

        foreach (int num in arr)
        {
            if (seen.Contains(num * 2) || (num % 2 == 0 && seen.Contains(num / 2)))
            {
                return true;
            }
            seen.Add(num);
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the seen set.
