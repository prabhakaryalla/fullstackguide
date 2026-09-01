# 950. Reveal Cards In Increasing Order

**Difficulty:** Medium
**Category:** Array, Queue, Sorting, Simulation

## Problem

Given a deck of cards, an ordering is dealt by repeatedly revealing the top card, then moving the next top card to the bottom of the deck. Return an arrangement of the deck so that revealing cards this way produces them in increasing order.

### Example

```
Input: deck = [17,13,11,2,3,5,7]
Output: [2,13,3,11,5,17,7]
```

## Approach

Simulate the reveal process in reverse using a queue of *positions* `0..n-1`. For each card in sorted order, assign it to the position at the front of the queue (that position gets revealed next), then move the following position from the front to the back of the queue (mirroring the "move next card to bottom" step) before placing the next sorted card.

## C# Solution

```csharp
public class Solution
{
    public int[] DeckRevealedIncreasing(int[] deck)
    {
        Array.Sort(deck);
        int n = deck.Length;
        var positions = new Queue<int>(Enumerable.Range(0, n));
        var result = new int[n];

        foreach (var card in deck)
        {
            result[positions.Dequeue()] = card;
            if (positions.Count > 0) positions.Enqueue(positions.Dequeue());
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)`.
