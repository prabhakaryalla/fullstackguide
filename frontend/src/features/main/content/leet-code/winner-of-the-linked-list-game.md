# 3062. Winner of the Linked List Game

**Difficulty:** Easy
**Category:** Linked List

## Problem

You are given the head of a linked list of even length, representing pairs of dueling teams: nodes are grouped as `(0,1), (2,3), (4,5), ...`, where the first node in each pair is on team "Even" and the second is on team "Odd". In each pair, the team with the larger value scores a point (a tie scores nobody). Return `"Even"` if team Even has more points overall, `"Odd"` if team Odd has more, or `"Tie"` if equal.

### Example

```
Input: head = [2,1]
Output: "Even"
Explanation: The single pair (2, 1) has 2 > 1, so Even scores the only point.
```

## Approach

Walk the list two nodes at a time. For each pair, compare `head.val` (Even) against `head.next.val` (Odd) and increment the corresponding counter. Advance by `head.next.next` to reach the next pair. Compare the final counters to produce the result.

## C# Solution

```csharp
public class Solution {
    public string GameResult(ListNode head) {
        int even = 0, odd = 0;

        while (head != null) {
            if (head.val > head.next.val)
                even++;
            else if (head.val < head.next.val)
                odd++;
            head = head.next.next;
        }

        if (even > odd) return "Even";
        if (even < odd) return "Odd";
        return "Tie";
    }
}
```

## Complexity

- Time: O(n) — a single pass over the list.
- Space: O(1) — only two counters are used.
