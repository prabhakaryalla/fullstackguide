# 1389. Create Target Array in the Given Order

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

Given arrays `nums` and `index` of the same length, build `target` by inserting `nums[i]` at position `index[i]` for each `i` in order, and return `target`.

### Example

```
Input: nums = [0,1,2,3,4], index = [0,1,2,2,1]
Output: [0,4,1,3,2]
```

## Approach

Simulate the process directly with a list: for each pair `(nums[i], index[i])`, insert the value at the given position, shifting later elements to make room.

## C# Solution

```csharp
public class Solution
{
    public int[] CreateTargetArray(int[] nums, int[] index)
    {
        var target = new List<int>();

        for (int i = 0; i < nums.Length; i++)
        {
            target.Insert(index[i], nums[i]);
        }

        return target.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case due to insertions.
- **Space:** `O(n)` for the target list.
