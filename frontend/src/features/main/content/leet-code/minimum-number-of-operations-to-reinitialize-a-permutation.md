# 1806. Minimum Number of Operations to Reinitialize a Permutation

**Difficulty:** Medium
**Category:** Array, Math, Simulation

## Problem

You start with the identity permutation `perm` of length `n` (even), where `perm[i] = i`. In one operation, a new array `arr` is built with `arr[2*i] = perm[i]` and `arr[2*i+1] = perm[n/2+i]` for `0 <= i < n/2`, and `perm` becomes `arr`. Return the minimum number of operations needed for `perm` to return to the identity permutation.

### Example

```
Input: n = 4
Output: 2
Explanation: [0,1,2,3] -> [0,2,1,3] -> [0,1,2,3].
```

## Approach

Rather than simulating the whole array, track only where the value originally at index `1` travels to, since the permutation returns to identity exactly when every tracked position returns to its start — and index `1`'s cycle length equals the overall period for this construction. Under one operation, a value at position `pos` moves to `2*pos` if `pos < n/2`, otherwise to `2*(pos - n/2) + 1`. Repeatedly apply this until the tracked position is `1` again, counting steps.

## C# Solution

```csharp
public class Solution
{
    public int ReinitializePermutation(int n)
    {
        int pos = 1;
        int operations = 0;

        do
        {
            pos = pos < n / 2 ? pos * 2 : (pos - n / 2) * 2 + 1;
            operations++;
        } while (pos != 1);

        return operations;
    }
}
```

## Complexity

- **Time:** `O(n)` in the worst case for the cycle length.
- **Space:** `O(1)`.
