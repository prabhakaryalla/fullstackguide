# 3091. Apply Operations to Make Sum of Array Greater Than or Equal to k

**Difficulty:** Medium
**Category:** Math, Enumeration, Greedy

## Problem

You start with an array containing a single element `1`. In one operation you may either increment any element by `1`, or duplicate any element and append the copy to the array. Given an integer `k`, return the minimum number of operations needed so the array's sum is at least `k`.

### Example

```
Input: k = 11
Output: 5
Explanation: Increase the element to 4 (3 operations), then duplicate it twice (2 operations),
giving [4,4,4] with sum 12 >= 11, using 5 total operations.
```

## Approach

The optimal strategy is always: increase the single element to some value `x` (costing `x - 1` operations), then duplicate it `y` times (costing `y` operations) to reach a total sum of `x * (1 + y) >= k`. To minimize `(x - 1) + y` subject to `x * (1 + y) >= k`, it's optimal to balance `x` and `1 + y` close together (since their product is fixed at least `k`), so `x` should be near `sqrt(k)`. Take `x = ceil(sqrt(k))`, then the minimum `y` satisfying the constraint is `ceil(k / x) - 1`.

## C# Solution

```csharp
public class Solution {
    public int MinOperations(int k) {
        int x = (int)Math.Ceiling(Math.Sqrt(k));
        int y = (k - 1) / x; // equivalent to ceil(k / x) - 1
        return x - 1 + y;
    }
}
```

## Complexity

- Time: O(1) — a constant number of arithmetic operations.
- Space: O(1).
