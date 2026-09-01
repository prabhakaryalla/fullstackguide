# 382. Linked List Random Node

**Difficulty:** Medium
**Category:** Linked List, Math, Reservoir Sampling, Randomization

## Problem

Given the `head` of a singly linked list, design an algorithm to return a random node's value from the list, with every node having an equal probability of being chosen, without knowing the size of the list in advance.

### Example

```
Input:
["Solution", "getRandom", "getRandom", "getRandom"]
[[[1, 2, 3]], [], [], []]
Output:
[null, 1, 3, 2] (values may vary)
```

### Constraints

- The number of nodes is in the range `[1, 10^4]`.
- `-10^4 <= Node.val <= 10^4`
- At most `10^4` calls will be made to `getRandom`.

## Approach

Use reservoir sampling: walk the list once, and for the `i`th node visited (1-indexed), replace the currently held result with that node's value with probability `1/i`. This guarantees a uniform random choice among all nodes without needing to know the list's length beforehand.

## C# Solution

```csharp
public class Solution
{
    private readonly ListNode head;
    private readonly Random random = new();

    public Solution(ListNode head)
    {
        this.head = head;
    }

    public int GetRandom()
    {
        int result = 0;
        var current = head;
        int count = 0;

        while (current != null)
        {
            count++;
            if (random.Next(count) == 0)
                result = current.val;

            current = current.next;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` per `GetRandom` call.
- **Space:** `O(1)`.
