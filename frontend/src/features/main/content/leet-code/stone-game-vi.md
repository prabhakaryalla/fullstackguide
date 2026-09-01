# 1686. Stone Game VI

**Difficulty:** Medium
**Category:** Array, Math, Greedy, Sorting, Game Theory

## Problem

Alice and Bob alternately pick stones (Alice first), each stone `i` worth `aliceValues[i]` to Alice and `bobValues[i]` to Bob, each player scoring only their own valuation of the stones they pick. Both play optimally to maximize their own score minus the opponent's. Return `1` if Alice wins, `-1` if Bob wins, `0` for a tie.

### Example

```
Input: aliceValues = [1,3], bobValues = [2,1]
Output: 1
```

## Approach

Greedily pick stones in order of descending combined value (`aliceValues[i] + bobValues[i]`) — a stone valuable to both players creates the largest total "swing" in relative advantage, so it should be claimed earliest regardless of whose turn it is. Simulate the picks in that order, alternating whose valuation gets added to their score, and compare final totals.

## C# Solution

```csharp
public class Solution
{
    public int StoneGameVI(int[] aliceValues, int[] bobValues)
    {
        int n = aliceValues.Length;
        int[][] combined = new int[n][];

        for (int i = 0; i < n; i++)
        {
            combined[i] = new int[] { aliceValues[i] + bobValues[i], i };
        }

        Array.Sort(combined, (a, b) => b[0] - a[0]);

        int aliceScore = 0;
        int bobScore = 0;

        for (int turn = 0; turn < n; turn++)
        {
            int index = combined[turn][1];

            if (turn % 2 == 0)
            {
                aliceScore += aliceValues[index];
            }
            else
            {
                bobScore += bobValues[index];
            }
        }

        return aliceScore.CompareTo(bobScore);
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)`.
