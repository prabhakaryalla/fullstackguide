# 330. Patching Array

**Difficulty:** Hard
**Category:** Array, Greedy

## Problem

Given a sorted integer array `nums` and an integer `n`, add/patch elements to the array such that any number in the range `[1, n]` inclusive can be formed by the sum of some elements in the array. Return the minimum number of patches required.

### Example

```
Input: nums = [1,3], n = 6
Output: 1
Explanation: Patch with 2, making [1,2,3], covering 1 through 6.
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^4`
- `nums` is sorted in ascending order.
- `1 <= n <= 2^31 - 1`

## Approach

Maintain `miss`, the smallest sum not yet guaranteed to be reachable, starting at `1`. Scan `nums`: if the next available number is `<= miss`, it extends the reachable range without needing a patch, so add it to `miss`. Otherwise, patch with `miss` itself (the greedy best choice), doubling the reachable range, and count a patch.

## C# Solution

```csharp
public class Solution
{
    public int MinPatches(int[] nums, int n)
    {
        long miss = 1;
        int patches = 0, i = 0;

        while (miss <= n)
        {
            if (i < nums.Length && nums[i] <= miss)
            {
                miss += nums[i];
                i++;
            }
            else
            {
                miss += miss;
                patches++;
            }
        }

        return patches;
    }
}
```

## Complexity

- **Time:** `O(m + log n)`, where `m` is `nums.Length`.
- **Space:** `O(1)`.
