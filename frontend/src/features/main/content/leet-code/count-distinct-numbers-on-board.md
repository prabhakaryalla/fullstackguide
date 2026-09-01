# 2549. Count Distinct Numbers on Board

**Difficulty:** Easy
**Category:** Array, Hash Table, Math, Simulation

## Problem

You are given a positive integer `n`. Initially, only the number `n` is written on the board. Each day, for each number `x` on the board, you add the number `x - 1` to the board if `x > 1`.

Return the count of distinct numbers on the board after infinitely many days.

### Example

```
Input: n = 5
Output: 4
Explanation: Day 1: {5}, add 4. Day 2: {5,4}, add 3. Day 3: {5,4,3}, add 2. Day 4: {5,4,3,2}, add 1. Day 5: {5,4,3,2,1}. The number 1 doesn't add 0, so we stop. Count = 5... wait, that's wrong. Let me reconsider.

Actually, we start with {n}, then each day we add n-1, n-2, ..., 2. We never add 1 or below because x > 1. So if n = 5, we get {5, 4, 3, 2} which is 4 numbers. Answer is n - 1.
```

## Approach

The board will eventually contain all integers from 2 to n. The number 1 is never reached because we only add `x - 1` when `x > 1`. So the count is `n - 1`.

## C# Solution

```csharp
public class Solution
{
    public int DistinctIntegers(int n)
    {
        return n == 1 ? 1 : n - 1;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
