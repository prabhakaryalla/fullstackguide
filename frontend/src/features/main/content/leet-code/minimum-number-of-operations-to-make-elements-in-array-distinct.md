# 3396. Minimum Number of Operations to Make Elements in Array Distinct

**Difficulty:** Easy
**Category:** Array, Hash Table, Greedy

## Problem

You are given an integer array `nums`. You need to ensure that the elements in the array are **distinct**. To achieve this, you can perform the following operation any number of times:

- Remove 3 elements from the beginning of the array. If the array has fewer than 3 elements, remove all remaining elements.

Note that an empty array is considered to have distinct elements. Return the minimum number of operations needed to make the elements in the array distinct.

### Example

`nums = [4,5,4,1,3,5]`

- Looking at the array from the right, the suffix `[3,5]` (last 2 elements) already has distinct values, but including `1` still keeps it distinct: `[1,3,5]`. Including `4` (index 1) creates a duplicate with the `4` at index 0.
- So the smallest distinct suffix starts at index 2: `[4,1,3,5]`... actually checking further back, index 0's `4` duplicates index 2's `4`, so everything up to index 1 (`[4,5]`) must be removed.
- Removing `[4,5]` (the bad prefix of length 2) requires 1 operation (removes up to 3 elements), leaving `[4,1,3,5]` which is **not** distinct because of the two `4`s remaining... re-checking: the bad prefix must include **all** copies of any duplicated value, which is index 0 through index 2, giving a bad prefix length of 3, requiring exactly 1 operation.

## Approach

Scan from the **right** while adding elements to a hash set. The first time a duplicate is encountered, every element from the start of the array up to (and including) that index must be removed — this is the "bad prefix". Once that prefix is gone, the remaining suffix is guaranteed distinct.

Since each operation removes exactly 3 elements from the front (or fewer for the final operation), the number of operations required is `ceil(badPrefixLength / 3)`.

## C# Solution

```csharp
public class Solution 
{
    public int MinimumOperations(int[] nums) 
    {
        var seen = new HashSet<int>();
        int i = nums.Length - 1;
        for (; i >= 0; i--) 
        {
            if (!seen.Add(nums[i])) 
            {
                break;
            }
        }
        int badPrefixLength = i + 1;
        return (badPrefixLength + 2) / 3;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
