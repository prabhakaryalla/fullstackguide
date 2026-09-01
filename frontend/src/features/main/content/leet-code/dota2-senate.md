# 649. Dota2 Senate

**Difficulty:** Medium
**Category:** String, Greedy, Queue

## Problem

Given a string `senate` where each character is `'R'` (Radiant) or `'D'` (Dire), senators take turns in a fixed round-robin order to ban another senator's future rights (removing them from the process). Simulate the process to determine which party ultimately wins.

### Example

```
Input: senate = "RD"
Output: "Radiant"
```

### Constraints

- `1 <= senate.length <= 10^4`

## Approach

Use two queues holding the original indices of Radiant and Dire senators, in order. Repeatedly compare the front of both queues: whichever senator has the smaller index acts first and bans the other, so the losing senator is discarded while the winner re-enqueues with an index increased by `n` (placing them at the back of the round, ready for their next turn). The party whose queue empties last wins.

## C# Solution

```csharp
public class Solution
{
    public string PredictPartyVictory(string senate)
    {
        int n = senate.Length;
        var radiantQueue = new Queue<int>();
        var direQueue = new Queue<int>();

        for (int i = 0; i < n; i++)
        {
            if (senate[i] == 'R') radiantQueue.Enqueue(i);
            else direQueue.Enqueue(i);
        }

        while (radiantQueue.Count > 0 && direQueue.Count > 0)
        {
            int radiantIndex = radiantQueue.Dequeue();
            int direIndex = direQueue.Dequeue();

            if (radiantIndex < direIndex)
                radiantQueue.Enqueue(radiantIndex + n);
            else
                direQueue.Enqueue(direIndex + n);
        }

        return radiantQueue.Count > 0 ? "Radiant" : "Dire";
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the two queues.
