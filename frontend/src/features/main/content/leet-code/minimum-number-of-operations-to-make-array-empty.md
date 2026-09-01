# 2870. Minimum Number of Operations to Make Array Empty

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Counting

## Problem

You are given a 0-indexed array `nums` consisting of positive integers. You can perform two types of operations any number of times:
- Choose two elements with equal values and delete them.
- Choose three elements with equal values and delete them.

Return the minimum number of operations required to make the array empty, or -1 if it is not possible.

### Example

```
Input: nums = [2,3,3,2,2,4,2,3,4]
Output: 4
Explanation:
- Delete three 2's: nums = [3,3,2,4,2,3,4]
- Delete two 2's: nums = [3,3,4,3,4]
- Delete three 3's: nums = [4,4]
- Delete two 4's: nums = []
Total: 4 operations
```

## Approach

Count the frequency of each element. For each unique element with frequency `f`:
- If `f == 1`, return -1 (cannot delete a single element)
- Otherwise, minimize operations by greedily using delete-three as much as possible, then delete-two

For frequency `f`, the minimum operations is `ceil(f / 3)`, which can be computed as `(f + 2) / 3`. This works because:
- `f % 3 == 0`: use `f/3` operations of type 3
- `f % 3 == 1`: use `(f-4)/3 + 2` operations (remove groups of 3, then two groups of 2)
- `f % 3 == 2`: use `(f-2)/3 + 1` operations (remove groups of 3, then one group of 2)

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums)
    {
        var freq = new Dictionary<int, int>();
        
        foreach (int num in nums)
            freq[num] = freq.GetValueOrDefault(num, 0) + 1;
        
        int operations = 0;
        
        foreach (int f in freq.Values)
        {
            if (f == 1)
                return -1;
            
            operations += (f + 2) / 3;
        }
        
        return operations;
    }
}
```

## Complexity

- **Time:** `O(n)` — count frequencies and compute result.
- **Space:** `O(n)` for the frequency map.
