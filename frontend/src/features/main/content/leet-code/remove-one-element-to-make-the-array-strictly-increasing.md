# 1909. Remove One Element to Make the Array Strictly Increasing

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array `nums`, return `true` if it is possible to remove exactly one element so that the remaining array is strictly increasing.

### Example

```
Input: nums = [1,2,10,5,7]
Output: true
Explanation: Removing 10 gives [1,2,5,7], which is strictly increasing.
```

### Constraints

- `2 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

## Approach

Scan the array and count the number of indices `i` where `nums[i] >= nums[i + 1]` (a "violation"). If there are no violations, the array is already strictly increasing (removing any single element still keeps it valid). If there is exactly one violation at index `i`, check whether removing `nums[i]` (i.e., `nums[i-1] < nums[i+1]`, or `i == 0`) or removing `nums[i+1]` (i.e., `i + 2 >= n` or `nums[i] < nums[i+2]`) fixes the array. More than one violation means no single removal can work.

## C# Solution

```csharp
public class Solution
{
    public bool CanBeIncreasing(int[] nums)
    {
        int n = nums.Length;
        int violations = 0;

        for (int i = 0; i < n - 1; i++)
        {
            if (nums[i] >= nums[i + 1])
            {
                violations++;
                if (violations > 1) return false;

                bool removeLeftOk = (i == 0) || (nums[i - 1] < nums[i + 1]);
                bool removeRightOk = (i + 2 >= n) || (nums[i] < nums[i + 2]);

                if (!removeLeftOk && !removeRightOk) return false;
            }
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single linear scan.
- **Space:** `O(1)`.
