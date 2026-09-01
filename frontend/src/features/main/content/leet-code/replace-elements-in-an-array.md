# 2405. Replace Elements in an Array

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

You are given a 0-indexed array `nums` that consists of `n` distinct positive integers. Apply `m` operations to this array, where in the `i`-th operation you replace the number `operations[i][0]` with `operations[i][1]`.

It is guaranteed that in the `i`-th operation:

- `operations[i][0]` exists in `nums`.
- `operations[i][1]` does not exist in `nums`.

Return the array obtained after applying all the operations.

### Example

```
Input: nums = [1,2,4,6], operations = [[1,3],[4,7],[6,1]]
Output: [3,2,7,1]
Explanation:
- Replace 1 with 3: nums becomes [3,2,4,6]
- Replace 4 with 7: nums becomes [3,2,7,6]
- Replace 6 with 1: nums becomes [3,2,7,1]
```

## Approach

Use a hash map to track the index of each value. For each operation, look up the index of the value to replace, update the array at that index, and update the hash map accordingly.

## C# Solution

```csharp
public class Solution
{
    public int[] ArrayChange(int[] nums, int[][] operations)
    {
        var indexMap = new Dictionary<int, int>();
        
        for (int i = 0; i < nums.Length; i++)
        {
            indexMap[nums[i]] = i;
        }
        
        foreach (var op in operations)
        {
            int oldVal = op[0];
            int newVal = op[1];
            int idx = indexMap[oldVal];
            
            nums[idx] = newVal;
            indexMap.Remove(oldVal);
            indexMap[newVal] = idx;
        }
        
        return nums;
    }
}
```

## Complexity

- **Time:** O(n + m) where n is the length of nums and m is the number of operations
- **Space:** O(n) for the hash map
