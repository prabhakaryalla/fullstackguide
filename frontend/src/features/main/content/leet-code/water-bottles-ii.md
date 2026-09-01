# 3100. Water Bottles II

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

You start with `numBottles` full water bottles and can drink them. Once you've accumulated `numExchange` empty bottles, you may exchange them for 1 new full bottle — but after each such exchange, `numExchange` increases by `1` (exchanges get progressively more expensive). Return the maximum number of bottles you can drink in total.

### Example

```
Input: numBottles = 13, numExchange = 6
Output: 15
```

## Approach

Simulate directly: start by drinking all `numBottles`. While you have at least `numExchange` bottles available to exchange, trade them in for one new bottle (drink it immediately, adding to the total), leaving `numBottles - numExchange + 1` bottles (the new one, plus leftover empties not used in the exchange... more precisely the remaining count becomes `numBottles - numExchange + 1` after drinking the newly obtained bottle), then increase `numExchange` by `1` for the next round.

## C# Solution

```csharp
public class Solution {
    public int MaxBottlesDrunk(int numBottles, int numExchange) {
        int ans = numBottles;

        while (numBottles >= numExchange) {
            numBottles = numBottles - numExchange + 1;
            numExchange++;
            ans++;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(sqrt(numBottles)) — `numExchange` grows by 1 each round, so the loop terminates quickly.
- Space: O(1).
