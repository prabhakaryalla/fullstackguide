# 1634. Add Two Polynomials Represented as Linked Lists

**Difficulty:** Medium
**Category:** Linked List, Math

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A polynomial term is represented as a `PolyNode` with a `coefficient`, a `power`, and a `next` pointer, with terms stored in strictly decreasing order of `power`. Given the head nodes of two such polynomials, return the head of their sum, also sorted by strictly decreasing power (terms with a zero resulting coefficient are omitted).

### Example

```
Input: poly1 = [[1,1]], poly2 = [[1,0]]
Output: [[1,1],[1,0]]
Explanation: (x) + (1) = x + 1
```

## Approach

This is a merge of two sorted linked lists keyed by descending `power`, analogous to merging two sorted arrays: whichever list has the higher-power head term is appended first; if both terms share the same power their coefficients are summed (and the term is skipped entirely if the sum is zero). `PolyNode` (with `coefficient`, `power`, `next`, and a `(coefficient, power)` constructor) is assumed pre-defined.

## C# Solution

```csharp
public class Solution
{
    public PolyNode AddPoly(PolyNode poly1, PolyNode poly2)
    {
        PolyNode dummy = new PolyNode();
        PolyNode current = dummy;

        while (poly1 != null && poly2 != null)
        {
            if (poly1.power > poly2.power)
            {
                current.next = new PolyNode(poly1.coefficient, poly1.power);
                current = current.next;
                poly1 = poly1.next;
            }
            else if (poly1.power < poly2.power)
            {
                current.next = new PolyNode(poly2.coefficient, poly2.power);
                current = current.next;
                poly2 = poly2.next;
            }
            else
            {
                int sum = poly1.coefficient + poly2.coefficient;

                if (sum != 0)
                {
                    current.next = new PolyNode(sum, poly1.power);
                    current = current.next;
                }

                poly1 = poly1.next;
                poly2 = poly2.next;
            }
        }

        current.next = poly1 ?? poly2;

        return dummy.next;
    }
}
```

## Complexity

- **Time:** `O(m + n)`, where `m` and `n` are the term counts of each polynomial.
- **Space:** `O(m + n)` for the result list.
