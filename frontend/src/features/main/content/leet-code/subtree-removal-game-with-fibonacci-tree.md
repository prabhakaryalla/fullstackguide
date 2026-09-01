# 2005. Subtree Removal Game with Fibonacci Tree

**Difficulty:** Hard
**Category:** Math, Game Theory, Tree, Dynamic Programming
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A Fibonacci tree of order `n` is defined recursively: order 0 is a single node, order 1 is a single node, and order `n` (n >= 2) is a root node with two children that are the roots of a Fibonacci tree of order `n - 1` and a Fibonacci tree of order `n - 2`. Alice and Bob take turns (Alice first) removing any subtree rooted at any remaining node (removing the root of the whole tree ends the game). Alice wants to remove the root of the whole tree; Bob wants to prevent that. Both play optimally. Return `true` if Alice wins.

### Example

For `n = 3`, the Fibonacci tree of order 3 has 4 nodes total (order 3 = 1 root + order-2 subtree (2 nodes) + order-1 subtree (1 node)). Alice wins for `n = 3`.

## Approach

This is a classic combinatorial "Green Hackenbush"-style subtraction game equivalent to a Nim-value parity argument on the total node count of the Fibonacci tree. Let `f(n)` be the number of nodes in the Fibonacci tree of order `n` (`f(0) = f(1) = 1`, `f(n) = f(n-1) + f(n-2) + 1`). Working out the resulting Grundy/parity structure shows the outcome is periodic with period 6 in `n`: Alice loses exactly when `n mod 6 == 1`, and wins for every other value of `n`.

## C# Solution

```csharp
public class Solution 
{
    public bool FindGameWinner(int n) 
    {
        return n % 6 != 1;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
