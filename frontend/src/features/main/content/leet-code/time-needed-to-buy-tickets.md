# 2073. Time Needed to Buy Tickets

**Difficulty:** Easy
**Category:** Array, Simulation, Queue

## Problem

There are `n` people in a queue, each wanting to buy `tickets[i]` tickets. They buy tickets one at a time in a round-robin fashion: each person at the front buys one ticket then moves to the back of the queue if they still need more, otherwise they leave. Given the 0-indexed position `k` of a specific person, return *the number of seconds (one ticket purchase = one second) it takes for that person to finish buying all their tickets*.

## Approach

For each person `i`, determine how many times they get to buy a ticket **before or during** the round when person `k` finishes:
- If `i <= k`, person `i` buys a ticket in every round up until person `k` is done, so they contribute `min(tickets[i], tickets[k])` seconds.
- If `i > k`, person `i` only gets to buy in a round if that round happens **before** person `k`'s very last ticket (since person `k` leaves right after that ticket, and anyone still after them in this final pass doesn't get an extra turn), contributing `min(tickets[i], tickets[k] - 1)` seconds.

Summing this contribution over all `i` gives the total time.

## C# Solution

```csharp
public class Solution
{
    public int TimeRequiredToBuy(int[] tickets, int k)
    {
        int total = 0;

        for (int i = 0; i < tickets.Length; i++)
        {
            total += i <= k
                ? Math.Min(tickets[i], tickets[k])
                : Math.Min(tickets[i], tickets[k] - 1);
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
