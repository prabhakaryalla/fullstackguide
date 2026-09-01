# 1551. Minimum Operations to Make Array Equal

**Difficulty:** Medium
**Category:** Math

## Problem

An array `arr` of length `n` is defined as `arr[i] = (2 * i) + 1` for `0 <= i < n`. In one operation, you may pick two indices `x` and `y` and add `1` to `arr[x]` while subtracting `1` from `arr[y]`. Return the minimum number of operations needed to make all elements of `arr` equal.

### Example

```
Input: n = 3
Output: 2
Explanation: arr = [1,3,5]; make all equal to 3 by moving 2 from index 2 to index 0.
```

## Approach

Since every operation preserves the total sum, the only possible common final value is the array's average, which for this specific sequence of consecutive odd numbers always equals `n`. Because the array is symmetric around `n`, the total number of operations needed equals the sum of `(n - arr[i])` over just the first half of the array (the smaller values), which simplifies neatly to the closed-form expression `n * n / 4` using integer division (this single formula correctly handles both even and odd `n`).

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int n)
    {
        return (n * n) / 4;
    }
}
```

## Complexity

- **Time:** `O(1)`.
- **Space:** `O(1)`.
