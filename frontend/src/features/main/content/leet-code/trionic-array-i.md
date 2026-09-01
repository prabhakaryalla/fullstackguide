# 3637. Trionic Array I

**Difficulty:** Easy
**Category:** Array

## Problem

An array is **trionic** if there exist indices `0 < p < q < n-1` such that the array strictly increases on `[0, p]`, strictly decreases on `[p, q]`, and strictly increases on `[q, n-1]`. Return `true` if `nums` is trionic.

### Example

`nums = [1,3,2,4]` is trionic with `p=1, q=2`: increases `1→3`, decreases `3→2`, increases `2→4`.

## Approach

Greedily scan the increasing prefix to find `p`, then the decreasing run to find `q`, and finally verify the remaining suffix strictly increases. Reject if either `p` or `q` falls at an array boundary (each of the 3 parts must be non-empty).

## C# Solution

```csharp
public class Solution 
{
    public bool IsTrionic(int[] nums) 
    {
        int n = nums.Length;
        int p = 0;
        while (p + 1 < n && nums[p + 1] > nums[p]) p++;
        if (p == 0 || p == n - 1) return false;

        int q = p;
        while (q + 1 < n && nums[q + 1] < nums[q]) q++;
        if (q == p || q == n - 1) return false;

        for (int i = q; i + 1 < n; i++) 
        {
            if (nums[i + 1] <= nums[i]) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
