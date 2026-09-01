# 3069. Distribute Elements Into Two Arrays I

**Difficulty:** Easy
**Category:** Array, Simulation

## Problem

You are given a 1-indexed array `nums` of distinct integers. Distribute its elements into two arrays, `arr1` and `arr2`, using this procedure: the first element goes to `arr1`, the second to `arr2`; for every subsequent element, append it to `arr1` if the last element of `arr1` is greater than the last element of `arr2`, otherwise append it to `arr2`. Return the concatenation of `arr1` and `arr2`.

### Example

```
Input: nums = [2,1,3]
Output: [2,3,1]
Explanation: arr1 = [2], arr2 = [1]; since arr1's last (2) > arr2's last (1), 3 goes to arr1 -> [2,3];
concatenation is [2,3] + [1] = [2,3,1].
```

## Approach

Directly simulate the described procedure with two lists, comparing their last elements at each step, then concatenate.

## C# Solution

```csharp
public class Solution {
    public int[] ResultArray(int[] nums) {
        var arr1 = new List<int> { nums[0] };
        var arr2 = new List<int> { nums[1] };

        for (int i = 2; i < nums.Length; i++) {
            if (arr1[^1] > arr2[^1])
                arr1.Add(nums[i]);
            else
                arr2.Add(nums[i]);
        }

        arr1.AddRange(arr2);
        return arr1.ToArray();
    }
}
```

## Complexity

- Time: O(n) — a single pass over `nums`.
- Space: O(n) — the two result lists.
