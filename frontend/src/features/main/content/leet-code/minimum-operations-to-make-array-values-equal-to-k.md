# 3375. Minimum Operations to Make Array Values Equal to K

**Difficulty:** Easy
**Category:** Array, Greedy

## Problem

Given an array `nums` and integer `k`, in one operation choose an integer `h` (less than the current maximum of `nums`) and set every element greater than `h` to `h`. Return the minimum number of operations to make every element equal to `k`, or `-1` if impossible.

### Example

Input: `nums = [5,2,5,4,5]`, `k = 2`
Output: `2` — reduce 5s to 4 then to 2.

## Approach

If any element is less than `k`, it's impossible to raise it, so return `-1`. Otherwise, the answer is the number of distinct values strictly greater than `k`, since each distinct value level requires exactly one operation to flatten down to the next lower level.

## C# Solution

```csharp
public class Solution 
{
    public int MinOperations(int[] nums, int k) 
    {
        var distinct = new HashSet<int>();
        foreach (int x in nums) 
        {
            if (x < k) return -1;
            if (x > k) distinct.Add(x);
        }
        return distinct.Count;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
